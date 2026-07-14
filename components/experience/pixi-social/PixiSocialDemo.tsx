"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Channel = "facebook" | "instagram" | "whatsapp" | "tiktok";
const CH: Record<Channel, { label: string; color: string; kind: string }> = {
  facebook: { label: "Facebook", color: "#1877F2", kind: "comentó tu publicación" },
  instagram: { label: "Instagram", color: "#E1306C", kind: "comentó tu post" },
  whatsapp: { label: "WhatsApp", color: "#25D366", kind: "te escribió" },
  tiktok: { label: "TikTok", color: "#00E5FF", kind: "comentó tu video" },
};

type Draft = {
  id: number; channel: Channel; name: string; said: string;
  reply: string; dm?: string; why: string; source: "regla" | "PIXI";
};

// Guion de demo — PIXI responde con la voz de 01pixels, citando su fuente.
const SCRIPT: Omit<Draft, "id">[] = [
  {
    channel: "instagram", name: "Laura Gómez", said: "hola, me interesa, ¿me pasan info y precios?",
    reply: "Hola Laura, con gusto — somos 01pixels: investigación de mercados, publicidad y software. Cuéntame qué buscas lograr y te preparo una propuesta.",
    dm: "Te escribo por privado para darte el detalle completo. ¿Qué necesitas resolver?",
    why: "Coincidió tu regla «info/precio». Confianza: alta (respuesta definida por ti). En comentarios respondo en público y sigo en privado.",
    source: "regla",
  },
  {
    channel: "facebook", name: "Carlos Pineda", said: "¿ustedes hacen campañas de Google Ads?",
    reply: "Sí, Carlos — el marketing digital 360° es una de nuestras áreas: SEO, Google Ads y Meta Ads. ¿Para qué tipo de negocio sería?",
    why: "Respondí con la FAQ de servicios de 01pixels (fuente: marketing-digital). Confianza: alta.",
    source: "PIXI",
  },
  {
    channel: "tiktok", name: "@marca.andina", said: "cuánto cuesta un software a la medida?",
    reply: "Depende del alcance — hacemos CRM, ERP y agentes de IA a la medida. Cuéntame qué proceso quieres automatizar y te doy un rango en la misma conversación.",
    dm: "Te escribo por acá para ayudarte directo. ¿Qué necesitas que el software haga por ti?",
    why: "No hay precio fijo en la FAQ, así que no invento: pido contexto y ofrezco un rango. Honestidad ante todo.",
    source: "PIXI",
  },
  {
    channel: "whatsapp", name: "Andrés M.", said: "¿eres una persona o un bot?",
    reply: "Soy PIXI, la inteligencia de 01pixels — un humano del equipo revisa lo importante. ¿En qué te ayudo?",
    why: "Pregunta de identidad → transparencia absoluta: siempre digo que soy una IA. Confianza: alta.",
    source: "PIXI",
  },
];

export function PixiSocialDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [queue, setQueue] = useState<Draft[]>([]);
  const [minutes, setMinutes] = useState(0);
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);

  function flash(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2600); }

  function simulate() {
    const base = SCRIPT[idx % SCRIPT.length];
    setQueue((q) => [{ ...base, id: Date.now() }, ...q]);
    setIdx((i) => i + 1);
    flash(`${base.name} acaba de escribir — PIXI ya respondió.`);
  }
  function approve(id: number, edited?: boolean) {
    const d = queue.find((x) => x.id === id);
    setQueue((q) => q.filter((x) => x.id !== id));
    setEditing(null);
    setMinutes((m) => m + (d?.channel === "whatsapp" ? 6 : 4));
    flash(edited ? "Enviada con tu edición — PIXI aprende tu estilo." : "Enviada con la marca 01pixels.");
  }
  function reject(id: number) {
    setQueue((q) => q.filter((x) => x.id !== id));
    setEditing(null);
    flash("Rechazada — PIXI toma nota.");
  }

  return (
    <section id="demo" className="relative py-24 bg-[#060608] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(0,229,255,0.06)_0%,transparent_70%)]" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/8 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Pruébalo aquí mismo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">La bandeja de PIXI, en vivo</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Simula un comentario y mira cómo PIXI prepara la respuesta con la voz de 01pixels — tú decides si sale.
          </p>
        </motion.div>

        {/* Panel de bandeja */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-premium rounded-2xl border border-[#00E5FF]/10 overflow-hidden"
        >
          {/* Barra */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0A0A0C]">
            <span className="w-8 h-8 rounded-lg grid place-items-center text-sm font-bold" style={{ background: "rgba(0,229,255,0.12)", color: "#00E5FF" }}>P</span>
            <div className="text-sm">
              <div className="text-white font-semibold leading-none">PIXI · Bandeja de 01pixels</div>
              <div className="text-slate-500 text-xs mt-0.5">Human Oversight — nada se envía sin ti</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[#00FF88] font-bold font-mono tabular-nums leading-none">{minutes} min</div>
              <div className="text-slate-500 text-[10px] uppercase tracking-wide">recuperados</div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-5 space-y-3 min-h-[220px]">
            <AnimatePresence mode="popLayout">
              {queue.length === 0 ? (
                <motion.div
                  key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-10 text-slate-500"
                >
                  <div className="inline-grid grid-cols-4 gap-1.5 mb-4">
                    {["#00E5FF", "#E1306C", "#25D366", "#7C3AED", "#00FF88", "#1877F2", "#00E5FF", "#E1306C"].map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-sm" style={{ background: `${c}${i % 3 ? "40" : ""}` }} />
                    ))}
                  </div>
                  <p className="text-sm">Todo bajo control. Pulsa el botón y llega un comentario.</p>
                </motion.div>
              ) : (
                queue.map((d) => {
                  const ch = CH[d.channel];
                  const isEdit = editing === d.id;
                  return (
                    <motion.div
                      key={d.id} layout
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-xl border border-white/8 bg-[#0D0D0D] p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-full grid place-items-center text-xs font-bold text-white" style={{ background: ch.color }}>
                          {d.name.split(" ").map((w) => w[0]).slice(0, 2).join("").replace("@", "")}
                        </span>
                        <div className="leading-tight">
                          <div className="text-white text-sm font-semibold">{d.name}</div>
                          <div className="text-slate-500 text-xs flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                            {ch.label} · {ch.kind}
                          </div>
                        </div>
                        <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: d.source === "regla" ? "rgba(124,58,237,0.15)" : "rgba(0,229,255,0.12)", color: d.source === "regla" ? "#a78bfa" : "#00E5FF" }}>
                          {d.source === "regla" ? "TU REGLA" : "PIXI"}
                        </span>
                      </div>

                      <div className="rounded-lg bg-[#111] px-3 py-2 text-slate-400 text-sm mb-2">Dijo: «{d.said}»</div>

                      {isEdit ? (
                        <textarea
                          value={editText} onChange={(e) => setEditText(e.target.value)}
                          className="w-full text-sm text-slate-100 bg-[#0A0A0C] border-2 rounded-lg px-3 py-2 mb-2 outline-none"
                          style={{ borderColor: "#00E5FF" }} rows={3}
                        />
                      ) : (
                        <div className="rounded-lg px-3 py-2.5 text-slate-200 text-sm mb-2" style={{ background: "rgba(124,58,237,0.10)", borderLeft: "2px solid #7C3AED" }}>
                          {d.reply}
                        </div>
                      )}
                      {d.dm && !isEdit && (
                        <div className="rounded-lg px-3 py-2 text-slate-300 text-xs mb-2" style={{ background: "rgba(0,229,255,0.06)", borderLeft: "2px dotted #00E5FF" }}>
                          Y sigo en privado: {d.dm}
                        </div>
                      )}

                      <details className="mb-3">
                        <summary className="text-xs text-[#00E5FF] font-semibold cursor-pointer list-none">¿Por qué responde esto?</summary>
                        <p className="text-xs text-slate-500 mt-2 bg-[#0A0A0C] rounded-lg px-3 py-2">{d.why}</p>
                      </details>

                      <div className="flex gap-2">
                        {isEdit ? (
                          <>
                            <button onClick={() => approve(d.id, true)} className="flex-1 py-2 rounded-lg text-sm font-semibold text-[#050505]" style={{ background: "linear-gradient(135deg,#00E5FF,#00FF88)" }}>Enviar editado</button>
                            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-slate-400 border border-white/10">Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => approve(d.id)} className="flex-1 py-2 rounded-lg text-sm font-semibold text-[#050505]" style={{ background: "linear-gradient(135deg,#00E5FF,#00FF88)" }}>Aprobar y enviar</button>
                            <button onClick={() => { setEditing(d.id); setEditText(d.reply); }} className="px-4 py-2 rounded-lg text-sm text-slate-300 border border-white/10 hover:border-white/20">Editar</button>
                            <button onClick={() => reject(d.id)} className="px-4 py-2 rounded-lg text-sm text-slate-500 border border-white/10 hover:border-red-500/40 hover:text-red-400">Rechazar</button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Acción */}
          <div className="px-5 py-4 border-t border-white/5 bg-[#0A0A0C] flex items-center justify-between gap-4">
            <span className="text-slate-500 text-xs">Las respuestas salen con la marca 01pixels.</span>
            <button onClick={simulate} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.03]" style={{ background: "linear-gradient(135deg,#00E5FF,#7C3AED)" }}>
              Simular un comentario →
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white"
            style={{ background: "#111", border: "1px solid rgba(0,229,255,0.2)", boxShadow: "0 12px 40px rgba(0,0,0,.4)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
