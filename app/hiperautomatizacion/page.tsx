import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Hiperautomatización e IA Empresarial | 01pixels",
  description:
    "Automatización de procesos, CRM, ERP, Agentes IA y plataforma Appian. Transforma la operación de tu empresa con inteligencia artificial y tecnología Low-Code.",
};

const services = [
  {
    icon: "🤖",
    title: "Agentes de Inteligencia Artificial",
    desc: "Agentes IA que leen, procesan, deciden y actúan de forma autónoma en los procesos de tu empresa.",
  },
  {
    icon: "📊",
    title: "CRM Personalizado",
    desc: "Sistema de gestión de clientes adaptado a tu modelo de negocio, con automatizaciones y reportes en tiempo real.",
  },
  {
    icon: "⚙️",
    title: "ERP & BPM",
    desc: "Integra todos los procesos de tu empresa: finanzas, inventario, RRHH y operaciones en una sola plataforma.",
  },
  {
    icon: "💬",
    title: "WhatsApp Business API",
    desc: "Automatiza la atención al cliente, notificaciones y ventas a través de WhatsApp con flujos inteligentes.",
  },
  {
    icon: "🔗",
    title: "Integraciones API",
    desc: "Conectamos todos tus sistemas: ERP, CRM, e-commerce, bancos, plataformas de pago y más.",
  },
  {
    icon: "📄",
    title: "Automatización Documental",
    desc: "Generación, firma electrónica y gestión automatizada de contratos, facturas y documentos.",
  },
  {
    icon: "📈",
    title: "Dashboards en Tiempo Real",
    desc: "Paneles de control ejecutivos con KPIs, alertas automáticas y visualización de datos estratégicos.",
  },
  {
    icon: "🏗️",
    title: "Plataforma Appian (Low-Code)",
    desc: "Desarrollo rápido de aplicaciones empresariales con la plataforma líder en automatización inteligente.",
  },
];

const processSteps = [
  { n: "01", title: "Diagnóstico", desc: "Mapeamos tus procesos actuales e identificamos cuellos de botella y oportunidades de automatización." },
  { n: "02", title: "Diseño", desc: "Diseñamos la arquitectura de la solución con la tecnología más adecuada para tu caso." },
  { n: "03", title: "Desarrollo", desc: "Implementamos de forma ágil con entregas parciales para validación continua." },
  { n: "04", title: "Integración", desc: "Conectamos con todos tus sistemas existentes sin interrumpir la operación." },
  { n: "05", title: "Capacitación", desc: "Formamos a tu equipo para maximizar el uso de las nuevas herramientas." },
  { n: "06", title: "Soporte 24/7", desc: "Monitoreo continuo, actualizaciones y soporte técnico permanente." },
];

const sectors = ["Logística & Transporte", "Clínicas & Salud", "Construcción", "PYMES", "Retail", "Servicios Financieros", "Educación", "Manufactura"];

export default function HiperautomatizacionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="blue" className="mb-5">
                  ⚡ Hiperautomatización & Software
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                  Automatiza. Integra.{" "}
                  <span className="text-gradient">Escala.</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Implementamos CRM, ERP, Agentes IA y automatizaciones que eliminan
                  tareas manuales, reducen errores y multiplican la capacidad operativa
                  de tu empresa sin contratar más personal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/agendar">
                    <Button variant="glow" size="lg" icon={<Calendar className="w-5 h-5" />}>
                      Agenda una consultoría
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button variant="outline" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                      Solicitar propuesta
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "⚡", label: "80% menos tiempo en tareas manuales" },
                  { icon: "🤖", label: "Agentes IA activos 24/7" },
                  { icon: "🔗", label: "+50 integraciones disponibles" },
                  { icon: "📊", label: "ROI visible en 90 días" },
                ].map((f) => (
                  <div key={f.label} className="glass rounded-xl p-4 border border-blue-500/15 text-center">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <p className="text-slate-300 text-sm font-medium leading-tight">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                ¿Qué automatizamos?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Desde flujos simples hasta arquitecturas empresariales complejas.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s) => (
                <div key={s.title} className="glass rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-[#0a0b0f]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                Nuestro proceso de implementación
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, i) => (
                <div key={step.n} className="relative p-6 rounded-xl glass border border-white/5 hover:border-blue-500/15 transition-all">
                  <div className="text-4xl font-bold text-blue-500/20 font-mono mb-3">
                    {step.n}
                  </div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-blue-500/30 text-lg">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              Sectores que ya transformamos
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {sectors.map((s) => (
                <span key={s} className="px-4 py-2 rounded-full glass border border-blue-500/15 text-slate-300 text-sm hover:border-blue-500/40 hover:text-white transition-all cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-[#0a0b0f]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  ¿Por qué automatizar <span className="text-gradient">ahora?</span>
                </h2>
                <div className="space-y-4">
                  {[
                    "Reduce costos operativos hasta un 60%",
                    "Elimina errores humanos en procesos críticos",
                    "Escala tu operación sin contratar más personal",
                    "Decisiones basadas en datos en tiempo real",
                    "Integración con WhatsApp, correo y sistemas existentes",
                    "ROI medible en los primeros 90 días",
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-8 border border-blue-500/15">
                <h3 className="text-white font-bold text-xl mb-6">
                  Agenda tu consultoría gratuita
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  En 30 minutos analizamos tus procesos y te mostramos exactamente
                  cómo la automatización puede transformar tu empresa.
                </p>
                <Link href="/agendar">
                  <Button variant="glow" size="lg" className="w-full" icon={<Calendar className="w-5 h-5" />}>
                    Agendar ahora — Es gratis
                  </Button>
                </Link>
                <p className="text-center text-slate-600 text-xs mt-4">
                  Sin compromiso · Respuesta en menos de 24 horas
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
