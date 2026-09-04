import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FOOTER_LEGAL_LINKS } from "~/components/marketing/marketing-content";
import { renderRoutes } from "~/test/render-routes";

import { SiteFooter } from "./site-footer";

function renderFooter() {
  return renderRoutes(
    [
      { path: "/", Component: SiteFooter },
      { path: "/privacy", Component: () => <h1>Privacy</h1> },
      { path: "/terms", Component: () => <h1>Terms</h1> },
      { path: "/refund-policy", Component: () => <h1>Refunds</h1> },
    ],
    "/",
  );
}

describe("marketing footer", () => {
  // These were spans. A page that quotes rupee prices and links to registration
  // has to be able to show its policies.
  it("routes every legal link to a real page", () => {
    renderFooter();

    for (const link of FOOTER_LEGAL_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  it("makes the phone number and email address actionable", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "+91 94949 96237" })).toHaveAttribute(
      "href",
      "tel:+919494996237",
    );
    expect(screen.getByRole("link", { name: "contact@stepupmark.ai" })).toHaveAttribute(
      "href",
      "mailto:contact@stepupmark.ai",
    );
  });

  it("hides the decorative split wordmark from assistive tech", () => {
    const { container } = renderFooter();

    // Ten separate letter spans would otherwise be announced one at a time.
    const wordmark = container.querySelector('div[aria-hidden="true"]');
    expect(wordmark?.textContent).toBe("STEPUPMARK");
  });

  it("links its section anchors rather than defaulting them to the top", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/#pricing");
    expect(screen.getByRole("link", { name: "About us" })).toHaveAttribute("href", "/#about-us");
  });
});

describe("compact footer on inner pages", () => {
  function renderAt(path: string) {
    return renderRoutes(
      [
        { path: "/about", Component: SiteFooter },
        { path: "/privacy", Component: () => <h1>Privacy</h1> },
        { path: "/terms", Component: () => <h1>Terms</h1> },
        { path: "/refund-policy", Component: () => <h1>Refunds</h1> },
      ],
      path,
    );
  }

  it("drops the four columns but keeps the legal links", () => {
    renderAt("/about");

    expect(screen.queryByRole("heading", { name: "Useful links" })).toBeNull();
    expect(screen.queryByRole("link", { name: "+91 94949 96237" })).toBeNull();

    for (const link of FOOTER_LEGAL_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });
});
