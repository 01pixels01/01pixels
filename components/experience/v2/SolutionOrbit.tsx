"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { label: "Google Ads", icon: "📢", color: "#FBBC04", angle: 0 },
  { label: "SEO", icon: "🔍", color: "#34A853", angle: 60 },
  { label: "IA", icon: "🤖", color: "#00E5FF", angle: 120 },
  { label: "Automatización", icon: "⚙️", color: "#7C3AED", angle: 180 },
  { label: "Desarrollo Web", icon: "💻", color: "#EA4335", angle: 240 },
  { label: "Analítica", icon: "📊", color: "#00FF88", angle: 300 },
];

export function SolutionOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const R = 160;

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            Nuestra solución
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Un Ecosistema Completo de
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}>
              Crecimiento Empresarial
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            01pixels en el centro, conectando todas las herramientas que tu empresa necesita para escalar.
          </p>
        </motion.div>

        {/* Orbital diagram */}
        <div className="flex justify-center">
          <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]">
            {/* Orbit ring */}
            <div
              className="absolute inset-0 rounded-full border border-[#00E5FF]/10 animate-spin"
              style={{ animationDuration: "30s" }}
            />
            <div
              className="absolute inset-6 rounded-full border border-[#7C3AED]/8 animate-spin"
              style={{ animationDuration: "22s", animationDirection: "reverse" }}
            />

            {/* Center core */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl flex flex-col items-center justify-center z-10"
              style={{
                background: "linear-gradient(135deg, #00E5FF12, #7C3AED12)",
                border: "1px solid rgba(0,229,255,0.25)",
                boxShadow: "0 0 40px rgba(0,229,255,0.15), 0 0 80px rgba(124,58,237,0.08)",
              }}
            >
              <div className="text-2xl font-bold text-white leading-none">01</div>
              <div className="text-[#00E5FF] text-xs font-mono mt-0.5">pixels</div>
            </motion.div>

            {/* Orbiting nodes */}
            {services.map((svc, i) => {
              const rad = (svc.angle * Math.PI) / 180;
              const x = 50 + (R / 4.2) * Math.cos(rad);
              const y = 50 + (R / 4.2) * Math.sin(rad);

              return (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* Connection line to center */}
                  <svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: `${R}px`,
                      height: `${R}px`,
                      transform: `translate(-50%,-50%) rotate(${svc.angle}deg)`,
                      opacity: 0.15,
                    }}
                  >
                    <line
                      x1="50%"
                      y1="50%"
                      x2="50%"
                      y2="50%"
                      stroke={svc.color}
                      strokeWidth="1"
                      strokeDasharray="4 3"
                    />
                  </svg>

                  <div
                    className="relative w-14 h-14 rounded-xl flex flex-col items-center justify-center cursor-default transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${svc.color}10`,
                      border: `1px solid ${svc.color}25`,
                      boxShadow: `0 0 16px ${svc.color}10`,
                    }}
                  >
                    <span className="text-xl">{svc.icon}</span>
                    <span
                      className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap"
                      style={{ color: svc.color }}
                    >
                      {svc.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Value props below orbit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24">
          {[
            { title: "Integrado", desc: "Todo conectado en un solo ecosistema" },
            { title: "Medible", desc: "Cada acción con métricas en tiempo real" },
            { title: "Escalable", desc: "Crece sin límites según tu empresa" },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center p-5 rounded-2xl border border-white/5 bg-[#0D0D0D]"
            >
              <div className="text-[#00E5FF] font-bold text-lg mb-1">{v.title}</div>
              <div className="text-slate-500 text-sm">{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
