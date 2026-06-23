"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const services = [
  { label: "Google Ads", icon: "📢", color: "#FBBC04", angle: 0 },
  { label: "SEO",         icon: "🔍", color: "#34A853", angle: 60 },
  { label: "IA",          icon: "🤖", color: "#00E5FF", angle: 120 },
  { label: "Automatización", icon: "⚙️", color: "#7C3AED", angle: 180 },
  { label: "Desarrollo Web", icon: "💻", color: "#EA4335", angle: 240 },
  { label: "Analítica",   icon: "📊", color: "#00FF88", angle: 300 },
];

export function SolutionOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-20 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            Nuestra solución
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Un Ecosistema Completo de
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}>
              Crecimiento Empresarial
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            01pixels en el centro, conectando todo lo que tu empresa necesita para escalar.
          </p>
        </motion.div>

        {/* Orbital diagram — responsive size */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px]">

            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-[#00E5FF]/10 animate-spin" style={{ animationDuration: "30s" }} />
            <div className="absolute inset-5 rounded-full border border-[#7C3AED]/8 animate-spin" style={{ animationDuration: "22s", animationDirection: "reverse" }} />

            {/* Center — Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center z-10 p-2"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))",
                border: "1px solid rgba(0,229,255,0.25)",
                boxShadow: "0 0 40px rgba(0,229,255,0.18), 0 0 80px rgba(124,58,237,0.08)",
              }}
            >
              <Image
                src="/Logo.png"
                alt="01pixels"
                width={80}
                height={40}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Orbiting nodes */}
            {services.map((svc, i) => {
              const rad = (svc.angle * Math.PI) / 180;
              const x = 50 + 38 * Math.cos(rad);
              const y = 50 + 38 * Math.sin(rad);

              return (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* Tooltip al hover */}
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ background: `${svc.color}18`, color: svc.color, border: `1px solid ${svc.color}30` }}
                  >
                    {svc.label}
                  </div>

                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl cursor-default transition-all duration-300 group-hover:scale-115 group-hover:-translate-y-1"
                    style={{
                      background: `${svc.color}12`,
                      border: `1px solid ${svc.color}28`,
                      boxShadow: `0 0 16px ${svc.color}12`,
                    }}
                  >
                    {svc.icon}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-10 sm:mt-14">
          {[
            { title: "Integrado", desc: "Todo en un solo ecosistema" },
            { title: "Medible",   desc: "Métricas en tiempo real" },
            { title: "Escalable", desc: "Crece sin límites" },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center p-3 sm:p-5 rounded-2xl border border-white/5 bg-[#0D0D0D]"
            >
              <div className="text-[#00E5FF] font-bold text-sm sm:text-lg mb-1">{v.title}</div>
              <div className="text-slate-500 text-xs sm:text-sm hidden sm:block">{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
