"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    icon: "⏳",
    title: "Tiempo Perdido en Tareas Manuales",
    desc: "Tu equipo gasta horas en procesos repetitivos que una IA puede hacer en segundos.",
    stat: "80% del tiempo",
    color: "#FF6B6B",
  },
  {
    icon: "📉",
    title: "Baja Conversión de Clientes",
    desc: "Sin automatización, los leads se enfrían antes de que puedas atenderlos.",
    stat: "60% de oportunidades perdidas",
    color: "#FF9F43",
  },
  {
    icon: "🔀",
    title: "Datos Dispersos y Sin Control",
    desc: "Excel, WhatsApp, email… tu información vive en 10 lugares distintos sin conectarse.",
    stat: "Sin visibilidad real",
    color: "#7C3AED",
  },
  {
    icon: "🚶",
    title: "Competencia que Se Mueve Más Rápido",
    desc: "Mientras vos operás manualmente, tus competidores ya automatizaron y escalaron.",
    stat: "3x más lento",
    color: "#00E5FF",
  },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            El problema
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Tu Empresa Está Perdiendo
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF6B6B, #FF9F43)" }}>
              Oportunidades Todos Los Días
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Sin tecnología que trabaje por vos, cada día que pasa es dinero que se va.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-6 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 20% 50%, ${p.color}08 0%, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}
                  >
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium"
                      style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}
                    >
                      ⚠ {p.stat}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow bridge to solution */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center mt-16 gap-3"
        >
          <div className="text-slate-500 text-sm font-mono">La solución existe</div>
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-px h-4 bg-gradient-to-b from-[#00E5FF]/60 to-transparent animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
