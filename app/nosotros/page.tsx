import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Nosotros | 01pixels",
  description:
    "Conoce al equipo de 01pixels. Somos expertos en transformación digital, IA y automatización empresarial con más de 5 años de experiencia.",
};

const values = [
  { icon: "🎯", title: "Orientados a resultados", desc: "Cada proyecto se mide por el impacto real en tu negocio, no por entregables." },
  { icon: "🤝", title: "Aliados estratégicos", desc: "No somos un proveedor, somos tu socio tecnológico a largo plazo." },
  { icon: "⚡", title: "Velocidad sin sacrificar calidad", desc: "Metodologías ágiles que entregan valor rápidamente con estándares enterprise." },
  { icon: "🧠", title: "Innovación continua", desc: "Nos mantenemos a la vanguardia tecnológica para que tú siempre estés un paso adelante." },
  { icon: "🔐", title: "Seguridad y confidencialidad", desc: "Tus datos y procesos están protegidos bajo los más altos estándares de seguridad." },
  { icon: "📊", title: "Transparencia total", desc: "Reportes claros, comunicación constante y cero sorpresas en presupuestos." },
];

const technologies = [
  "Next.js", "React", "Python", "Node.js", "PostgreSQL", "Redis",
  "OpenAI", "Appian", "WhatsApp API", "Google Cloud", "Docker", "AWS",
  "TensorFlow", "Prisma", "Vercel", "n8n",
];

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        {/* Hero */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Badge variant="blue" className="mb-5">
              Nuestra historia
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Creamos el futuro digital{" "}
              <span className="text-gradient">de las empresas</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              01pixels nació de la convicción de que la tecnología debe ser accesible,
              práctica y transformadora para cualquier empresa, sin importar su tamaño.
              Somos un equipo multidisciplinario que combina experiencia técnica con
              visión estratégica de negocio.
            </p>

            {/* Mission statement */}
            <div className="glass rounded-2xl p-8 border border-blue-500/15 max-w-2xl mx-auto">
              <p className="text-blue-300 text-sm uppercase tracking-widest font-semibold mb-3">
                Nuestra misión
              </p>
              <p className="text-white text-xl font-medium leading-relaxed">
                "Transformamos empresas mediante Inteligencia Artificial, Automatización
                y Soluciones Digitales que generan resultados medibles y sostenibles."
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#0a0b0f]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                Lo que nos define
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="glass rounded-xl p-6 border border-white/5 hover:border-blue-500/15 transition-all">
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Tecnologías que dominamos
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Elegimos siempre la herramienta correcta para cada proyecto.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full glass border border-white/8 text-slate-300 text-sm font-medium hover:border-blue-500/30 hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
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
