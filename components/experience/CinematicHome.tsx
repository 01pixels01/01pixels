"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PIXIHero } from "./v2/PIXIHero";
import { OracleSection } from "./v2/OracleSection";
import { CasesSection } from "./v2/CasesSection";
import { CommandCenter3D } from "./v2/CommandCenter3D";
import { TechStackSection } from "./v2/TechStackSection";
import { WhySection } from "./v2/WhySection";
import { ProcessSection } from "./v2/ProcessSection";
import { TestimonialsSection } from "./v2/TestimonialsSection";
import { CTAFinal2026 } from "./v2/CTAFinal2026";

export function CinematicHome() {
  return (
    <SmoothScrollProvider>
      {/* 1. PIXI despierta — hero narrativo */}
      <PIXIHero />
      {/* 2. Los tres oráculos */}
      <OracleSection />
      {/* 3. Casos de éxito + KPIs */}
      <CasesSection />
      {/* 4. Centro de control 3D */}
      <CommandCenter3D />
      {/* 5. Stack tecnológico — autoridad */}
      <TechStackSection />
      {/* 6. Por qué 01pixels */}
      <WhySection />
      {/* 7. Proceso de trabajo */}
      <ProcessSection />
      {/* 8. Testimonios */}
      <TestimonialsSection />
      {/* 9. CTA final cinematográfico */}
      <CTAFinal2026 />
    </SmoothScrollProvider>
  );
}
