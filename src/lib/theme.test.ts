import { describe, expect, it } from "vitest";

import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "./theme";

describe("THEME_INIT_SCRIPT", () => {
  it("reads from the storage key the module exports", () => {
    expect(THEME_INIT_SCRIPT).toContain(`"${THEME_STORAGE_KEY}"`);
  });

  it("only ever adds the dark class", () => {
    expect(THEME_INIT_SCRIPT).toContain('classList.add("dark")');
    expect(THEME_INIT_SCRIPT).not.toContain("classList.remove");
  });
});
