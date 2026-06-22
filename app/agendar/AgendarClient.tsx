"use client";

export function AgendarClient() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.06)_0%,_transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center px-4 pt-16 pb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Sin costo · 30 minutos · Video llamada
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Agenda tu sesión
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            estratégica gratuita
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          30 minutos con nuestro equipo para diagnosticar tu empresa y mostrarte exactamente cómo podemos transformarla.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["✅ Sin compromiso", "✅ Diagnóstico personalizado", "✅ Plan de acción incluido", "✅ Respuesta en 24h"].map((b) => (
            <span key={b} className="text-slate-500 text-sm">{b}</span>
          ))}
        </div>
      </div>

      {/* Cal.com iframe embed */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
          <iframe
            src="https://cal.com/jair-cortes-xnyrok/sesion-estrategica-gratuita?theme=dark&brandColor=%233b82f6"
            width="100%"
            height="700"
            frameBorder="0"
            title="Agendar Sesión Estratégica"
            style={{ background: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
}
