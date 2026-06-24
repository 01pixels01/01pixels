"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stack = [
  { name: "OpenAI", icon: "🧠", color: "#10a37f" },
  { name: "Appian", icon: "⚙️", color: "#00AEEF" },
  { name: "Google", icon: "🔍", color: "#FBBC04" },
  { name: "Meta Ads", icon: "📘", color: "#1877F2" },
  { name: "WhatsApp Business", icon: "💬", color: "#25D366" },
  { name: "Next.js", icon: "▲", color: "#ffffff" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Vercel", icon: "◆", color: "#ffffff" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Stripe", icon: "💳", color: "#635BFF" },
  { name: "Twilio", icon: "📱", color: "#F22F46" },
  { name: "Zapier", icon: "⚡", color: "#FF4A00" },
];

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 text-[#7C3AED] text-xs font-mono tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            Stack tecnológico
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Trabajamos con las mejores
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #00E5FF)" }}>
              tecnologías del mundo
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            No improvisamos. Usamos el stack enterprise que usan Apple, Stripe y las empresas más avanzadas del planeta.
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {stack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4, type: "spring" }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ "--tech-color": tech.color } as React.CSSProperties}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                style={{ background: `${tech.color}10`, border: `1px solid ${tech.color}20` }}
              >
                {tech.icon}
              </div>
              <span className="text-slate-500 text-[10px] font-medium text-center leading-tight group-hover:text-slate-300 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-600 text-xs mt-8 font-mono"
        >
          + 20 integraciones adicionales disponibles según el proyecto
        </motion.p>
      </div>
    </section>
  );
}
