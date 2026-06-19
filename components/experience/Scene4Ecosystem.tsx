"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { id: "core", label: "01pixels", sub: "Core", x: "50%", y: "50%", size: 80, color: "#3b82f6", glow: "#3b82f6", main: true },
  { id: "crm", label: "CRM", sub: "Salesforce", x: "20%", y: "20%", size: 52, color: "#60a5fa", glow: "#60a5fa", main: false },
  { id: "erp", label: "ERP", sub: "SAP / Odoo", x: "80%", y: "20%", size: 52, color: "#a78bfa", glow: "#a78bfa", main: false },
  { id: "appian", label: "Appian", sub: "BPM", x: "15%", y: "60%", size: 48, color: "#34d399", glow: "#34d399", main: false },
  { id: "mkt", label: "Marketing", sub: "Digital", x: "85%", y: "60%", size: 52, color: "#f97316", glow: "#f97316", main: false },
  { id: "cctv", label: "CCTV", sub: "Seguridad", x: "35%", y: "85%", size: 48, color: "#10b981", glow: "#10b981", main: false },
  { id: "ia", label: "IA", sub: "Generativa", x: "65%", y: "85%", size: 48, color: "#e879f9", glow: "#e879f9", main: false },
];

export function Scene4Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020305] px-4 py-24">
      {/* BG radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.12)_0%,_transparent_60%)] pointer-events-none" />

      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Ecosistema conectado
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Todo tu negocio,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            en un solo ecosistema
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Integramos cada herramienta para que trabajen juntas en perfecta armonía
        </p>
      </motion.div>

      {/* Map */}
      <motion.div
        className="relative w-full max-w-2xl aspect-square"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {services
            .filter((s) => !s.main)
            .map((s) => {
              const x1 = 200;
              const y1 = 200;
              const x2 = (parseFloat(s.x) / 100) * 400;
              const y2 = (parseFloat(s.y) / 100) * 400;
              return (
                <g key={s.id}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={s.color}
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                  />
                  <circle cx={x2} cy={y2} r="2" fill={s.color} opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
        </svg>

        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
          >
            <div
              className="relative rounded-full flex flex-col items-center justify-center text-center cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{
                width: s.size,
                height: s.size,
                background: `radial-gradient(circle, ${s.color}22 0%, ${s.color}08 100%)`,
                border: `1px solid ${s.color}40`,
                boxShadow: s.main ? `0 0 40px ${s.glow}60, 0 0 80px ${s.glow}20` : `0 0 20px ${s.glow}30`,
              }}
            >
              {s.main && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: s.color }}
                />
              )}
              <span className="text-white font-bold text-xs leading-none">{s.label}</span>
              {s.sub && <span className="text-slate-500 text-[9px] mt-0.5">{s.sub}</span>}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="mt-8 text-slate-600 text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        7 tecnologías · 1 visión unificada
      </motion.p>
    </div>
  );
}
