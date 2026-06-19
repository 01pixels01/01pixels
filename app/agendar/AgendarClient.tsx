"use client";

import { useEffect } from "react";

export function AgendarClient() {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-expect-error Cal is loaded globally
      const Cal = window.Cal;
      if (Cal) {
        Cal("init", "sesion-estrategica-gratuita", {
          origin: "https://cal.com",
        });
        Cal.ns["sesion-estrategica-gratuita"]("inline", {
          elementOrSelector: "#cal-embed",
          calLink: "jair-cortes-xnyrok/sesion-estrategica-gratuita",
          layout: "month_view",
        });
        Cal.ns["sesion-estrategica-gratuita"]("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#3b82f6" } },
          hideEventTypeDetails: false,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative">
      {/* Background */}
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

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            "✅ Sin compromiso",
            "✅ Diagnóstico personalizado",
            "✅ Plan de acción incluido",
            "✅ Respuesta en 24h",
          ].map((b) => (
            <span key={b} className="text-slate-500 text-sm">{b}</span>
          ))}
        </div>
      </div>

      {/* Cal.com embed */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div
          className="rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_60px_rgba(59,130,246,0.08)]"
          style={{ minHeight: 600 }}
        >
          <div
            id="cal-embed"
            style={{ width: "100%", height: "100%", minHeight: 600 }}
          />
        </div>
      </div>
    </div>
  );
}
