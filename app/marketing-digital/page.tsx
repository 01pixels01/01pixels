import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight, TrendingUp, Search, Target, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing Digital y Publicidad | 01pixels",
  description:
    "SEO, Google Ads, Meta Ads, Branding y diseño web que posicionan tu marca y convierten visitas en clientes. Estrategias 360° de marketing digital para empresas.",
};

const services = [
  { icon: <Search className="w-6 h-6" />, title: "SEO Técnico", desc: "Posiciona tu empresa en los primeros resultados de Google con estrategias de SEO orgánico que generan tráfico sostenible.", color: "text-blue-400" },
  { icon: <Target className="w-6 h-6" />, title: "Google Ads", desc: "Campañas de búsqueda y display optimizadas con IA para maximizar el retorno de inversión en publicidad pagada.", color: "text-orange-400" },
  { icon: <Globe className="w-6 h-6" />, title: "Meta Ads", desc: "Publicidad estratégica en Facebook e Instagram con segmentación precisa para llegar a tu cliente ideal.", color: "text-purple-400" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Diseño Web", desc: "Sitios web y landing pages de alto rendimiento que convierten visitantes en leads calificados.", color: "text-emerald-400" },
];

const metrics = [
  { value: "3.5x", label: "ROAS promedio en campañas de ads" },
  { value: "+280%", label: "Tráfico orgánico en 6 meses (SEO)" },
  { value: "40%", label: "Reducción en costo por lead" },
  { value: "15 días", label: "Tiempo promedio para ver primeros resultados" },
];

export default function MarketingDigitalPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="purple" className="mb-5">
                  📈 Marketing Digital & Growth
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                  Domina tu mercado{" "}
                  <span className="text-gradient">en línea</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Estrategias 360° de marketing digital que posicionan tu marca en Google,
                  generan leads calificados y convierten visitantes en clientes reales con
                  campañas de alto rendimiento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/agendar">
                    <Button variant="glow" size="lg">
                      Solicitar estrategia gratuita
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button variant="outline" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                      Ver casos de éxito
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((m) => (
                  <div key={m.label} className="glass rounded-xl p-5 border border-purple-500/15 text-center hover:border-purple-500/30 transition-colors">
                    <div className="text-2xl font-bold text-gradient mb-1">{m.value}</div>
                    <p className="text-slate-400 text-xs leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                Nuestros servicios de marketing
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all group">
                  <div className={`${s.color} mb-4`}>{s.icon}</div>
                  <h3 className="text-white font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Additional services */}
            <div className="mt-8 glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-semibold mb-4">También incluye:</h3>
              <div className="flex flex-wrap gap-3">
                {["Branding & Identidad", "Redes Sociales", "Email Marketing", "Producción Audiovisual", "Landing Pages", "Automatización de Marketing", "Análisis y Reportes", "Copywriting"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="py-16 bg-[#0a0b0f]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">¿Para quién es?</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: "🏪", title: "Negocios locales", desc: "Restaurantes, clínicas, talleres, salones que quieren más clientes en su ciudad." },
                { icon: "🏢", title: "Empresas B2B", desc: "Empresas que venden a otras empresas y quieren generar leads calificados online." },
                { icon: "👤", title: "Profesionales", desc: "Abogados, contadores, consultores que quieren posicionar su marca personal." },
              ].map((c) => (
                <div key={c.title} className="glass rounded-xl p-6 border border-white/5">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{c.title}</h3>
                  <p className="text-slate-400 text-sm">{c.desc}</p>
                </div>
              ))}
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
