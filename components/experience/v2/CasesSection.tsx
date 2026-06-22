"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

const kpis = [
  { value: 150, suffix: "+", label: "Empresas transformadas", color: "#00E5FF" },
  { value: 98, suffix: "%", label: "Tasa de satisfacción", color: "#00FF88" },
  { value: 3, suffix: "x", label: "ROI promedio en 90 días", color: "#7C3AED" },
  { value: 72, suffix: "h", label: "Primer entregable", color: "#FBBC04" },
  { value: 5, suffix: "+", label: "Años de experiencia", color: "#00E5FF" },
  { value: 100, suffix: "%", label: "Soporte especializado", color: "#00FF88" },
];

const cases = [
  {
    industry: "Logística",
    result: "Reducción del 87% en tiempo de procesamiento",
    before: "6 horas manuales por día",
    after: "45 minutos automatizados",
    icon: "🚚",
    color: "#00E5FF",
  },
  {
    industry: "Clínica Médica",
    result: "200% más citas agendadas sin más personal",
    before: "Recepcionista manual + llamadas perdidas",
    after: "Chatbot IA 24/7 + recordatorios automáticos",
    icon: "🏥",
    color: "#00FF88",
  },
  {
    industry: "E-commerce",
    result: "3.4x más ventas en 90 días",
    before: "ROAS de 1.2 en Google Ads",
    after: "ROAS de 4.1 con optimización IA",
    icon: "🛒",
    color: "#7C3AED",
  },
];

function KPICard({ kpi, inView, i }: { kpi: typeof kpis[0]; inView: boolean; i: number }) {
  const count = useCountUp(kpi.value, inView, 1600 + i * 100);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
      className="text-center p-6 rounded-2xl border border-white/5 bg-[#0D0D0D]"
    >
      <div
        className="text-4xl font-bold mb-1"
        style={{ color: kpi.color }}
      >
        {count}{kpi.suffix}
      </div>
      <div className="text-slate-500 text-sm">{kpi.label}</div>
    </motion.div>
  );
}

export function CasesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="casos" className="relative py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,229,255,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Resultados reales
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Números que hablan
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00FF88, #00E5FF)" }}>
              por sí solos
            </span>
          </h2>
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.label} kpi={kpi} inView={inView} i={i} />
          ))}
        </div>

        {/* Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.industry}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="group p-6 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300 overflow-hidden relative"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.color}06 0%, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${c.color}12`, border: `1px solid ${c.color}20` }}
                  >
                    {c.icon}
                  </div>
                  <span className="text-slate-400 text-sm font-medium">{c.industry}</span>
                </div>

                <div
                  className="text-base font-bold mb-4 leading-snug"
                  style={{ color: c.color }}
                >
                  {c.result}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 text-xs mt-0.5">✗</span>
                    <span className="text-slate-500 text-xs">{c.before}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#00FF88] text-xs mt-0.5">✓</span>
                    <span className="text-slate-300 text-xs">{c.after}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">¿Tu empresa podría ser el próximo caso de éxito?</p>
          <a
            href="/agendar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00E5FF20, #7C3AED20)",
              border: "1px solid rgba(0,229,255,0.25)",
              color: "#00E5FF",
            }}
          >
            Agendar Diagnóstico Gratuito →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
