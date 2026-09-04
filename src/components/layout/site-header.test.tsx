import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { renderRoutes } from "~/test/render-routes";

import { SiteHeader } from "./site-header";

function renderNav() {
  return renderRoutes(
    [
      { path: "/", Component: SiteHeader },
      { path: "/register", Component: () => <h1>Register</h1> },
      { path: "/sign-in", Component: () => <h1>Sign in</h1> },
    ],
    "/",
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("marketing nav", () => {
  it("links the section anchors and the auth routes", () => {
    renderNav();

    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/#features");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/#pricing");
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute("href", "/register");
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
  });

  // Below `md` the link list is hidden. Without the sheet there was no way to
  // reach any section on a phone except by scrolling the whole page.
  it("reaches every section from the mobile menu", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const menu = await screen.findByRole("dialog");
    const expected: [string, string][] = [
      ["About us", "/#about-us"],
      ["Features", "/#features"],
      ["Pricing", "/#pricing"],
      ["Contact", "/#contact"],
    ];
    for (const [label, href] of expected) {
      expect(within(menu).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    expect(within(menu).getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
    expect(within(menu).queryByRole("link", { name: "Get started" })).toBeNull();
  });

  it("toggles the theme and persists the choice", async () => {
    const user = userEvent.setup();
    renderNav();

    // jsdom's matchMedia stub reports no dark preference, so the page starts light.
    const toggle = screen.getByRole("button", { name: "Switch to dark theme" });

    await user.click(toggle);

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("stepupmark-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Switch to light theme" }));

    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("stepupmark-theme")).toBe("light");
  });
});
