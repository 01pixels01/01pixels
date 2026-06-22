"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

export function Hero2026() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
    ).fromTo(
      subRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* R3F background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,229,255,0.07)_0%,transparent_60%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(124,58,237,0.06)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-[#050505] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          IA · Automatización · Marketing Digital
        </motion.div>

        <h1
          ref={headlineRef}
          className="opacity-0 text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
        >
          Transformamos Empresas
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #00E5FF 0%, #7C3AED 60%, #00FF88 100%)",
            }}
          >
            con IA y Automatización
          </span>
        </h1>

        <p
          ref={subRef}
          className="opacity-0 text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Construimos ecosistemas digitales que generan clientes, automatizan
          procesos y aceleran el crecimiento de tu empresa.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/agendar"
            className="group relative px-8 py-4 rounded-2xl text-[#050505] font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            <span className="relative z-10">Solicitar Diagnóstico Gratuito</span>
          </Link>
          <a
            href="#casos"
            className="px-8 py-4 rounded-2xl text-white font-medium text-base border border-white/10 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300"
          >
            Ver Casos de Éxito →
          </a>
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm"
        >
          {[
            { n: "150+", label: "Empresas" },
            { n: "98%", label: "Satisfacción" },
            { n: "3x", label: "ROI Promedio" },
            { n: "72h", label: "Primer entregable" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.n}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent animate-pulse" />
        <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
