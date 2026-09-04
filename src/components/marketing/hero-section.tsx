import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { ArrowRightIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type DataSaverConnection = { saveData?: boolean; effectiveType?: string };

const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

const HERO_MODALITIES = ["Image", "Video", "Code", "Voice", "Presentations"];

function prefersLightweightBackdrop(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  const { connection } = navigator as Navigator & { connection?: DataSaverConnection };
  if (!connection) return false;
  if (connection.saveData === true) return true;

  return (
    connection.effectiveType !== undefined && SLOW_CONNECTIONS.includes(connection.effectiveType)
  );
}

// Server renders only the poster. The video mounts on the client once on screen
// and past the checks above — a `<video autoplay>` in the prerendered HTML would
// download before any of them could run.
function HeroBackdrop() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (prefersLightweightBackdrop()) return;

    const holder = holderRef.current;
    if (!holder) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setShowVideo(true);
        observer.disconnect();
      }
    });
    observer.observe(holder);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={holderRef} className="absolute inset-0">
      <img
        src="/marketing/hero-poster.webp"
        alt=""
        fetchPriority="high"
        className="size-full object-cover"
      />
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/marketing/hero-poster.webp"
          className="absolute inset-0 size-full object-cover"
          src="/marketing/bg-video.mp4"
        />
      ) : null}
    </div>
  );
}

// Fluid viewport-unit type is a documented carve-out (see CLAUDE.md). The 6vw
// centre scales the headline against the card instead of stepping at
// breakpoints; the 2rem floor keeps the longer line inside a 390px phone and
// the 5.5rem ceiling stops it running away on a 4K display.
export function HeroSection() {
  // Viewport height minus the 4rem header. `min-h` covers a landscape phone,
  // where what is left cannot hold the copy; `max-h` stops a tall desktop
  // turning the hero into two screens of photograph.
  return (
    <section
      id="top"
      className="relative flex h-[calc(100dvh-4rem)] max-h-[64rem] min-h-[34rem] w-full flex-col justify-end overflow-hidden bg-white dark:bg-neutral-950"
    >
      <HeroBackdrop />

      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-40 mix-blend-overlay dark:opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white/85 dark:from-black/40 dark:to-black/75" />

      <div className="relative z-10 mx-auto w-full max-w-[110rem] p-6 sm:p-10 md:p-12 lg:p-16">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-10">
          <div>
            <Badge
              variant="outline"
              className="mb-5 border-black/15 bg-white/60 tracking-widest text-neutral-800 uppercase backdrop-blur-sm dark:border-white/20 dark:bg-black/40 dark:text-brand-cream"
            >
              AI creative suite
            </Badge>

            <h1 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.98] font-semibold tracking-tight text-balance text-black drop-shadow-sm dark:text-brand-cream dark:drop-shadow-none">
              <span className="block">Create anything.</span>
              <span className="block text-black/55 dark:text-brand-cream/55">
                Be found everywhere.
              </span>
            </h1>

            {/* Needs ~460px for one line and a wrapped row leaves a dangling rule, so
                it starts at sm. The section below names the same five anyway. */}
            <ul className="mt-8 hidden items-center gap-x-3 font-mono text-xs tracking-widest text-neutral-700 uppercase sm:flex dark:text-brand-cream/60">
              {HERO_MODALITIES.map((item) => (
                <li
                  key={item}
                  className="border-l border-black/20 pl-3 first:border-l-0 first:pl-0 dark:border-white/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:pb-2 lg:text-right">
            <p className="max-w-md text-sm leading-relaxed font-medium text-neutral-800 sm:text-base dark:text-brand-cream/70">
              One workspace for every kind of asset — and everything you generate arrives
              search-ready, so the work gets found without a second pass.
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/register">
                  Get 50 free credits
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-black/15 bg-white/60 backdrop-blur-sm hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-brand-cream dark:hover:bg-white/20"
              >
                <Link to="/#pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
