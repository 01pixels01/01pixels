import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | 01pixels — IA, Automatización y Marketing Digital",
  description:
    "Artículos sobre Inteligencia Artificial, Automatización de procesos, Marketing Digital y Seguridad Electrónica para empresas.",
};

const posts = [
  {
    slug: "que-es-la-hiperautomatizacion",
    title: "¿Qué es la Hiperautomatización y por qué tu empresa la necesita en 2025?",
    excerpt: "La hiperautomatización combina RPA, IA y BPM para automatizar procesos complejos de extremo a extremo. Descubre cómo puede transformar tu empresa.",
    category: "IA & Automatización",
    categoryVariant: "blue" as const,
    date: "15 de enero, 2025",
    readTime: "5 min",
  },
  {
    slug: "agentes-ia-para-empresas",
    title: "Agentes IA: El empleado digital que trabaja 24/7 sin errores",
    excerpt: "Los agentes de IA pueden atender clientes, procesar documentos y tomar decisiones autónomas. Casos de uso reales en empresas colombianas.",
    category: "IA & Automatización",
    categoryVariant: "blue" as const,
    date: "8 de enero, 2025",
    readTime: "7 min",
  },
  {
    slug: "seo-para-empresas-colombia-2025",
    title: "SEO para empresas en Colombia: Guía completa 2025",
    excerpt: "Estrategias de SEO local y técnico que funcionan para el mercado colombiano. Cómo aparecer en Google cuando tus clientes te buscan.",
    category: "Marketing Digital",
    categoryVariant: "purple" as const,
    date: "2 de enero, 2025",
    readTime: "10 min",
  },
  {
    slug: "cctv-ip-vs-analogico",
    title: "Cámaras IP vs Analógicas: ¿Cuál elegir para tu empresa?",
    excerpt: "Comparativa completa de sistemas de videovigilancia. Ventajas, costos y qué sistema se adapta mejor a cada tipo de instalación.",
    category: "Seguridad Electrónica",
    categoryVariant: "green" as const,
    date: "20 de diciembre, 2024",
    readTime: "6 min",
  },
  {
    slug: "crm-personalizado-vs-salesforce",
    title: "CRM personalizado vs Salesforce: ¿Cuándo vale la pena desarrollar el tuyo?",
    excerpt: "Análisis de costos y beneficios para decidir entre un CRM genérico y uno desarrollado a medida para tu proceso comercial específico.",
    category: "IA & Automatización",
    categoryVariant: "blue" as const,
    date: "10 de diciembre, 2024",
    readTime: "8 min",
  },
  {
    slug: "meta-ads-pymes-colombia",
    title: "Guía de Meta Ads para PYMES colombianas: Maximiza tu presupuesto publicitario",
    excerpt: "Cómo hacer campañas efectivas en Facebook e Instagram con presupuesto limitado. Estrategias, segmentación y métricas clave.",
    category: "Marketing Digital",
    categoryVariant: "purple" as const,
    date: "1 de diciembre, 2024",
    readTime: "9 min",
  },
];

const categories = ["Todos", "IA & Automatización", "Marketing Digital", "Seguridad Electrónica"];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <section className="pt-28 pb-12 relative">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Badge variant="blue" className="mb-4">Blog</Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Conocimiento para la{" "}
              <span className="text-gradient">transformación digital</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Artículos, guías y casos de estudio sobre IA, automatización, marketing
              digital y seguridad electrónica.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    cat === "Todos"
                      ? "bg-blue-600 text-white"
                      : "glass border border-white/8 text-slate-400 hover:border-blue-500/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={post.categoryVariant}>{post.category}</Badge>
                    <span className="text-xs text-slate-600">{post.readTime}</span>
                  </div>
                  <h2 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-slate-500">{post.date}</span>
                    <span className="text-xs text-blue-400 group-hover:text-blue-300 font-medium">
                      Leer más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
