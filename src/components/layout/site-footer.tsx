import { Link, useLocation } from "react-router";

import { MapPinIcon } from "lucide-react";

import {
  CONTACT_ROWS,
  FOOTER_LEGAL_LINKS,
  FOOTER_TOP_FEATURES,
  FOOTER_USEFUL_LINKS,
  REGISTERED_ADDRESS,
  type FooterLink,
} from "~/components/marketing/marketing-content";

const COPYRIGHT_YEAR = new Date().getFullYear();

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className="flex flex-col">
      <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-900 uppercase dark:text-brand-cream">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="flex items-center gap-2 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-brand-cream/60 dark:hover:text-brand-cream"
            >
              <span className="size-1 rounded-full bg-neutral-400 dark:bg-brand-cream/30" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// The landing page earns the full four-column footer; every other public page is
// a short prose column, so it gets a single strip instead of a footer several
// times its own height.
export function SiteFooter() {
  const { pathname } = useLocation();
  return pathname === "/" ? <LandingFooter /> : <CompactFooter />;
}

function CompactFooter() {
  return (
    <footer
      id="contact"
      className="w-full scroll-mt-16 border-t border-neutral-200 bg-neutral-50 px-4 py-10 sm:px-8 md:px-12 lg:px-16 dark:border-white/5 dark:bg-neutral-950"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="shrink-0">
          <img
            src="/stepupmark-logo.webp"
            alt="StepUpMark.AI"
            width={685}
            height={120}
            loading="lazy"
            decoding="async"
            className="h-8 w-auto object-contain logo-adaptive"
          />
        </Link>

        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="inline-block py-1 text-xs font-medium tracking-widest text-neutral-400 uppercase transition-colors hover:text-neutral-900 dark:text-brand-cream/50 dark:hover:text-brand-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-neutral-400 dark:text-brand-cream/40">
          © {COPYRIGHT_YEAR.toString()} StepUpMark.AI, Inc.
        </p>
      </div>
    </footer>
  );
}

function LandingFooter() {
  return (
    <footer
      id="contact"
      className="w-full scroll-mt-16 border-t border-neutral-200 bg-neutral-50 px-4 pt-12 pb-6 sm:px-8 sm:pt-16 md:px-12 lg:px-16 lg:pt-20 dark:border-white/5 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:mb-16 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            {/* h-10, not larger: at 5.7:1 the wordmark would outgrow its
                240px grid column by `lg`. */}
            <img
              src="/stepupmark-logo.webp"
              alt="StepUpMark.AI"
              width={685}
              height={120}
              loading="lazy"
              decoding="async"
              className="mb-6 h-10 w-auto object-contain object-left logo-adaptive"
            />
            <p className="mb-8 text-sm leading-relaxed text-neutral-500 dark:text-brand-cream/60">
              StepUpMark.AI is an advanced AI-powered platform designed to revolutionize content
              creation and streamline marketing automation.
            </p>
          </div>

          <LinkColumn title="Useful links" links={FOOTER_USEFUL_LINKS} />
          <LinkColumn title="Top features" links={FOOTER_TOP_FEATURES} />

          <div className="flex flex-col">
            <h2 className="mb-6 text-xs font-bold tracking-widest text-neutral-900 uppercase dark:text-brand-cream">
              Contact info
            </h2>
            <ul className="space-y-6">
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.label} className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase dark:text-brand-cream/40">
                      <Icon className="size-3" aria-hidden="true" />
                      {row.label}
                    </span>
                    <a
                      href={row.href}
                      className="inline-block py-0.5 text-sm leading-relaxed text-neutral-700 transition-colors hover:text-neutral-900 dark:text-brand-cream/80 dark:hover:text-brand-cream"
                    >
                      {row.value}
                    </a>
                  </li>
                );
              })}
              <li className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase dark:text-brand-cream/40">
                  <MapPinIcon className="size-3" aria-hidden="true" />
                  Registered address
                </span>
                <address className="text-sm leading-relaxed text-neutral-700 not-italic dark:text-brand-cream/80">
                  {REGISTERED_ADDRESS}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <nav
          aria-label="Legal"
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-neutral-200 py-4 sm:mb-12 sm:py-6 dark:border-white/5"
        >
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="inline-block py-1 text-xs font-medium tracking-widest text-neutral-400 uppercase transition-colors hover:text-neutral-900 dark:text-brand-cream/50 dark:hover:text-brand-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Letters are spread edge to edge as separate spans; assistive tech gets
            the word once, from the label. */}
        <div className="mb-8 flex w-full items-center justify-between sm:mb-12" aria-hidden="true">
          {"STEPUPMARK".split("").map((letter, index) => (
            <span
              key={`${letter}-${index.toString()}`}
              className="font-display text-[9.5vw] leading-none tracking-tight text-neutral-900 sm:text-[10vw] lg:text-[11vw] dark:text-brand-cream"
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row dark:border-white/5">
          <p className="text-xs text-neutral-400 dark:text-brand-cream/40">
            Copyright StepUpMark.AI, Inc. {COPYRIGHT_YEAR.toString()}. All Rights Reserved.
          </p>
          <span className="text-sm font-bold tracking-tighter text-neutral-900 dark:text-brand-cream">
            StepUpMark<span className="text-neutral-400 dark:text-brand-cream/50">.AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
