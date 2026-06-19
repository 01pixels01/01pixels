import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import { FAQList } from "@/components/sections/FAQList";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | 01pixels",
  description:
    "Resolvemos tus dudas sobre automatización, marketing digital, seguridad electrónica, precios y proceso de trabajo con 01pixels.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <section className="pt-28 pb-12 relative">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Badge variant="blue" className="mb-4">Preguntas Frecuentes</Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Resolvemos tus <span className="text-gradient">dudas</span>
            </h1>
            <p className="text-slate-400">
              ¿No encuentras lo que buscas? Nuestro chatbot IA está disponible ahora mismo.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <FAQList />
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
