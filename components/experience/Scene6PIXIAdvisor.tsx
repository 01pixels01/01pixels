"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const choices = [
  {
    id: "automatizar",
    emoji: "🤖",
    label: "Quiero automatizar",
    title: "Hiperautomatización",
    description: "Conectamos tus sistemas, eliminamos tareas repetitivas y creamos agentes IA que trabajan contigo las 24 horas.",
    cta: "Ver soluciones IA →",
    href: "/servicios/hiperautomatizacion",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.4)",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "clientes",
    emoji: "📈",
    label: "Quiero más clientes",
    title: "Marketing Digital",
    description: "Estrategias SEO, SEM y redes sociales con datos reales que convierten visitantes en clientes listos para comprar.",
    cta: "Ver estrategias →",
    href: "/servicios/marketing-digital",
    color: "#f97316",
    glow: "rgba(249,115,22,0.4)",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: "seguridad",
    emoji: "🛡️",
    label: "Necesito seguridad",
    title: "CCTV & Seguridad",
    description: "Cámaras 4K con IA que detecta comportamientos anómalos, acceso biométrico y monitoreo remoto desde tu celular.",
    cta: "Ver soluciones →",
    href: "/servicios/cctv-seguridad",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export function Scene6PIXIAdvisor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });
  const [selected, setSelected] = useState<string | null>(null);

  const selectedChoice = choices.find((c) => c.id === selected);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020305] px-4 py-24">
      {/* Radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          PIXI te guía
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          ¿Qué necesita
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            tu empresa hoy?
          </span>
        </h2>
        <p className="text-slate-500 text-lg">
          Elige y PIXI te mostrará el camino
        </p>
      </motion.div>

      {/* PIXI robot */}
      <motion.div
        className="relative z-10 mb-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-b from-[#1a2040] to-[#0d1628] rounded-2xl border border-blue-500/40 flex flex-col items-center justify-center p-2"
            style={{ boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}>
            {/* Eyes */}
            <div className="flex gap-2 mb-2">
              <div className="w-4 h-4 bg-cyan-400 rounded-full" style={{ boxShadow: "0 0 10px #22d3ee" }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-0.5 ml-0.5" />
              </div>
              <div className="w-4 h-4 bg-cyan-400 rounded-full" style={{ boxShadow: "0 0 10px #22d3ee" }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-0.5 ml-0.5" />
              </div>
            </div>
            {/* Mouth */}
            <div className="w-10 h-1.5 bg-blue-500/50 rounded-full" />
            {/* Body grid */}
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="w-3 h-2 bg-orange-500/80 rounded-sm" />
              <div className="w-3 h-2 bg-teal-400/80 rounded-sm" />
              <div className="w-3 h-2 bg-green-500/80 rounded-sm" />
              <div className="w-3 h-2 bg-blue-500/80 rounded-sm" />
            </div>
          </div>
          {/* Speech bubble */}
          <div className="absolute -top-12 -right-20 whitespace-nowrap bg-[#0d1628] border border-blue-500/30 text-blue-300 text-xs font-medium px-3 py-2 rounded-xl">
            ¡Hola! Soy PIXI 👋
            <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#0d1628] border-r border-b border-blue-500/30 rotate-45" />
          </div>
        </div>
      </motion.div>

      {/* Choice buttons */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
        {choices.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
            className={`relative rounded-2xl border p-6 text-left transition-all duration-300 cursor-pointer ${
              selected === c.id
                ? "border-white/20 scale-105"
                : "border-white/5 hover:border-white/10 hover:scale-[1.02]"
            }`}
            style={{
              background: selected === c.id ? c.color + "15" : "#080c18",
              boxShadow: selected === c.id ? `0 0 40px ${c.glow}` : "none",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
          >
            {selected === c.id && (
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${c.gradient}`} />
            )}
            <div className="text-3xl mb-3">{c.emoji}</div>
            <div className="text-white font-semibold text-sm">{c.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {selectedChoice && (
          <motion.div
            key={selectedChoice.id}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mt-8 max-w-lg w-full rounded-2xl border p-8 text-center overflow-hidden"
            style={{
              borderColor: selectedChoice.color + "30",
              background: selectedChoice.color + "08",
            }}
          >
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${selectedChoice.gradient}`} />
            <h3 className="text-2xl font-bold text-white mb-3">{selectedChoice.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{selectedChoice.description}</p>
            <a
              href={selectedChoice.href}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r ${selectedChoice.gradient} hover:scale-105 transition-transform`}
            >
              {selectedChoice.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
