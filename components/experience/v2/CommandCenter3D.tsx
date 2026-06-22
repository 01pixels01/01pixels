"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CommandCanvas = dynamic(
  () => import("./CommandCanvas").then((m) => ({ default: m.CommandCanvas })),
  { ssr: false }
);

const metrics = [
  { label: "Leads generados hoy", value: "47", delta: "+12%", color: "#00FF88" },
  { label: "Automatizaciones activas", value: "128", delta: "En vivo", color: "#00E5FF" },
  { label: "Conversación IA", value: "94%", delta: "Precisión", color: "#7C3AED" },
  { label: "ROI acumulado", value: "3.8x", delta: "+0.3 este mes", color: "#FBBC04" },
];

export function CommandCenter3D() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(124,58,237,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 text-[#7C3AED] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            Centro de control
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Tu empresa operando en
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #00E5FF)" }}
            >
              modo automático
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Mientras dormís, tu empresa genera leads, atiende clientes y procesa operaciones con IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] rounded-3xl overflow-hidden border border-white/5"
            style={{ background: "linear-gradient(135deg, #0D0D0D, #050505)" }}
          >
            <CommandCanvas />

            {/* Overlay label */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00FF88] tracking-widest uppercase">
                Sistema activo · En vivo
              </span>
            </div>

            {/* Scan line effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.01) 2px, rgba(0,229,255,0.01) 4px)",
              }}
            />
          </motion.div>

          {/* Metrics panel */}
          <div className="space-y-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${m.color}12`,
                    border: `1px solid ${m.color}20`,
                    boxShadow: `0 0 20px ${m.color}08`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: m.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-slate-500 text-xs mb-1">{m.label}</div>
                  <div className="text-white font-bold text-xl">{m.value}</div>
                </div>
                <div
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{
                    background: `${m.color}10`,
                    color: m.color,
                    border: `1px solid ${m.color}20`,
                  }}
                >
                  {m.delta}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <a
                href="/agendar"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[#050505] font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]"
                style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
              >
                Quiero este control para mi empresa →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
