"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Scene1Intro } from "@/components/experience/Scene1Intro";
import { Scene2Network } from "@/components/experience/Scene2Network";
import { Scene3Oracles } from "@/components/experience/Scene3Oracles";
import { Scene4Ecosystem } from "@/components/experience/Scene4Ecosystem";
import { Scene5KPIs } from "@/components/experience/Scene5KPIs";
import { Scene6PIXIAdvisor } from "@/components/experience/Scene6PIXIAdvisor";
import { Scene7CTA } from "@/components/experience/Scene7CTA";

export function CinematicHome() {
  return (
    <SmoothScrollProvider>
      <Scene1Intro />
      <Scene2Network />
      <Scene3Oracles />
      <Scene4Ecosystem />
      <Scene5KPIs />
      <Scene6PIXIAdvisor />
      <Scene7CTA />
    </SmoothScrollProvider>
  );
}
