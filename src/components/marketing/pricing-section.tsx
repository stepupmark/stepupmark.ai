import { Link } from "react-router";

import { ChevronRightIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/cn";

import { PRICING_PLANS } from "./marketing-content";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-16 overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 dark:bg-neutral-950"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-10 text-center sm:mb-16">
          <Badge variant="outline" className="mb-4 tracking-widest uppercase">
            Choose Your Plans
          </Badge>
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-4xl lg:text-5xl dark:text-brand-cream">
            Pricing Plans
          </h2>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative h-full gap-0 p-6 transition-transform hover:-translate-y-2 sm:p-8",
                plan.isPopular && "border-primary shadow-lg",
              )}
            >
              {plan.isPopular ? (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 uppercase">
                  Best Choice
                </Badge>
              ) : null}

              <div className={cn("mb-8 text-center", plan.isPopular ? "pt-4" : "pt-2")}>
                <h3 className="mb-2 text-lg font-medium text-neutral-800 dark:text-brand-cream">
                  {plan.name}
                </h3>
                <span className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
                  {plan.price}
                </span>
                <span className="mt-1 block text-sm text-neutral-500 dark:text-brand-cream/50">
                  {plan.period}
                </span>
              </div>

              <Button
                asChild
                variant={plan.isPopular ? "default" : "outline"}
                className="mb-8 w-full"
              >
                <Link to="/register">
                  Choose {plan.name}
                  <ChevronRightIcon />
                </Link>
              </Button>

              <ul className="flex-grow space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="text-sm text-neutral-600 dark:text-brand-cream/70">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
