"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type ChKey = "facebook" | "instagram" | "whatsapp" | "tiktok";
const CH: Record<string, { label: string; color: string; kind: string }> = {
  facebook: { label: "Facebook", color: "#1877F2", kind: "comentó tu publicación" },
  messenger: { label: "Facebook", color: "#1877F2", kind: "comentó tu publicación" },
  instagram: { label: "Instagram", color: "#E1306C", kind: "comentó tu post" },
  whatsapp: { label: "WhatsApp", color: "#25D366", kind: "te escribió" },
  tiktok: { label: "TikTok", color: "#00E5FF", kind: "comentó tu video" },
};

type Draft = {
  id: string; channel: string; name: string; said: string;
  reply: string; dm?: string; why: string; source: "regla" | "PIXI";
};

// Comentarios de demo que disparan respuestas reales de PIXI (FAQ de 01pixels + reglas).
const INPUTS = [
  { channel: "messenger" as ChKey, name: "Laura Gómez", text: "info por favor, ¿me pasan precios?" },
  { channel: "instagram" as ChKey, name: "marca.andina", text: "¿qué servicios tienen exactamente?" },
  { channel: "tiktok" as ChKey, name: "Carlos Pineda", text: "¿eres una IA o una persona?" },
  { channel: "messenger" as ChKey, name: "Sofía R.", text: "¿cómo los contacto? ¿tienen web?" },
];

// Guion local (fallback si el motor está apagado — la landing nunca se ve rota).
const FALLBACK: Omit<Draft, "id">[] = [
  { channel: "messenger", name: "Laura Gómez", said: "info por favor, ¿me pasan precios?",
    reply: "Con gusto — somos 01pixels: investigación de mercados, publicidad y software. Cuéntame qué buscas lograr y te preparo una propuesta. También puedes ver nuestro trabajo en 01pixels.net.",
    dm: "Hola, vi tu comentario — te escribo por acá para atenderte directo. ¿Qué necesitas lograr?",
    why: "Coincidió tu regla «info/precio». Confianza: alta (respuesta definida por ti).", source: "regla" },
  { channel: "instagram", name: "marca.andina", said: "¿qué servicios tienen exactamente?",
    reply: "Hacemos investigación de mercados, publicidad y software para optimizar tu operación. Cuéntanos qué necesitas y te armamos una propuesta.",
    why: "Respondí con la FAQ de 01pixels (fuente: servicios). Confianza: alta.", source: "PIXI" },
  { channel: "tiktok", name: "Carlos Pineda", said: "¿eres una IA o una persona?",
    reply: "Hola Carlos, sí — soy PIXI, la inteligencia de 01pixels. Un humano del equipo revisa lo importante. ¿En qué te ayudo?",
    why: "Pregunta de identidad → transparencia absoluta: PIXI siempre dice que es una IA.", source: "PIXI" },
  { channel: "messenger", name: "Sofía R.", said: "¿cómo los contacto? ¿tienen web?",
    reply: "Puedes escribirnos aquí mismo o a contacto@01pixels.net — respondemos el mismo día. Todo nuestro trabajo está en 01pixels.net.",
    why: "Respondí con la FAQ de 01pixels (fuente: contacto). Confianza: alta.", source: "PIXI" },
];

const TENANT = "01pixels";
async function api(path: string, opts?: RequestInit) {
  const r = await fetch(`/api/pixi${path}`, opts);
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

export function PixiSocialDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [queue, setQueue] = useState<Draft[]>([]);
  const [minutes, setMinutes] = useState(0);
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [live, setLive] = useState<boolean | null>(null); // null = comprobando

  function flash(m: string) { setToast(m); setTimeout(() => setToast(null), 2600); }

  // ¿Está el motor real disponible?
  useEffect(() => {
    api(`/v1/metrics?tenantId=${TENANT}`).then(() => { setLive(true); loadReal(); }).catch(() => setLive(false));
  }, []);

  async function loadReal() {
    try {
      const [apr, convos, metrics] = await Promise.all([
        api(`/v1/approvals?tenantId=${TENANT}`),
        api(`/v1/conversations?tenantId=${TENANT}`),
        api(`/v1/metrics?tenantId=${TENANT}`),
      ]);
      const byId: Record<string, { userName?: string; messages: { direction: string; text: string }[] }> =
        Object.fromEntries(convos.map((c: { id: string }) => [c.id, c]));
      setMinutes(metrics.recoveredMinutes ?? 0);
      setQueue(apr.map((p: { id: string; channel: string; text: string; dmFollowUp?: string; explanation: string; source: string; conversationId: string }) => {
        const convo = byId[p.conversationId];
        const inbound = convo?.messages?.filter((m) => m.direction === "in").at(-1);
        return {
          id: p.id, channel: p.channel, name: convo?.userName ?? "Cliente",
          said: inbound?.text ?? "", reply: p.text, dm: p.dmFollowUp,
          why: p.explanation, source: p.source === "rule" ? "regla" : "PIXI",
        } as Draft;
      }));
    } catch { setLive(false); }
  }

  function webhookBody(inp: typeof INPUTS[number]) {
    const id = "demo-" + Date.now();
    if (inp.channel === "instagram")
      return { path: "/webhooks/meta", body: { object: "instagram", entry: [{ id: "DEMO-IG-01PX", changes: [{ field: "comments", value: { id, text: inp.text, from: { id: "u" + idx, username: inp.name }, media: { id: "post" } } }] }] } };
    if (inp.channel === "tiktok")
      return { path: "/webhooks/tiktok", body: { event: "comment.create", to_user_id: "DEMO-TT-01PX", content: { comment_id: id, video_id: "v9", text: inp.text, username: inp.name, user_id: "u" + idx } } };
    return { path: "/webhooks/meta", body: { object: "page", entry: [{ id: "DEMO-PAGE-01PX", changes: [{ field: "feed", value: { item: "comment", verb: "add", comment_id: id, post_id: "p1", message: inp.text, from: { id: "u" + idx, name: inp.name }, created_time: 1760000000 } }] }] } };
  }

  async function simulate() {
    const inp = INPUTS[idx % INPUTS.length];
    setIdx((i) => i + 1);
    if (live) {
      const w = webhookBody(inp);
      try {
        await api(w.path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(w.body) });
        await loadReal();
        flash(`${inp.name} escribió — PIXI ya respondió (motor real).`);
        return;
      } catch { setLive(false); }
    }
    const base = FALLBACK[idx % FALLBACK.length];
    setQueue((q) => [{ ...base, id: "loc-" + Date.now() }, ...q]);
    flash(`${base.name} escribió — PIXI ya respondió.`);
  }

  async function approve(id: string, edited?: boolean) {
    const d = queue.find((x) => x.id === id);
    if (live && !id.startsWith("loc-")) {
      try { await api(`/v1/approvals/${id}/approve`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(edited ? { editedText: editText } : {}) }); await loadReal(); }
      catch { setLive(false); }
    } else {
      setQueue((q) => q.filter((x) => x.id !== id));
      setMinutes((m) => m + (d?.channel === "whatsapp" ? 6 : 4));
    }
    setEditing(null);
    flash(edited ? "Enviada con tu edición — PIXI aprende tu estilo." : "Enviada con la marca 01pixels.");
  }
  async function reject(id: string) {
    if (live && !id.startsWith("loc-")) {
      try { await api(`/v1/approvals/${id}/reject`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }); await loadReal(); }
      catch { setLive(false); }
    } else {
      setQueue((q) => q.filter((x) => x.id !== id));
    }
    setEditing(null);
    flash("Rechazada — PIXI toma nota.");
  }

  return (
    <section id="demo" className="relative py-24 bg-[#060608] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(0,229,255,0.06)_0%,transparent_70%)]" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/8 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Pruébalo aquí mismo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">La bandeja de PIXI, en vivo</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Simula un comentario y mira cómo PIXI prepara la respuesta con la voz de 01pixels — tú decides si sale.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }} className="glass-premium rounded-2xl border border-[#00E5FF]/10 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0A0A0C]">
            <span className="w-8 h-8 rounded-lg grid place-items-center text-sm font-bold" style={{ background: "rgba(0,229,255,0.12)", color: "#00E5FF" }}>P</span>
            <div className="text-sm">
              <div className="text-white font-semibold leading-none">PIXI · Bandeja de 01pixels</div>
              <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: live ? "#00FF88" : "#FBBC04" }} />
                {live === null ? "Conectando…" : live ? "Motor real conectado" : "Modo demostración"}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[#00FF88] font-bold font-mono tabular-nums leading-none">{minutes} min</div>
              <div className="text-slate-500 text-[10px] uppercase tracking-wide">recuperados</div>
            </div>
          </div>

          <div className="p-5 space-y-3 min-h-[220px]">
            <AnimatePresence mode="popLayout">
              {queue.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-slate-500">
                  <div className="inline-grid grid-cols-4 gap-1.5 mb-4">
                    {["#00E5FF", "#E1306C", "#25D366", "#7C3AED", "#00FF88", "#1877F2", "#00E5FF", "#E1306C"].map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-sm" style={{ background: `${c}${i % 3 ? "40" : ""}` }} />
                    ))}
                  </div>
                  <p className="text-sm">Todo bajo control. Pulsa el botón y llega un comentario.</p>
                </motion.div>
              ) : (
                queue.map((d) => {
                  const ch = CH[d.channel] ?? CH.facebook;
                  const isEdit = editing === d.id;
                  return (
                    <motion.div key={d.id} layout initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.35 }} className="rounded-xl border border-white/8 bg-[#0D0D0D] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-full grid place-items-center text-xs font-bold text-white" style={{ background: ch.color }}>
                          {d.name.split(" ").map((w) => w[0]).slice(0, 2).join("").replace("@", "")}
                        </span>
                        <div className="leading-tight">
                          <div className="text-white text-sm font-semibold">{d.name}</div>
                          <div className="text-slate-500 text-xs flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: ch.color }} />{ch.label} · {ch.kind}</div>
                        </div>
                        <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: d.source === "regla" ? "rgba(124,58,237,0.15)" : "rgba(0,229,255,0.12)", color: d.source === "regla" ? "#a78bfa" : "#00E5FF" }}>{d.source === "regla" ? "TU REGLA" : "PIXI"}</span>
                      </div>
                      {d.said && <div className="rounded-lg bg-[#111] px-3 py-2 text-slate-400 text-sm mb-2">Dijo: «{d.said}»</div>}
                      {isEdit ? (
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full text-sm text-slate-100 bg-[#0A0A0C] border-2 rounded-lg px-3 py-2 mb-2 outline-none" style={{ borderColor: "#00E5FF" }} rows={3} />
                      ) : (
                        <div className="rounded-lg px-3 py-2.5 text-slate-200 text-sm mb-2" style={{ background: "rgba(124,58,237,0.10)", borderLeft: "2px solid #7C3AED" }}>{d.reply}</div>
                      )}
                      {d.dm && !isEdit && <div className="rounded-lg px-3 py-2 text-slate-300 text-xs mb-2" style={{ background: "rgba(0,229,255,0.06)", borderLeft: "2px dotted #00E5FF" }}>Y sigo en privado: {d.dm}</div>}
                      <details className="mb-3"><summary className="text-xs text-[#00E5FF] font-semibold cursor-pointer list-none">¿Por qué responde esto?</summary><p className="text-xs text-slate-500 mt-2 bg-[#0A0A0C] rounded-lg px-3 py-2">{d.why}</p></details>
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

          <div className="px-5 py-4 border-t border-white/5 bg-[#0A0A0C] flex items-center justify-between gap-4">
            <span className="text-slate-500 text-xs">Las respuestas salen con la marca 01pixels.</span>
            <button onClick={simulate} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.03]" style={{ background: "linear-gradient(135deg,#00E5FF,#7C3AED)" }}>Simular un comentario →</button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white" style={{ background: "#111", border: "1px solid rgba(0,229,255,0.2)", boxShadow: "0 12px 40px rgba(0,0,0,.4)" }}>{toast}</motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
