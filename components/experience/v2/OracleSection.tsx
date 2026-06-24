"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const oracles = [
  {
    id: "ia",
    name: "Oráculo IA",
    tagline: "Automatización & Inteligencia Artificial",
    desc: "Transformamos tus procesos manuales en flujos automáticos. CRM, ERP, agentes IA y automatización que trabajan mientras tú duermes.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.12)",
    icon: "🤖",
    href: "/hiperautomatizacion",
    services: ["Agentes IA", "CRM / ERP", "Appian Low-Code", "WhatsApp Business", "Automatización RPA", "IA Generativa"],
    stat: { n: "80%", label: "menos trabajo manual" },
    bg: "from-[#00E5FF]/5 to-transparent",
  },
  {
    id: "mkt",
    name: "Oráculo Marketing",
    tagline: "Google Ads · SEO · Branding · Web",
    desc: "Llevamos tu empresa al top de Google y convertimos clics en clientes reales. Estrategias B2B enfocadas en ROI, no en métricas de vanidad.",
    color: "#FF6B9D",
    glow: "rgba(255,107,157,0.12)",
    icon: "📈",
    href: "/marketing-digital",
    services: ["Google Ads", "SEO Técnico", "Landing Pages", "Meta Ads", "Branding", "Email Marketing"],
    stat: { n: "3.4x", label: "ROAS promedio" },
    bg: "from-[#FF6B9D]/5 to-transparent",
  },
  {
    id: "seg",
    name: "Oráculo Seguridad",
    tagline: "CCTV · Biometría · Control de Acceso",
    desc: "Protege lo que construiste. Cámaras 4K con IA de detección, control biométrico y monitoreo 24/7 desde tu celular.",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.12)",
    icon: "🛡️",
    href: "/seguridad-inteligente",
    services: ["Cámaras IP 4K", "Control Biométrico", "Monitoreo 24/7", "Control Vehicular", "Acceso Facial", "Alertas IA"],
    stat: { n: "24/7", label: "vigilancia activa" },
    bg: "from-[#7C3AED]/5 to-transparent",
  },
];

function OracleCard({ oracle, index }: { oracle: typeof oracles[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
      style={{ background: "#0D0D0D" }}
    >
      {/* Gradient glow bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${oracle.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${oracle.color}60, transparent)` }} />

      <div className="relative z-10 p-8">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: `${oracle.color}12`, border: `1px solid ${oracle.color}25`, boxShadow: `0 0 24px ${oracle.color}15` }}
          >
            {oracle.icon}
          </div>
          <div
            className="text-right"
          >
            <div className="text-3xl font-bold" style={{ color: oracle.color }}>{oracle.stat.n}</div>
            <div className="text-slate-500 text-xs">{oracle.stat.label}</div>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-white mb-1">{oracle.name}</h3>
        <p className="text-xs font-mono tracking-widest mb-4" style={{ color: oracle.color }}>{oracle.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{oracle.desc}</p>

        {/* Services grid */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {oracle.services.map((s) => (
            <div
              key={s}
              className="flex items-center gap-2 text-xs text-slate-400 py-1.5 px-3 rounded-lg"
              style={{ background: `${oracle.color}08`, border: `1px solid ${oracle.color}12` }}
            >
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: oracle.color }} />
              {s}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={oracle.href}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${oracle.color}20, ${oracle.color}10)`,
            border: `1px solid ${oracle.color}30`,
            color: oracle.color,
          }}
        >
          Explorar {oracle.name}
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function OracleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,229,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 text-slate-400 text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            Los tres oráculos
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Elige tu camino
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #FF6B9D, #7C3AED)" }}>
              hacia la transformación
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Tres especialidades. Un solo equipo. Resultados medibles desde el día 30.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {oracles.map((o, i) => (
            <OracleCard key={o.id} oracle={o} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[#050505] font-bold text-base transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            Agendar Diagnóstico Gratuito →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
