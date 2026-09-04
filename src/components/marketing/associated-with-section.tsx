import { Badge } from "~/components/ui/badge";

import { ASSOCIATED_PARTNERS } from "./marketing-content";

export function AssociatedWithSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-neutral-100 px-4 py-16 sm:py-24 lg:py-32 dark:bg-neutral-950">
      <div className="absolute top-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/5 blur-[80px] dark:bg-brand-cream/5" />

      <div className="relative z-10 mb-10 flex flex-col items-center text-center sm:mb-14">
        <Badge variant="outline" className="mb-4 tracking-widest uppercase">
          Partners
        </Badge>
        <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-4xl lg:text-5xl dark:text-brand-cream">
          Proudly Associated With
        </h2>
      </div>

      <div className="relative w-full max-w-5xl">
        <ul className="flex snap-x snap-mandatory scroll-px-4 items-stretch gap-4 overflow-x-auto pb-4 sm:gap-6 md:justify-center md:gap-10 md:overflow-x-visible">
          {ASSOCIATED_PARTNERS.map((partner) => (
            <li
              key={partner.name}
              className="flex h-16 shrink-0 snap-start items-center justify-center rounded-2xl border border-black/10 bg-white px-6 shadow-sm sm:h-20 sm:px-8 dark:border-white/10 dark:bg-white/5"
            >
              {"logo" in partner ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-8 w-auto max-w-[150px] object-contain sm:max-h-10 sm:max-w-[190px]"
                />
              ) : (
                <span className="text-lg font-bold tracking-tight text-black sm:text-xl dark:text-brand-cream">
                  {partner.name}
                  <span className="ml-1.5 text-xs font-normal tracking-widest text-neutral-500 uppercase dark:text-brand-cream/50">
                    {partner.note}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-neutral-100 to-transparent md:hidden dark:from-neutral-950" />
      </div>
    </section>
  );
}
