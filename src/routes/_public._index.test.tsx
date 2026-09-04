import { screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { PRICING_PLANS } from "~/components/marketing/marketing-content";
import { renderRoutes } from "~/test/render-routes";

import PublicHomeRoute from "./_public._index";

function renderHome() {
  return renderRoutes(
    [
      { path: "/", Component: PublicHomeRoute },
      { path: "/register", Component: () => <h1>Register</h1> },
    ],
    "/",
  );
}

// The setup file's matchMedia stub matches nothing, which is the narrow-viewport
// answer, so these render the fallback layouts by default.
function matchWideViewport() {
  const original = window.matchMedia;
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes("min-width"),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      addListener: () => {},
      removeListener: () => {},
    }) as MediaQueryList;
  return () => {
    window.matchMedia = original;
  };
}

let restoreMatchMedia: (() => void) | undefined;

afterEach(() => {
  restoreMatchMedia?.();
  restoreMatchMedia = undefined;
});

describe("marketing home route", () => {
  it("renders every section heading", () => {
    renderHome();

    expect(screen.getByRole("heading", { level: 1, name: /Create anything/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Proudly Associated With" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Studio-grade AI tools/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pricing Plans" })).toBeInTheDocument();
  });

  it("points its primary calls to action at the register route", () => {
    renderHome();

    const ctas = screen.getAllByRole("link", { name: /Get 50 free credits|Choose / });
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/register");
    }
  });

  it("exposes in-page anchors for the nav targets", () => {
    const { container } = renderHome();

    for (const id of ["top", "about-us", "features", "pricing"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("gives every pricing plan its own named call to action and feature list", () => {
    renderHome();

    const seen = new Set<string>();
    for (const plan of PRICING_PLANS) {
      expect(screen.getByRole("link", { name: new RegExp(`Choose ${plan.name}`) })).toBeVisible();
      // A shared feature list makes the table decorative; each tier has to say
      // something the one below it does not.
      const signature = plan.features.join("|");
      expect(seen.has(signature)).toBe(false);
      seen.add(signature);
    }
  });

  it("falls back to stacked layouts when there is no room for the scroll rigs", () => {
    const { container } = renderHome();

    // Every step and every card is present and readable, not parked inside a
    // sticky rig that a narrow viewport cannot drive.
    expect(container.querySelector(".h-\\[250vh\\]")).toBeNull();
    expect(container.querySelector(".h-\\[300vh\\]")).toBeNull();
    expect(screen.getAllByRole("article")).toHaveLength(11);
  });

  it("uses the scroll rigs once the viewport is wide enough", () => {
    restoreMatchMedia = matchWideViewport();
    const { container } = renderHome();

    expect(container.querySelector(".h-\\[250vh\\]")).not.toBeNull();
    expect(container.querySelector(".h-\\[300vh\\]")).not.toBeNull();
  });

  it("keeps the feature cards free of dead interactive affordances", () => {
    renderHome();

    const features = document.querySelector("#features");
    expect(features).not.toBeNull();
    // Cards used to advertise "Explore <name> →" with nowhere to go.
    expect(within(features as HTMLElement).queryByText(/^Explore /)).toBeNull();
  });
});
