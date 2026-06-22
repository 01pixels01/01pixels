"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: "ia",
    icon: "🤖",
    title: "Inteligencia Artificial",
    desc: "Agentes IA, chatbots empresariales y IA generativa aplicada a tus procesos reales.",
    tags: ["GPT-4", "LangChain", "Agentes IA"],
    color: "#00E5FF",
    href: "/hiperautomatizacion",
    size: "col-span-2 row-span-2",
    highlight: true,
  },
  {
    id: "auto",
    icon: "⚙️",
    title: "Automatización Empresarial",
    desc: "RPA, BPM y flujos automáticos que eliminan el trabajo manual.",
    tags: ["RPA", "Appian", "Zapier"],
    color: "#7C3AED",
    href: "/hiperautomatizacion",
    size: "",
  },
  {
    id: "ads",
    icon: "📢",
    title: "Google Ads",
    desc: "Campañas de alto rendimiento enfocadas en leads calificados B2B.",
    tags: ["Search", "Display", "Remarketing"],
    color: "#FBBC04",
    href: "/marketing-digital",
    size: "",
  },
  {
    id: "seo",
    icon: "🔍",
    title: "SEO Empresarial",
    desc: "Posicionamiento técnico y de contenidos para aparecer primero en Google.",
    tags: ["On-Page", "Técnico", "Link Building"],
    color: "#34A853",
    href: "/marketing-digital",
    size: "",
  },
  {
    id: "web",
    icon: "💻",
    title: "Desarrollo Web Premium",
    desc: "Sitios y plataformas de alto impacto que convierten visitantes en clientes.",
    tags: ["Next.js", "React", "Awwwards"],
    color: "#00FF88",
    href: "/marketing-digital",
    size: "",
  },
  {
    id: "dash",
    icon: "📊",
    title: "Dashboards Inteligentes",
    desc: "Analítica en tiempo real para tomar decisiones con datos, no con intuición.",
    tags: ["Power BI", "GA4", "Custom"],
    color: "#FF6B6B",
    href: "/hiperautomatizacion",
    size: "",
  },
];

function ServiceCard({ s, delay }: { s: typeof services[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`group relative rounded-2xl p-6 border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-400 overflow-hidden ${s.size}`}
      style={
        s.highlight
          ? {
              border: `1px solid ${s.color}20`,
              background: `linear-gradient(135deg, #0D0D0D 60%, ${s.color}06)`,
            }
          : {}
      }
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 30%, ${s.color}08 0%, transparent 70%)` }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0"
          style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}
        >
          {s.icon}
        </div>

        <h3 className={`font-bold text-white mb-2 ${s.highlight ? "text-2xl" : "text-lg"}`}>
          {s.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {s.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={s.href}
          className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-200"
          style={{ color: s.color }}
        >
          Conocer más
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden">
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
            Servicios
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Todo lo que tu empresa
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}>
              necesita para escalar
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
