import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  // Marketing and legal routes have no per-request data, so they ship as static HTML.
  prerender: ["/", "/about", "/privacy", "/terms", "/refund-policy"],
  // Not "enforce": a clientLoader that prefetches into the query cache shares the
  // query definition with the component by design, and that is not splittable.
  splitRouteModules: true,
} satisfies Config;
