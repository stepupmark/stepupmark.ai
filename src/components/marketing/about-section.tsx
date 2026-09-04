import { motion, useTransform, type MotionValue } from "motion/react";

import { Badge } from "~/components/ui/badge";

import { ABOUT_STEPS, type AboutStep } from "./marketing-content";
import { useScrollRig } from "./use-scroll-rig";

const STEP_COUNT = ABOUT_STEPS.length;

// Per-step scroll keyframes. The first and last steps only need to fade at one
// edge; the middle steps fade in and back out around their centre point. The
// middle branch needs at least one step between the ends, so the content list
// this reads from must keep three or more entries.
function stepKeyframes(index: number) {
  const center = index / (STEP_COUNT - 1);
  if (index === 0) {
    return { input: [0, 0.15, 1], opacity: [1, 0, 0], y: [0, -50, -50], dot: [1, 0, 0] };
  }
  if (index === STEP_COUNT - 1) {
    return { input: [0, 0.85, 1], opacity: [0, 0, 1], y: [50, 50, 0], dot: [0, 0, 1] };
  }
  return {
    input: [0, center - 0.15, center, center + 0.15, 1],
    opacity: [0, 0, 1, 0, 0],
    y: [50, 50, 0, -50, -50],
    dot: [0, 0, 1, 0, 0],
  };
}

function DialStep({
  index,
  step,
  progress,
}: {
  index: number;
  step: string;
  progress: MotionValue<number>;
}) {
  const frames = stepKeyframes(index);
  const opacity = useTransform(progress, frames.input, frames.opacity);
  const dotOpacity = useTransform(progress, frames.input, frames.dot);

  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${(index * 25).toString()}deg)` }}
    >
      <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2">
        <motion.div className="relative flex items-center justify-center" style={{ opacity }}>
          <motion.span
            className="absolute -left-8 size-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
            style={{ opacity: dotOpacity }}
          />
          <span className="font-mono text-4xl font-semibold tracking-tighter text-neutral-900 dark:text-brand-cream">
            {step}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function ContentStep({
  index,
  item,
  progress,
}: {
  index: number;
  item: AboutStep;
  progress: MotionValue<number>;
}) {
  const frames = stepKeyframes(index);
  const opacity = useTransform(progress, frames.input, frames.opacity);
  const y = useTransform(progress, frames.input, frames.y);

  return (
    <motion.div className="absolute flex max-w-3xl flex-col items-start" style={{ opacity, y }}>
      <div className="mb-7 flex items-center gap-4">
        <span className="font-mono text-lg font-semibold text-neutral-400 dark:text-brand-cream/40">
          {item.step}
        </span>
        <span className="h-4 w-px bg-black/20 dark:bg-white/20" />
        <Badge variant="outline" className="tracking-widest uppercase">
          {item.tag}
        </Badge>
      </div>
      <h3 className="mb-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-black sm:text-5xl lg:text-[4rem] dark:text-white">
        {item.title}
      </h3>
      <p className="mb-9 max-w-xl text-lg leading-relaxed text-neutral-600 lg:text-xl dark:text-brand-cream/70">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {item.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-brand-cream/70"
          >
            {pill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function AboutStepList() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <ol className="space-y-14 border-l border-black/15 pl-8 sm:space-y-20 sm:pl-12 dark:border-white/15">
        {ABOUT_STEPS.map((item) => (
          <li key={item.step} className="relative flex flex-col items-start">
            <span className="absolute top-1 -left-8 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-white font-mono text-xs font-semibold text-neutral-500 ring-1 ring-black/15 sm:-left-12 dark:bg-neutral-950 dark:text-brand-cream/50 dark:ring-white/15">
              {item.step}
            </span>
            <Badge variant="outline" className="mb-4 tracking-widest uppercase">
              {item.tag}
            </Badge>
            <h3 className="mb-4 text-2xl leading-tight font-semibold tracking-tight text-balance text-black sm:text-3xl dark:text-white">
              {item.title}
            </h3>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-brand-cream/70">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {item.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 shadow-sm sm:text-[13px] dark:border-white/10 dark:bg-white/5 dark:text-brand-cream/70"
                >
                  {pill}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AboutSection() {
  const { ref, progress, enabled } = useScrollRig();
  const rotation = useTransform(progress, [0, 1], [0, -75]);

  return (
    <section
      id="about-us"
      ref={ref}
      className={
        enabled
          ? "relative h-[250vh] scroll-mt-16 bg-white dark:bg-neutral-950"
          : "scroll-mt-16 bg-white dark:bg-neutral-950"
      }
    >
      <h2 className="sr-only">How StepUpMark works</h2>

      {enabled ? (
        <div className="sticky top-0 flex h-dvh w-full items-center overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-[-50vh] size-[120vh] -translate-y-1/2 rounded-full border-2 border-black/15 dark:border-white/20"
            style={{ rotate: rotation }}
          >
            {ABOUT_STEPS.map((item, index) => (
              <DialStep key={item.step} index={index} step={item.step} progress={progress} />
            ))}
          </motion.div>

          {/* Dial is vh-sized, so it eats less width on wide screens than on a
              squarer `lg` one — left padding tightens from `xl` up rather than
              holding the `lg`-safe 55%. */}
          <div className="relative z-10 flex h-full w-full items-center justify-start pr-16 pl-[55%] xl:pl-[47%] 2xl:pl-[41%]">
            {ABOUT_STEPS.map((item, index) => (
              <ContentStep key={item.step} index={index} item={item} progress={progress} />
            ))}
          </div>
        </div>
      ) : (
        <AboutStepList />
      )}
    </section>
  );
}
