"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const oracles = [
  {
    id: "ia",
    name: "Oráculo IA",
    title: "Hiperautomatización",
    description: "CRM, ERP, Appian y agentes de IA que trabajan 24/7 por tu empresa.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.4)",
    accent: "from-blue-600 to-cyan-500",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    img: "/oraculo-ia.png",
    features: ["Automatización de procesos", "CRM inteligente", "ERP conectado", "Agentes IA custom"],
    delay: 0,
  },
  {
    id: "marketing",
    name: "Oráculo Marketing",
    title: "Marketing Digital",
    description: "Estrategias data-driven que convierten visitantes en clientes leales.",
    color: "#f97316",
    glow: "rgba(249,115,22,0.4)",
    accent: "from-orange-500 to-pink-500",
    border: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    img: "/oraculo-marketing.png",
    features: ["SEO & SEM", "Redes sociales", "Email automation", "Analítica avanzada"],
    delay: 0.15,
  },
  {
    id: "seguridad",
    name: "Oráculo Seguridad",
    title: "CCTV & Seguridad",
    description: "Vigilancia inteligente con IA que detecta amenazas antes de que ocurran.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    accent: "from-emerald-500 to-teal-400",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    img: "/oraculo-seguridad.png",
    features: ["Cámaras IP 4K", "IA de detección", "Monitoreo 24/7", "Alertas en tiempo real"],
    delay: 0.3,
  },
];

export function Scene3Oracles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <div ref={ref} className="relative min-h-screen py-24 px-4 overflow-hidden bg-[#020305] flex flex-col items-center justify-center">
      {/* Background nebula */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Los tres pilares
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Los Oráculos
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-emerald-400">
            del negocio
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Tres fuerzas que transforman empresas colombianas en referentes digitales
        </p>
      </motion.div>

      {/* Oracle cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {oracles.map((o) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.8, delay: o.delay, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <div
              className={`relative rounded-2xl border ${o.border} bg-[#080c18] overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer`}
              style={{ boxShadow: `0 0 40px ${o.glow}00` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px ${o.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${o.glow}00`;
              }}
            >
              {/* Gradient top line */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${o.accent} opacity-50`} />

              {/* Oracle image */}
              <div className="relative h-52 overflow-hidden bg-gradient-to-b from-[#0d1225] to-[#080c18]">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(ellipse at center, ${o.color}, transparent 70%)` }}
                />
                <Image
                  src={o.img}
                  alt={o.name}
                  fill
                  className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={() => {}}
                />
                {/* Fallback icon if no image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-2xl border flex items-center justify-center"
                    style={{ borderColor: o.color + "40", background: o.color + "10" }}
                  >
                    <span className="text-4xl">
                      {o.id === "ia" ? "🤖" : o.id === "marketing" ? "📈" : "🛡️"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-4 ${o.badge}`}>
                  {o.title}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{o.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{o.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: o.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6">
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${o.accent} opacity-80 hover:opacity-100 transition-opacity`}
                  >
                    Explorar →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
