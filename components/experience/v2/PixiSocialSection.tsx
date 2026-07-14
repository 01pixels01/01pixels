"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const channels = [
  { name: "Facebook", color: "#1877F2" },
  { name: "Instagram", color: "#E1306C" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "TikTok", color: "#00E5FF" },
];

const steps = [
  { n: "01", title: "Alguien comenta o escribe", desc: "Un comentario en tu post, un DM, un WhatsApp. Todo llega a una sola bandeja con su hilo completo.", color: "#00E5FF" },
  { n: "02", title: "PIXI prepara la respuesta", desc: "Redactada con la voz de tu marca y tus datos reales, citando su fuente. En comentarios responde en público y sigue la venta en privado.", color: "#7C3AED" },
  { n: "03", title: "Tú apruebas. PIXI aprende", desc: "Un clic y sale con tu marca. Si la editas, aprende tu estilo. Nada se envía sin tu visto bueno.", color: "#00FF88" },
];

export function PixiSocialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-[#060608] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_40%,rgba(124,58,237,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/25 bg-[#7C3AED]/8 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Nuevo · PIXI Social
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Tus redes responden solas.
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED, #00FF88)" }}>
              Tú solo apruebas.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            PIXI, nuestra inteligencia, responde cada comentario y mensaje de Facebook, Instagram,
            WhatsApp y TikTok con la voz de tu marca — y espera tu visto bueno antes de enviar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Pasos */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group flex gap-5 p-6 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300"
              >
                <span className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.n}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tarjeta de aprobación (mock, glass) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="glass-premium rounded-2xl p-6 border border-[#00E5FF]/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full grid place-items-center text-sm font-bold text-white" style={{ background: "#E1306C" }}>LG</div>
              <div>
                <div className="text-white text-sm font-semibold">Laura Gómez</div>
                <div className="text-slate-500 text-xs">comentó tu publicación · Instagram</div>
              </div>
              <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,229,255,0.12)", color: "#00E5FF" }}>PIXI</span>
            </div>
            <div className="rounded-xl bg-[#111] p-3 text-slate-400 text-sm mb-2">Dijo: «hola, me interesa, ¿me pasan info y precios?»</div>
            <div className="rounded-xl p-3 text-slate-200 text-sm mb-4" style={{ background: "rgba(124,58,237,0.10)", borderLeft: "2px solid #7C3AED" }}>
              «Hola Laura, con gusto — somos 01pixels: investigación, publicidad y software. Te escribo por privado para darte el detalle. ¿Qué buscas lograr?»
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Confianza: alta", "Impacto: 1 persona", "Reversible: no → por eso te pregunto"].map((c) => (
                <span key={c} className="text-[11px] px-2.5 py-1 rounded-full border border-white/8 text-slate-500">{c}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-[#050505]" style={{ background: "linear-gradient(135deg,#00E5FF,#00FF88)" }}>Aprobar y enviar</span>
              <span className="px-4 py-2.5 rounded-xl text-sm text-slate-400 border border-white/10">Editar</span>
            </div>
          </motion.div>
        </div>

        {/* Canales + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-white/8 bg-[#0A0A0C]"
        >
          <div className="flex items-center gap-4 flex-wrap">
            {channels.map((c) => (
              <span key={c.name} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
            ))}
          </div>
          <Link
            href="/pixi-social"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            Conocer PIXI Social →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
