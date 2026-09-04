import { AboutSection } from "~/components/marketing/about-section";
import { AssociatedWithSection } from "~/components/marketing/associated-with-section";
import { FeaturesSection } from "~/components/marketing/features-section";
import { HeroSection } from "~/components/marketing/hero-section";
import { PricingSection } from "~/components/marketing/pricing-section";

export function meta() {
  return [
    { title: "StepUpMark.AI | AI-powered creative suite" },
    {
      name: "description",
      content:
        "One AI platform for image, video, code, voice and presentation generation — every asset built search-ready from the moment it is created.",
    },
  ];
}

export default function PublicHomeRoute() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <AssociatedWithSection />
    </>
  );
}
