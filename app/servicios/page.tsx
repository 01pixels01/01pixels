import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios | 01pixels — Automatización, Marketing y Seguridad",
  description:
    "Conoce todos los servicios de 01pixels: Hiperautomatización con IA, Marketing Digital 360° y Seguridad Electrónica inteligente.",
};

const services = [
  {
    icon: "⚡",
    title: "Hiperautomatización & Software",
    description: "CRM, ERP, Agentes IA, automatizaciones de procesos e integraciones que transforman la operación de tu empresa.",
    href: "/hiperautomatizacion",
    items: ["CRM y ERP personalizados", "Agentes de IA", "WhatsApp Business", "Dashboards", "Appian Low-Code", "Integraciones API"],
    badge: "blue" as const,
  },
  {
    icon: "📈",
    title: "Marketing Digital & Publicidad",
    description: "Estrategias 360° que posicionan tu marca, generan leads calificados y convierten visitas en clientes reales.",
    href: "/marketing-digital",
    items: ["SEO técnico", "Google Ads", "Meta Ads", "Diseño web", "Branding", "Email marketing"],
    badge: "purple" as const,
  },
  {
    icon: "🛡️",
    title: "CCTV y Seguridad Inteligente",
    description: "Sistemas de videovigilancia, control de acceso biométrico y alarmas para proteger tus instalaciones 24/7.",
    href: "/seguridad-inteligente",
    items: ["Cámaras IP 4K", "Control de acceso", "Biometría", "Alarmas", "Videoporteros", "Monitoreo 24/7"],
    badge: "green" as const,
  },
];

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <section className="pt-28 pb-12 relative">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Badge variant="blue" className="mb-4">Nuestros Servicios</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Soluciones para cada{" "}
              <span className="text-gradient">desafío empresarial</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Tres áreas de especialización profunda para transformar tu empresa
              con tecnología de vanguardia.
            </p>
          </div>
        </section>

        <section className="py-16 pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-8 border border-white/5 hover:border-blue-500/15 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{s.icon}</span>
                      <Badge variant={s.badge}>{s.title}</Badge>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-5">{s.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.items.map((item) => (
                        <span key={item} className="text-xs px-3 py-1 rounded-full glass border border-white/8 text-slate-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-4 lg:min-w-40">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-[0_0_16px_rgba(37,99,235,0.3)]"
                    >
                      Ver más <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contacto" className="text-sm text-slate-400 hover:text-white transition-colors">
                      Solicitar propuesta →
                    </Link>
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
