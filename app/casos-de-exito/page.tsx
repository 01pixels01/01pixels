import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Casos de Éxito | 01pixels",
  description:
    "Conoce cómo 01pixels aborda los retos de empresas de logística, salud, comercio y más con IA, automatización y marketing digital.",
};

const cases = [
  {
    client: "LogiTrans S.A.",
    sector: "Logística",
    service: "automatizacion",
    serviceLabel: "Hiperautomatización",
    challenge: "Procesos de despacho manuales causaban errores y retrasos en las entregas.",
    solution: "CRM personalizado + automatización de rutas + notificaciones WhatsApp en tiempo real.",
  },
  {
    client: "Clínica Salud Total",
    sector: "Salud",
    service: "automatizacion",
    serviceLabel: "Hiperautomatización",
    challenge: "Gestión manual de citas y fichas médicas consumía buena parte del tiempo del personal administrativo.",
    solution: "Sistema de agendamiento automático + historias clínicas digitales + recordatorios WhatsApp.",
  },
  {
    client: "BioNatura Foods",
    sector: "Alimentos",
    service: "marketing",
    serviceLabel: "Marketing Digital",
    challenge: "Marca desconocida sin presencia digital. Dependencia total de ventas físicas.",
    solution: "Branding completo + SEO + campañas Meta Ads + tienda online + email marketing.",
  },
  {
    client: "Conjunto Res. El Prado",
    sector: "Residencial",
    service: "seguridad",
    serviceLabel: "Seguridad Inteligente",
    challenge: "Sistema de vigilancia obsoleto, sin control de acceso vehicular y múltiples incidentes de seguridad.",
    solution: "Cámaras IP 4K + control acceso vehicular + biometría en portería + monitoreo remoto.",
  },
];

const colorMap: Record<string, string> = {
  automatizacion: "border-blue-500/20 hover:border-blue-500/40",
  marketing: "border-orange-500/20 hover:border-orange-500/40",
  seguridad: "border-emerald-500/20 hover:border-emerald-500/40",
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
              Del reto{" "}
              <span className="text-gradient">a la solución</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Qué necesitaba cada empresa y qué construimos para resolverlo,
              paso a paso y a la medida.
            </p>
          </div>
        </section>

        <section className="py-12 pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {cases.map((c) => (
              <div
                key={c.client}
                className={`glass rounded-2xl p-8 border transition-all duration-300 ${colorMap[c.service]}`}
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Desafío</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Solución implementada</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{c.solution}</p>
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
