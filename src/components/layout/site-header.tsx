import { useSyncExternalStore } from "react";
import { Link } from "react-router";

import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";

import { MARKETING_NAV_LINKS } from "~/components/marketing/marketing-content";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useTheme } from "~/hooks/use-theme";
import { cn } from "~/lib/cn";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
  };
}

// Height is pinned to 4rem — the hero sizes its viewport box against it
// (calc(100dvh-4rem)). The link list appears from lg, the auth buttons from sm.
// Below sm the sheet carries Sign in only; Get started is left to the hero CTA.
export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b backdrop-blur-md transition-colors",
        scrolled ? "border-border bg-background/95 shadow-sm" : "border-border/60 bg-background/80",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src="/stepupmark-logo.webp"
            alt="StepUpMark.AI"
            width={685}
            height={120}
            className="h-7 w-auto object-contain logo-adaptive sm:h-8 lg:h-9"
          />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {MARKETING_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-foreground",
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <Link to="/register">Get started</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {MARKETING_NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        to={link.href}
                        className={buttonVariants({
                          variant: "ghost",
                          size: "lg",
                          className: "w-full justify-start",
                        })}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
                <li className="mt-3 border-t pt-4">
                  <SheetClose asChild>
                    <Link
                      to="/sign-in"
                      className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "w-full",
                      })}
                    >
                      Sign in
                    </Link>
                  </SheetClose>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
