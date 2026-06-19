import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Casos de Éxito | 01pixels",
  description:
    "Conoce cómo 01pixels ha transformado empresas de logística, salud, comercio y más con IA, automatización y marketing digital.",
};

const cases = [
  {
    client: "LogiTrans S.A.",
    sector: "Logística",
    service: "automatizacion",
    serviceLabel: "Hiperautomatización",
    challenge: "Procesos de despacho manuales causaban errores y retrasos en el 30% de las entregas.",
    solution: "CRM personalizado + automatización de rutas + notificaciones WhatsApp en tiempo real.",
    results: [
      { metric: "40%", label: "Reducción en tiempos de entrega" },
      { metric: "95%", label: "Tasa de precisión en despachos" },
      { metric: "60%", label: "Menos llamadas de soporte al cliente" },
    ],
    color: "blue",
  },
  {
    client: "Clínica Salud Total",
    sector: "Salud",
    service: "automatizacion",
    serviceLabel: "Hiperautomatización",
    challenge: "Gestión manual de citas y fichas médicas consumía 4 horas diarias del personal administrativo.",
    solution: "Sistema de agendamiento automático + historias clínicas digitales + recordatorios WhatsApp.",
    results: [
      { metric: "80%", label: "Reducción en no-shows de pacientes" },
      { metric: "4h/día", label: "Ahorradas en administración" },
      { metric: "4.9/5", label: "Satisfacción de pacientes" },
    ],
    color: "purple",
  },
  {
    client: "BioNatura Foods",
    sector: "Alimentos",
    service: "marketing",
    serviceLabel: "Marketing Digital",
    challenge: "Marca desconocida sin presencia digital. Dependencia total de ventas físicas.",
    solution: "Branding completo + SEO + campañas Meta Ads + tienda online + email marketing.",
    results: [
      { metric: "15K", label: "Seguidores en 6 meses" },
      { metric: "280%", label: "Tráfico web orgánico" },
      { metric: "3.5x", label: "ROAS en campañas de ads" },
    ],
    color: "orange",
  },
  {
    client: "Conjunto Res. El Prado",
    sector: "Residencial",
    service: "seguridad",
    serviceLabel: "Seguridad Inteligente",
    challenge: "Sistema de vigilancia obsoleto, sin control de acceso vehicular y múltiples incidentes de seguridad.",
    solution: "32 cámaras IP 4K + control acceso vehicular + biometría en portería + monitoreo remoto.",
    results: [
      { metric: "0", label: "Incidentes de seguridad en 12 meses" },
      { metric: "100%", label: "Satisfacción de residentes" },
      { metric: "24/7", label: "Monitoreo remoto activo" },
    ],
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  blue: "border-blue-500/20 hover:border-blue-500/40",
  purple: "border-purple-500/20 hover:border-purple-500/40",
  orange: "border-orange-500/20 hover:border-orange-500/40",
  green: "border-emerald-500/20 hover:border-emerald-500/40",
};

const metricColorMap: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  orange: "text-orange-400",
  green: "text-emerald-400",
};

export default function CasosDeExitoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <section className="pt-28 pb-12 relative">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Badge variant="blue" className="mb-4">Casos de Éxito</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Resultados reales,{" "}
              <span className="text-gradient">empresas reales</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Cada proyecto que entregamos está respaldado por métricas concretas
              y clientes que crecieron con nosotros.
            </p>
          </div>
        </section>

        <section className="py-12 pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {cases.map((c) => (
              <div
                key={c.client}
                className={`glass rounded-2xl p-8 border transition-all duration-300 ${colorMap[c.color]}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-white text-xl font-bold">{c.client}</h2>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-slate-500">{c.sector}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-blue-400">{c.serviceLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Desafío</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Solución implementada</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Resultados</p>
                  <div className="grid grid-cols-3 gap-4">
                    {c.results.map((r) => (
                      <div key={r.label} className="text-center">
                        <div className={`text-2xl font-bold ${metricColorMap[c.color]}`}>{r.metric}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
