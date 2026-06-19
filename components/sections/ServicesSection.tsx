"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: "⚡",
    badge: "Automatización & IA",
    title: "Hiperautomatización",
    subtitle: "Transforma tus procesos con IA",
    description:
      "CRM, ERP, BPM, Agentes IA y automatizaciones que eliminan tareas repetitivas y multiplican la productividad de tu equipo.",
    features: [
      "CRM y ERP personalizados",
      "Agentes de Inteligencia Artificial",
      "Integraciones WhatsApp Business",
      "Automatización documental",
      "Plataforma Appian (Low-Code)",
      "Dashboards en tiempo real",
    ],
    href: "/hiperautomatizacion",
    color: "blue",
    gradient: "from-blue-600/20 to-blue-900/5",
    borderColor: "border-blue-500/20 hover:border-blue-500/50",
    badgeVariant: "blue" as const,
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    icon: "📈",
    badge: "Marketing & Growth",
    title: "Marketing Digital",
    subtitle: "Domina tu mercado en línea",
    description:
      "Estrategias 360° de marketing digital que posicionan tu marca, generan leads calificados y convierten visitantes en clientes.",
    features: [
      "SEO técnico y de contenidos",
      "Google Ads y Meta Ads",
      "Branding e identidad corporativa",
      "Diseño web y landing pages",
      "Email marketing automatizado",
      "Producción audiovisual",
    ],
    href: "/marketing-digital",
    color: "purple",
    gradient: "from-purple-600/15 to-purple-900/5",
    borderColor: "border-purple-500/20 hover:border-purple-500/50",
    badgeVariant: "purple" as const,
    glowColor: "rgba(139,92,246,0.10)",
  },
  {
    icon: "🛡️",
    badge: "Seguridad & Control",
    title: "Seguridad Inteligente",
    subtitle: "Protege lo que importa",
    description:
      "Sistemas de CCTV, control de acceso biométrico, alarmas y redes empresariales para mantener seguros tus activos 24/7.",
    features: [
      "Cámaras IP y CCTV 4K",
      "Control de acceso biométrico",
      "Videoporteros IP",
      "Alarmas y sensores",
      "Monitoreo remoto 24/7",
      "Cableado estructurado",
    ],
    href: "/seguridad-inteligente",
    color: "green",
    gradient: "from-emerald-600/15 to-emerald-900/5",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/50",
    badgeVariant: "green" as const,
    glowColor: "rgba(16,185,129,0.10)",
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24 bg-[#050508]">
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Soluciones para cada{" "}
            <span className="text-gradient">desafío empresarial</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tres áreas de especialización, un objetivo: hacer crecer tu empresa con
            tecnología de vanguardia.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative flex flex-col rounded-2xl border bg-[#0a0b0f] p-7 transition-all duration-300 ${service.borderColor}`}
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top, ${service.glowColor}, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-3xl">{service.icon}</div>
                  <Badge variant={service.badgeVariant}>{service.badge}</Badge>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                <p className="text-sm text-blue-400 mb-3">{service.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                  Conocer más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
