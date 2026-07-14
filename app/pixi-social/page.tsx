import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CTASection } from "@/components/sections/CTASection";
import { PixiSocialHero } from "@/components/experience/pixi-social/PixiSocialHero";
import { PixiSocialDemo } from "@/components/experience/pixi-social/PixiSocialDemo";

export const metadata: Metadata = {
  title: "PIXI Social | 01pixels — Tus redes responden solas, tú solo apruebas",
  description:
    "PIXI responde comentarios y mensajes de Facebook, Instagram, WhatsApp y TikTok con la voz de tu marca. Redacta, cita su fuente y espera tu aprobación. Ventas en redes con inteligencia y supervisión humana.",
};

const channels = [
  { name: "Facebook", desc: "Comentarios en tu página y Messenger.", color: "#1877F2" },
  { name: "Instagram", desc: "Comentarios en tus posts y DMs — público y privado.", color: "#E1306C" },
  { name: "WhatsApp", desc: "El canal #1 de ventas, con cada hilo completo.", color: "#25D366" },
  { name: "TikTok", desc: "Comentarios en tus videos y mensajes directos.", color: "#00E5FF" },
];

const pillars = [
  { icon: "🧠", title: "Habla con la voz de tu marca", desc: "PIXI responde con tus precios, horarios y servicios reales — nunca inventa, y cita de dónde salió cada dato.", color: "#00E5FF" },
  { icon: "✋", title: "Nada se envía sin tu visto bueno", desc: "Cada respuesta llega redactada y explicada a tu bandeja. Apruebas, editas o rechazas — y PIXI aprende tu estilo.", color: "#7C3AED" },
  { icon: "💬", title: "Del comentario a la venta", desc: "Responde el comentario en público y continúa la conversación en privado, sin perder el hilo.", color: "#00FF88" },
  { icon: "⏱️", title: "Te devuelve horas cada semana", desc: "Mide el tiempo que PIXI te ahorra. Menos perseguir, más vender.", color: "#FBBC04" },
];

export default function PixiSocialPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <PixiSocialHero />

        {/* Demo interactivo — la bandeja de PIXI en vivo */}
        <PixiSocialDemo />

        {/* Canales */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Cuatro redes, una sola bandeja</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Conecta tus redes una vez. Desde ese momento, cada cliente que escribe encuentra una empresa que responde.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {channels.map((c) => (
                <div key={c.name} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl mb-4" style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    <div className="w-full h-full grid place-items-center">
                      <span className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{c.name}</h3>
                  <p className="text-slate-500 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-20 bg-[#080808]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-[#0D0D0D] hover:border-white/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl grid place-items-center text-xl flex-shrink-0" style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}>{p.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* La promesa */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(124,58,237,0.08)_0%,transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              «Cada mañana, PIXI te entrega una empresa{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#00E5FF,#00FF88)" }}>un poco mejor</span>{" "}
              que la que dejaste ayer.»
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link href="/agendar" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.03]" style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}>
                Quiero PIXI para mi empresa →
              </Link>
              <Link href="https://wa.me/573175324098?text=Hola,%20quiero%20conocer%20PIXI%20Social" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 transition-all">
                Escríbenos por WhatsApp
              </Link>
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
