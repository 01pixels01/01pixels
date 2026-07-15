"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-10 bg-[#050505] border-y border-white/5 overflow-hidden"
    >
      {/* Subtle glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-600 whitespace-nowrap"
        >
          Respaldados por
        </motion.p>

        {/* Divider vertical */}
        <div className="hidden sm:block w-px h-8 bg-white/8" />

        {/* Logo iNNpulsa */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative h-10 w-52 sm:w-60"
        >
          <Image
            src="/assets/innpulsa.png"
            alt="iNNpulsa Colombia — Ministerio de Comercio, Industria y Turismo"
            fill
            className="object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity duration-300"
          />
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-white/8" />

        {/* Logo MinTIC */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative h-12 w-16 sm:w-20"
        >
          <Image
            src="/assets/mintic.png"
            alt="Ministerio de Tecnologías de la Información y las Comunicaciones — MinTIC"
            fill
            className="object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity duration-300"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
