import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderRoutes } from "~/test/render-routes";

import PublicLayout from "./_public";

function renderLayout() {
  return renderRoutes(
    [
      { path: "/", Component: PublicLayout },
      { path: "/sign-in", Component: () => <h1>Sign in</h1> },
      { path: "/register", Component: () => <h1>Register</h1> },
    ],
    "/",
  );
}

describe("public layout", () => {
  it("wraps the page content in a single main landmark", () => {
    renderLayout();

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("puts the footer outside main so it is exposed as contentinfo", () => {
    renderLayout();

    const footer = screen.getByRole("contentinfo");
    expect(screen.getByRole("main").contains(footer)).toBe(false);
  });

  it("offers a skip link to the content", () => {
    renderLayout();

    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveAttribute("href", "#content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
  });

  // The old _public shell carried its own nav named "Main" as well; the merge
  // must not leave two of them for the e2e suite to trip over.
  it("exposes exactly one Main navigation landmark", () => {
    renderLayout();

    expect(screen.getAllByRole("navigation", { name: "Main" })).toHaveLength(1);
  });
});
