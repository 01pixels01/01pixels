"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ORACLES = [
  {
    id: "ia",
    codename: "AURELIUS",
    name: "Oráculo IA",
    tagline: "The Oracle of Hyperautomation",
    desc: "CRM, ERP, Appian y agentes de IA que trabajan 24/7 por tu empresa.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.5)",
    particle: "#00E5FF",
    href: "/hiperautomatizacion",
    img: "/assets/oracles/aurelius/hero.webp",
    stat: "80%",
    statLabel: "menos trabajo manual",
    cta: "Automatizar mi empresa",
    shadow: "0 0 120px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.2)",
    haloColor: "rgba(0,229,255,0.15)",
  },
  {
    id: "mkt",
    codename: "LUMINA",
    name: "Oráculo Marketing",
    tagline: "Guardian of Digital Growth",
    desc: "SEO, pauta inteligente y estrategias enfocadas en ROI, no en métricas de vanidad.",
    color: "#FF55CC",
    glow: "rgba(255,85,204,0.5)",
    particle: "#FF55CC",
    href: "/marketing-digital",
    img: "/assets/oracles/lumina/hero.webp",
    stat: "3.4×",
    statLabel: "ROAS promedio",
    cta: "Crecer mi marca",
    shadow: "0 0 120px rgba(255,85,204,0.35), 0 0 40px rgba(255,85,204,0.2)",
    haloColor: "rgba(255,85,204,0.15)",
  },
  {
    id: "seg",
    codename: "AEGIS",
    name: "Oráculo Seguridad",
    tagline: "Guardian of Digital & Physical Protection",
    desc: "Vigilancia absoluta con CCTV, biometría e IA que protege antes de que ocurra cualquier amenaza.",
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.5)",
    particle: "#D4AF37",
    href: "/seguridad-inteligente",
    img: "/assets/oracles/aegis/hero.webp",
    stat: "24/7",
    statLabel: "vigilancia activa",
    cta: "Proteger mi empresa",
    shadow: "0 0 120px rgba(212,175,55,0.35), 0 0 40px rgba(212,175,55,0.2)",
    haloColor: "rgba(212,175,55,0.15)",
  },
];

function Particles({ color, active }: { color: string; active: boolean }) {
  const count = 18;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left  = 10 + ((i * 73) % 80);
        const delay = (i * 0.37) % 3;
        const dur   = 2.5 + (i % 3) * 0.8;
        const size  = 1.5 + (i % 3) * 1.2;
        return (
          <div
            key={i}
            className="absolute rounded-full transition-opacity duration-700"
            style={{
              left:       `${left}%`,
              bottom:     `${5 + ((i * 41) % 60)}%`,
              width:      `${size}px`,
              height:     `${size}px`,
              background: color,
              opacity:    active ? 0.7 : 0,
              boxShadow:  `0 0 ${size * 3}px ${color}`,
              animation:  active
                ? `sanctuary-float-${i % 4} ${dur}s ${delay}s ease-in-out infinite`
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export function OracleSanctuary() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#020305] overflow-hidden py-24"
    >
      {/* CSS keyframes for particles */}
      <style>{`
        @keyframes sanctuary-float-0 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.2)} }
        @keyframes sanctuary-float-1 { 0%,100%{transform:translateY(-8px) scale(0.9)} 50%{transform:translateY(-36px) scale(1.1)} }
        @keyframes sanctuary-float-2 { 0%,100%{transform:translateY(0) scale(1.1)} 50%{transform:translateY(-20px) scale(0.85)} }
        @keyframes sanctuary-float-3 { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(-32px) scale(1.15)} }
        @keyframes sanctuary-breathe { 0%,100%{transform:translateY(0px) scale(1)} 50%{transform:translateY(-12px) scale(1.008)} }
      `}</style>

      {/* Architectural background — three light columns */}
      <div className="absolute inset-0 pointer-events-none">
        {ORACLES.map((o, i) => (
          <div
            key={o.id}
            className="absolute bottom-0 transition-opacity duration-700"
            style={{
              left:    `${16.5 + i * 33.3}%`,
              width:   "1px",
              height:  "60%",
              background: `linear-gradient(to top, ${o.color}30, transparent)`,
              opacity: hovered === null ? 0.3 : hovered === o.id ? 0.8 : 0.05,
            }}
          />
        ))}
        {/* Ground glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to top, rgba(0,229,255,0.03), transparent)" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-20 px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "linear-gradient(135deg,#00E5FF,#FF55CC)" }} />
          Las tres inteligencias
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Los guardianes de
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #00E5FF 0%, #FF55CC 50%, #D4AF37 100%)" }}
          >
            tu empresa
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Tres inteligencias especializadas trabajando en paralelo,
          <br className="hidden sm:block" /> las 24 horas, los 365 días.
        </p>
      </motion.div>

      {/* Oracle trinity */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 items-end">
        {ORACLES.map((o, i) => {
          const isHovered  = hovered === o.id;
          const isDimmed   = hovered !== null && !isHovered;
          const isCenter   = i === 1;

          return (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center cursor-pointer group"
              style={{ zIndex: isHovered ? 20 : isCenter ? 10 : 5 }}
              onMouseEnter={() => setHovered(o.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Halo ring above oracle */}
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full transition-all duration-700 pointer-events-none"
                style={{
                  width:     isHovered ? 180 : 100,
                  height:    isHovered ? 180 : 100,
                  background: `radial-gradient(ellipse at center, ${o.haloColor} 0%, transparent 70%)`,
                  filter:    `blur(${isHovered ? 20 : 30}px)`,
                  opacity:   isDimmed ? 0 : 1,
                }}
              />

              {/* Oracle image — emerges from pedestal */}
              <div
                className="relative w-full transition-all duration-700"
                style={{
                  height:    isHovered ? 580 : isCenter ? 520 : 460,
                  transform: `scale(${isDimmed ? 0.92 : 1}) translateY(${isDimmed ? 20 : 0}px)`,
                  opacity:   isDimmed ? 0.25 : 1,
                  filter:    isDimmed ? "grayscale(0.5) brightness(0.4)" : "none",
                  animation: !isDimmed ? `sanctuary-breathe ${3.5 + i * 0.4}s ease-in-out infinite` : "none",
                }}
              >
                {/* Glow behind image */}
                <div
                  className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 80%, ${o.glow} 0%, transparent 65%)`,
                    opacity: isHovered ? 0.6 : 0.2,
                    filter: "blur(20px)",
                  }}
                />

                <Image
                  src={o.img}
                  alt={o.name}
                  fill
                  className="object-cover object-top"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 40px ${o.color}80) drop-shadow(0 0 80px ${o.color}40)`
                      : `drop-shadow(0 0 20px ${o.color}30)`,
                    transition: "filter 0.7s ease",
                  }}
                />

                {/* Particles */}
                <Particles color={o.particle} active={isHovered} />
              </div>

              {/* Pedestal / info block */}
              <div
                className="relative w-full transition-all duration-500 rounded-2xl overflow-hidden"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${o.color}12, ${o.color}06)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isHovered ? o.color + "30" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHovered ? o.shadow : "none",
                  transform: isDimmed ? "scale(0.95)" : "scale(1)",
                  opacity: isDimmed ? 0.2 : 1,
                }}
              >
                {/* Top color line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${o.color}, transparent)`,
                    opacity: isHovered ? 1 : 0.3,
                  }}
                />

                <div className="px-6 py-5">
                  {/* Codename */}
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1 transition-colors duration-300"
                    style={{ color: o.color }}>
                    {o.codename}
                  </p>
                  <h3 className="text-lg font-bold text-white mb-0.5">{o.name}</h3>
                  <p className="text-[11px] font-mono text-slate-600 mb-3">{o.tagline}</p>

                  {/* Stat */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold" style={{ color: o.color }}>{o.stat}</span>
                    <span className="text-xs text-slate-500">{o.statLabel}</span>
                  </div>

                  {/* Desc — only on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: isHovered ? 80 : 0, opacity: isHovered ? 1 : 0 }}
                  >
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{o.desc}</p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={o.href}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                    style={{
                      background: isHovered ? `linear-gradient(135deg, ${o.color}25, ${o.color}10)` : "transparent",
                      border: `1px solid ${o.color}${isHovered ? "40" : "15"}`,
                      color: isHovered ? o.color : "rgba(255,255,255,0.25)",
                    }}
                    onClick={(e) => !isHovered && e.preventDefault()}
                  >
                    {o.cta}
                    <span className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center mt-16 px-6"
      >
        <Link
          href="/agendar"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[#050505] text-base transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]"
          style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
        >
          Agendar Diagnóstico Gratuito →
        </Link>
        <p className="text-slate-600 text-xs mt-3 font-mono">Sin costo · Sin compromiso · Resultados desde el día 30</p>
      </motion.div>
    </section>
  );
}
