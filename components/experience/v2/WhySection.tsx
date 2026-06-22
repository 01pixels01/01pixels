"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const differentiators = [
  {
    icon: "🧠",
    title: "IA Aplicada al Negocio Real",
    desc: "No vendemos tecnología por vender. Cada solución IA que implementamos tiene un ROI medible en 90 días.",
    color: "#00E5FF",
  },
  {
    icon: "⚡",
    title: "Automatización Avanzada",
    desc: "Conectamos tus sistemas, eliminamos procesos manuales y hacemos que tu empresa opere sola mientras escalás.",
    color: "#7C3AED",
  },
  {
    icon: "📈",
    title: "Estrategias Enfocadas en ROI",
    desc: "Cada campaña, cada automatización y cada línea de código se mide por su impacto en ventas y eficiencia.",
    color: "#00FF88",
  },
  {
    icon: "🚀",
    title: "Tecnología de Última Generación",
    desc: "Trabajamos con GPT-4o, Appian, Google Ads API y herramientas enterprise que la competencia no usa.",
    color: "#FBBC04",
  },
  {
    icon: "🤝",
    title: "Soporte Especializado 24/7",
    desc: "No te dejamos solo después del lanzamiento. Somos tu equipo de tecnología permanente, no un proveedor más.",
    color: "#00E5FF",
  },
];

const comparison = [
  { feature: "IA aplicada al negocio", us: true, them: false },
  { feature: "ROI medible en 90 días", us: true, them: false },
  { feature: "Automatización end-to-end", us: true, them: false },
  { feature: "Equipo certificado", us: true, them: true },
  { feature: "Soporte post-lanzamiento", us: true, them: false },
  { feature: "Integración multicanal", us: true, them: false },
];

export function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,rgba(0,229,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            Por qué elegirnos
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            No somos una agencia más.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
            >
              Somos tu equipo de tecnología.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Differentiators list */}
          <div className="space-y-5">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex gap-4 p-5 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${d.color}12`, border: `1px solid ${d.color}20` }}
                >
                  {d.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{d.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="rounded-2xl border border-white/8 overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-3 bg-[#111] border-b border-white/5 px-5 py-4">
              <div className="text-slate-400 text-sm font-medium">Característica</div>
              <div className="text-center">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #00E5FF20, #7C3AED20)",
                    color: "#00E5FF",
                    border: "1px solid rgba(0,229,255,0.25)",
                  }}
                >
                  01pixels
                </span>
              </div>
              <div className="text-center text-slate-500 text-sm">Otros</div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-slate-400 text-sm">{row.feature}</div>
                <div className="flex justify-center">
                  {row.us ? (
                    <span className="text-[#00FF88] text-lg">✓</span>
                  ) : (
                    <span className="text-red-400 text-lg">✗</span>
                  )}
                </div>
                <div className="flex justify-center">
                  {row.them ? (
                    <span className="text-slate-400 text-lg">✓</span>
                  ) : (
                    <span className="text-red-400/60 text-lg">✗</span>
                  )}
                </div>
              </div>
            ))}

            <div className="p-5 bg-[#0D0D0D]">
              <a
                href="/agendar"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
              >
                Quiero trabajar con 01pixels →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
