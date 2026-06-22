"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Hero2026 } from "./v2/Hero2026";
import { ProblemSection } from "./v2/ProblemSection";
import { SolutionOrbit } from "./v2/SolutionOrbit";
import { ServicesBento } from "./v2/ServicesBento";
import { CasesSection } from "./v2/CasesSection";
import { CommandCenter3D } from "./v2/CommandCenter3D";
import { WhySection } from "./v2/WhySection";
import { ProcessSection } from "./v2/ProcessSection";
import { TestimonialsSection } from "./v2/TestimonialsSection";
import { CTAFinal2026 } from "./v2/CTAFinal2026";

export function CinematicHome() {
  return (
    <SmoothScrollProvider>
      <Hero2026 />
      <ProblemSection />
      <SolutionOrbit />
      <ServicesBento />
      <CasesSection />
      <CommandCenter3D />
      <WhySection />
      <ProcessSection />
      <TestimonialsSection />
      <CTAFinal2026 />
    </SmoothScrollProvider>
  );
}
