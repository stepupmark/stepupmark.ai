import { Link } from "react-router";

import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { motion, useTransform } from "motion/react";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/cn";

import { FEATURE_CARDS, type FeatureCard } from "./marketing-content";
import { useScrollRig } from "./use-scroll-rig";

function FeatureCardView({ card, variant }: { card: FeatureCard; variant: "track" | "rail" }) {
  const Icon = card.icon;
  const inTrack = variant === "track";

  return (
    <article
      className={cn(
        "group relative flex h-[470px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-black/15 bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-colors hover:border-neutral-900 dark:border-white/15 dark:bg-neutral-900/95 dark:backdrop-blur-md dark:hover:border-brand-cream",
        inTrack ? "w-[380px]" : "w-[300px] snap-start sm:w-[340px]",
      )}
      style={
        inTrack
          ? {
              transform: `translateY(${card.offsetY.toString()}px) rotate(${card.rotate.toString()}deg)`,
            }
          : undefined
      }
    >
      {/* Backdrop is texture, not a picture: low-opacity image under an even
          veil, so the two mismatched source illustrations both read the same. */}
      <img
        src={card.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110 dark:opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/70 dark:bg-neutral-950/65" />

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-black/10 bg-neutral-100 text-neutral-700 shadow-lg dark:border-white/15 dark:bg-white/5 dark:text-brand-cream">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <span className="rounded-lg border border-black/10 bg-white px-2.5 py-1 font-mono text-sm font-black tracking-widest text-neutral-500 dark:border-white/5 dark:bg-black/40 dark:text-neutral-400">
          {card.number}
        </span>
      </div>

      <div className="relative z-10 flex flex-grow flex-col">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-brand-cream">
          {card.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-brand-cream/70">
          {card.description}
        </p>
        <ul className="mt-auto space-y-2">
          {card.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-brand-cream/90"
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 bg-neutral-900/10 text-neutral-800 dark:border-brand-cream/30 dark:bg-brand-cream/20 dark:text-brand-cream">
                <CheckIcon className="size-2.5 stroke-[3]" aria-hidden="true" />
              </span>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-end border-t border-black/15 pt-3 dark:border-white/10">
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          StepUpMark AI
        </span>
      </div>
    </article>
  );
}

function FeaturesIntro() {
  return (
    <div className="flex flex-col items-start text-left">
      <Badge variant="outline" className="mb-4 tracking-widest uppercase">
        Creative Suite Matrix
      </Badge>
      <h2 className="mb-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-4xl lg:text-5xl dark:text-brand-cream">
        Studio-grade AI tools for limitless creators.
      </h2>
      <p className="mb-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-brand-cream/70">
        Eleven studio tools in one workspace, from first prompt to search-ready asset.
      </p>
      <Link
        to="/#pricing"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline dark:text-brand-cream"
      >
        See what each plan includes
        <ArrowRightIcon className="size-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function FeaturesSection() {
  const { ref, progress, enabled } = useScrollRig();
  // The track is `w-max`, so this percentage is of its own width. It ends just
  // past the last card rather than at a round number.
  const x = useTransform(progress, [0, 1], ["2%", "-78%"]);

  return (
    <section
      id="features"
      ref={ref}
      className={
        enabled
          ? "relative h-[300vh] scroll-mt-16 bg-neutral-100 dark:bg-neutral-950"
          : "scroll-mt-16 bg-neutral-100 px-4 py-16 sm:px-8 sm:py-24 dark:bg-neutral-950"
      }
    >
      {enabled ? (
        // Track has its own overflow-hidden so a sliding card can't cross the heading.
        <div className="sticky top-0 grid h-dvh w-full grid-cols-[3fr_8fr] items-center gap-8 overflow-hidden px-16">
          <div className="relative z-10">
            <FeaturesIntro />
            {/* Progress for the sideways track, which runs several screens. */}
            <div className="mt-10 h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-neutral-900 dark:bg-brand-cream"
                style={{ scaleX: progress }}
              />
            </div>
          </div>

          <div className="relative z-10 h-[620px] overflow-hidden">
            <motion.div
              className="flex h-full w-max items-center gap-4 -space-x-12 pl-12"
              style={{ x }}
            >
              {FEATURE_CARDS.map((card) => (
                <FeatureCardView key={card.number} card={card} variant="track" />
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl">
          <FeaturesIntro />
          {/* A rail rather than a column: eleven stacked cards is 5,000px of
              scrolling, and native snap scrolling keeps the set browsable
              without asking the page for the height. */}
          <div className="relative mt-10">
            <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8">
              {FEATURE_CARDS.map((card) => (
                <FeatureCardView key={card.number} card={card} variant="rail" />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-neutral-100 to-transparent sm:w-16 dark:from-neutral-950" />
          </div>
        </div>
      )}
    </section>
  );
}
