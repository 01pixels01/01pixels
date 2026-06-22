"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Analizamos tu empresa, procesos actuales y oportunidades de automatización con IA.",
    icon: "🔍",
    color: "#00E5FF",
    duration: "30 min",
  },
  {
    n: "02",
    title: "Estrategia",
    desc: "Diseñamos un plan de transformación digital con prioridades claras y ROI esperado.",
    icon: "🗺️",
    color: "#7C3AED",
    duration: "1 semana",
  },
  {
    n: "03",
    title: "Implementación",
    desc: "Construimos y desplegamos las soluciones: automatizaciones, IA, web, campañas.",
    icon: "⚙️",
    color: "#00FF88",
    duration: "2-4 semanas",
  },
  {
    n: "04",
    title: "Automatización",
    desc: "Activamos los flujos automáticos y entrenamos la IA con los datos de tu negocio.",
    icon: "🤖",
    color: "#FBBC04",
    duration: "1-2 semanas",
  },
  {
    n: "05",
    title: "Escalamiento",
    desc: "Optimizamos, medimos resultados y escalamos lo que funciona para crecer más rápido.",
    icon: "🚀",
    color: "#00E5FF",
    duration: "Continuo",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.out", delay: 0.4 }
    );
  }, [inView]);

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,229,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Así trabajamos
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            De cero a resultados
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #00FF88, #00E5FF)" }}
            >
              en 30 días o menos
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Un proceso claro, sin sorpresas, con entregables concretos en cada etapa.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Animated connecting line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-px">
            <svg className="w-full h-2" preserveAspectRatio="none">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#00E5FF"
                strokeWidth="1"
                strokeDasharray="6 4"
                strokeDashoffset="1000"
                ref={lineRef}
                opacity="0.3"
              />
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                {/* Node */}
                <div
                  className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-5 z-10"
                  style={{
                    background: `${s.color}10`,
                    border: `1px solid ${s.color}25`,
                    boxShadow: `0 0 24px ${s.color}12`,
                  }}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span
                    className="text-[10px] font-mono absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[#050505] font-bold"
                    style={{ background: s.color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{s.desc}</p>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${s.color}10`,
                    color: s.color,
                    border: `1px solid ${s.color}20`,
                  }}
                >
                  {s.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                >
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: `${s.color}20` }} />
                )}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{s.title}</h3>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}10`, color: s.color }}
                  >
                    {s.duration}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-sm mb-5">
            El primer paso es gratis y sin compromiso.
          </p>
          <a
            href="/agendar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[#050505] font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            Comenzar el diagnóstico →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
