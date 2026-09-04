import { expect, test, type Page } from "@playwright/test";

// `/` is prerendered, so its controls are in the DOM well before React attaches
// handlers to them — and the test build starts the MSW worker before hydrating.
// A click that lands in that window silently does nothing, so any test that
// drives a control has to wait for the page to actually be interactive.
async function gotoInteractive(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
}

test("the home page serves its prerendered marketing content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /Create anything/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pricing Plans" })).toBeVisible();
});

test("the nav anchors jump to their sections", async ({ page }) => {
  await gotoInteractive(page, "/");

  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Pricing" })
    .click();
  await expect(page).toHaveURL(/#pricing$/);
  await expect(page.locator("#pricing")).toBeInViewport();
});

test("the primary call to action leads to registration", async ({ page }) => {
  await gotoInteractive(page, "/");

  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL("/register");
});

test("the theme toggle flips the document class and survives a reload", async ({ page }) => {
  await gotoInteractive(page, "/");

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  // The link list is hidden below `md`; without the sheet there was no way to
  // reach any section except by scrolling the entire page.
  test("every section is reachable from the menu", async ({ page }) => {
    await gotoInteractive(page, "/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Pricing" }).click();

    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeInViewport();
  });

  // The hero is `overflow-hidden` and its headline is fluid type, so copy that
  // no longer fits is clipped silently instead of scrolling.
  test("the hero copy fits inside the hero", async ({ page }) => {
    await page.goto("/");

    const fit = await page.evaluate(() => {
      const hero = document.querySelector("#top");
      const headline = hero?.querySelector("h1");
      // The eyebrow is the first thing in the copy block; with the block pinned
      // to the bottom, overflow runs off the top of the hero.
      const eyebrow = hero?.querySelector('[data-slot="badge"]');
      if (!hero || !headline || !eyebrow) return null;

      const bounds = hero.getBoundingClientRect();

      return {
        headline: headline.scrollWidth - headline.clientWidth,
        top: Math.round(bounds.top - eyebrow.getBoundingClientRect().top),
        // Page-level scroll cannot see this: `overflow-hidden` silently cuts a
        // child that is wider than the hero instead of scrolling to it.
        right: Math.round(
          Math.max(
            ...[...hero.querySelectorAll("*")].map((el) => el.getBoundingClientRect().right),
          ) - bounds.right,
        ),
        page: document.documentElement.scrollWidth - window.innerWidth,
      };
    });

    expect(fit).not.toBeNull();
    expect(fit?.headline).toBeLessThanOrEqual(0);
    expect(fit?.top).toBeLessThanOrEqual(0);
    expect(fit?.right).toBeLessThanOrEqual(0);
    expect(fit?.page).toBeLessThanOrEqual(0);
  });

  // Was 11,613px — a 400vh dial positioned off-screen plus a 450vh card track
  // with nowhere to travel. The fallbacks measure about 7,150px, most of which
  // is now actual content.
  test("the page does not charge several screens for a rig it cannot draw", async ({ page }) => {
    await gotoInteractive(page, "/");

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(height).toBeLessThan(8000);
  });
});

test("the prerendered prose pages are served with their own heading", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1, name: "About StepUpMark.AI" })).toBeVisible();

  const legal: [string, string][] = [
    ["Privacy Policy", "/privacy"],
    ["Terms of Use", "/terms"],
    ["Refund Policy", "/refund-policy"],
  ];

  for (const [name, path] of legal) {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name }).click();
    // Prerendered routes are served from a directory, so the URL keeps a
    // trailing slash.
    await expect(page).toHaveURL(new RegExp(`${path}/?$`));
    await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
  }
});

test("the prose pages carry the shared header and a compact footer", async ({ page }) => {
  await page.goto("/privacy");

  await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();

  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "Terms of Use" })).toBeVisible();
  // The landing page's four-column footer is replaced by a single strip here.
  await expect(footer.getByText("Useful links")).toHaveCount(0);

  // A nav link from a prose page routes back to the landing page's anchor
  // rather than staying put. The scroll-into-view itself is covered on the
  // landing page in "the nav anchors jump to their sections".
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Pricing" })
    .click();
  await expect(page).toHaveURL(/\/#pricing$/);
});

test("the hero shows its poster and does not fetch the video before it is needed", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('img[src="/marketing/hero-poster.webp"]')).toBeVisible();

  // The poster is what the prerendered HTML carries; the video is a client-side
  // upgrade, so it must never be in the initial document.
  const html = await page.content();
  expect(html).not.toContain("<video");
});

test("a visitor who asked for less motion is never sent the video", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("bg-video")) videoRequests.push(request.url());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1500);

  expect(videoRequests).toEqual([]);
  await context.close();
});

// The video used to be a 29 MB 4K master that every visitor downloaded. This is
// the guard that stops it coming back unnoticed.
test("the home page stays inside its transfer budget", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);

  const total = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .reduce((sum, entry) => sum + (entry as PerformanceResourceTiming).transferSize, 0),
  );

  expect(total).toBeLessThan(4 * 1024 * 1024);
});
