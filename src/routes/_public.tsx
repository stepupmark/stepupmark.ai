import { Outlet } from "react-router";

import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";

// The single public shell: the landing page, /about and the legal pages. It runs
// full-bleed and carries the site's only nav and footer — the landing sections
// manage their own width, and the prose pages supply their own column.
//
// The footer sits outside <main> so it is exposed as a contentinfo landmark
// rather than as page content.
export default function PublicLayout() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-black dark:text-brand-cream">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
