"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Gerente General",
    company: "LogiExpress Colombia",
    avatar: "CM",
    color: "#00E5FF",
    stars: 5,
    text: "01pixels transformó nuestra operación logística. Lo que antes nos tomaba 6 horas manuales ahora corre solo en 45 minutos. El ROI se vio en el primer mes.",
    result: "87% reducción en tiempo operativo",
  },
  {
    name: "María Fernanda Ríos",
    role: "Directora de Marketing",
    company: "Clínica Salud Total",
    avatar: "MR",
    color: "#7C3AED",
    stars: 5,
    text: "Implementaron un chatbot IA en WhatsApp que agenda citas solas. Pasamos de perder el 40% de las llamadas a tener el 100% de los leads atendidos 24/7.",
    result: "200% más citas agendadas",
  },
  {
    name: "Andrés Vásquez",
    role: "CEO",
    company: "TechRetail SAS",
    avatar: "AV",
    color: "#00FF88",
    stars: 5,
    text: "Las campañas de Google Ads que manejaban otros agentes tenían un ROAS de 1.2. Con 01pixels llegamos a 4.1 en tres meses. Son otro nivel técnico.",
    result: "3.4x aumento en ventas online",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#FBBC04] text-sm">★</span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,58,237,0.04)_0%,transparent_70%)]" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FBBC04]/20 bg-[#FBBC04]/5 text-[#FBBC04] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04] animate-pulse" />
            Lo que dicen nuestros clientes
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Empresas que ya
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FBBC04, #00E5FF)" }}
            >
              transformaron su operación
            </span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              onClick={() => setActive(i)}
              className="group relative p-6 rounded-2xl border cursor-pointer transition-all duration-400"
              style={{
                background: active === i
                  ? `linear-gradient(135deg, ${t.color}08, transparent)`
                  : "#0D0D0D",
                borderColor: active === i ? `${t.color}30` : "rgba(255,255,255,0.05)",
                boxShadow: active === i ? `0 0 40px ${t.color}08` : "none",
              }}
            >
              {/* Quote mark */}
              <div
                className="text-5xl font-serif leading-none mb-4 opacity-30"
                style={{ color: t.color }}
              >
                "
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                {t.text}
              </p>

              {/* Result badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium mb-5"
                style={{
                  background: `${t.color}10`,
                  color: t.color,
                  border: `1px solid ${t.color}20`,
                }}
              >
                ✓ {t.result}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role} · {t.company}</div>
                </div>
                <div className="ml-auto">
                  <Stars count={t.stars} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { label: "150+ empresas", sub: "transformadas" },
            { label: "4.9/5", sub: "calificación promedio" },
            { label: "98%", sub: "satisfacción cliente" },
            { label: "0 contratos", sub: "de permanencia" },
          ].map((t) => (
            <div key={t.label} className="text-center">
              <div className="text-white font-bold text-xl">{t.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{t.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
