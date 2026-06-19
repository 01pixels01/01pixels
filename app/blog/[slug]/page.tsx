import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

// Static blog content — replace with CMS (Sanity/Contentlayer) in Phase 2
const blogPosts: Record<string, { title: string; category: string; date: string; readTime: string; content: string }> = {
  "que-es-la-hiperautomatizacion": {
    title: "¿Qué es la Hiperautomatización y por qué tu empresa la necesita en 2025?",
    category: "IA & Automatización",
    date: "15 de enero, 2025",
    readTime: "5 min",
    content: `La hiperautomatización es la aplicación coordinada de múltiples tecnologías para automatizar procesos empresariales de extremo a extremo...

## ¿Qué incluye la Hiperautomatización?

La hiperautomatización combina:
- **RPA (Robotic Process Automation)**: bots que ejecutan tareas repetitivas
- **IA y Machine Learning**: para tomar decisiones inteligentes
- **BPM (Business Process Management)**: para orquestar procesos complejos
- **API Integrations**: para conectar sistemas distintos

## Beneficios reales para tu empresa

1. **Reducción de costos operativos** hasta un 60%
2. **Eliminación de errores humanos** en procesos críticos
3. **Escalabilidad** sin contratar más personal
4. **Visibilidad total** de tus operaciones en tiempo real

## ¿Por cuál proceso empezar?

El primer paso es identificar los procesos más repetitivos y con mayor volumen. En 01pixels hacemos este diagnóstico de forma gratuita.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Artículo no encontrado | 01pixels" };
  return {
    title: `${post.title} | 01pixels Blog`,
    description: post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="bg-[#050508] min-h-screen pt-28 pb-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Artículo no encontrado</h1>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300">
              ← Volver al blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#050508] min-h-screen">
        <article className="pt-28 pb-24 relative">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="blue">{post.category}</Badge>
              <span className="text-slate-500 text-sm">{post.date}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500 text-sm">{post.readTime} de lectura</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="glass rounded-2xl p-8 border border-white/5 prose prose-invert prose-slate max-w-none">
              {post.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return <h2 key={i} className="text-white text-xl font-bold mt-6 mb-3">{block.replace("## ", "")}</h2>;
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {block.split("\n").map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-blue-500 mt-1">•</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-slate-300 text-sm leading-relaxed mb-4">{block}</p>;
              })}
            </div>

            <div className="mt-8 glass rounded-2xl p-6 border border-blue-500/15 text-center">
              <p className="text-white font-semibold mb-2">¿Quieres implementar esto en tu empresa?</p>
              <p className="text-slate-400 text-sm mb-4">Agenda una consultoría gratuita con nuestro equipo.</p>
              <Link href="/agendar" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors text-sm">
                Agendar consultoría gratuita
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
