"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const kpis = [
  { value: 150, suffix: "+", label: "Proyectos entregados", color: "#3b82f6", icon: "🚀" },
  { value: 98, suffix: "%", label: "Clientes satisfechos", color: "#10b981", icon: "⭐" },
  { value: 3, suffix: "x", label: "ROI promedio", color: "#f97316", icon: "📈" },
  { value: 72, suffix: "h", label: "Tiempo de respuesta inicial", color: "#a78bfa", icon: "⚡" },
  { value: 5, suffix: "+", label: "Años de experiencia", color: "#e879f9", icon: "🏆" },
  { value: 24, suffix: "/7", label: "Soporte disponible", color: "#34d399", icon: "🛡️" },
];

const cases = [
  {
    company: "Empresa Manufacturera",
    industry: "Industria",
    result: "Reducción del 40% en costos operativos mediante automatización ERP + CRM",
    color: "#3b82f6",
  },
  {
    company: "Cadena Retail",
    industry: "Comercio",
    result: "3x incremento en leads calificados con marketing digital data-driven",
    color: "#f97316",
  },
  {
    company: "Centro Logístico",
    industry: "Logística",
    result: "99.9% uptime en seguridad con CCTV IA y monitoreo predictivo",
    color: "#10b981",
  },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export function Scene5KPIs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="relative min-h-screen py-24 px-4 overflow-hidden bg-[#020305] flex flex-col items-center justify-center">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
      </div>

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Resultados reales
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Números que
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            hablan por sí solos
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Resultados medibles. Impacto real. Empresas transformadas.
        </p>
      </motion.div>

      {/* KPI grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl w-full mb-16">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative rounded-2xl border border-white/5 bg-[#080c18] p-6 text-center hover:border-white/10 transition-all duration-300 group"
            style={{
              boxShadow: `0 0 30px ${k.color}00`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${k.color}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${k.color}00`;
            }}
          >
            <div className="text-2xl mb-2">{k.icon}</div>
            <div
              className="text-4xl font-black mb-1 tabular-nums"
              style={{ color: k.color, textShadow: `0 0 20px ${k.color}60` }}
            >
              <CountUp target={k.value} suffix={k.suffix} active={isInView} />
            </div>
            <div className="text-xs text-slate-500">{k.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Success cases */}
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-center text-slate-500 text-xs font-mono tracking-widest uppercase mb-6">
          Casos de éxito
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-[#080c18] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.color + "20" }}>
                  <span className="text-xs font-bold" style={{ color: c.color }}>{c.company[0]}</span>
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{c.company}</div>
                  <div className="text-slate-600 text-xs">{c.industry}</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{c.result}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
