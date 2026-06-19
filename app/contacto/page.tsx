import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | 01pixels",
  description:
    "Escríbenos para recibir una propuesta personalizada. Respondemos en menos de 24 horas.",
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508] min-h-screen">
        <section className="pt-28 pb-24 relative">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Info */}
              <div className="pt-4">
                <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
                  Hablemos
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
                  ¿Cómo podemos{" "}
                  <span className="text-gradient">ayudarte?</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Cuéntanos sobre tu empresa y el reto que quieres resolver.
                  Nuestro equipo preparará una propuesta personalizada sin costo.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "contacto@01pixels.net",
                      href: "mailto:contacto@01pixels.net",
                    },
                    {
                      icon: "💬",
                      label: "WhatsApp",
                      value: "+57 317 532 4098",
                      href: "https://wa.me/573175324098",
                    },
                    {
                      icon: "🕐",
                      label: "Tiempo de respuesta",
                      value: "Menos de 24 horas",
                    },
                    {
                      icon: "📍",
                      label: "Ubicación",
                      value: "Colombia · Atención virtual y presencial",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-slate-200 hover:text-blue-400 transition-colors font-medium"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-slate-200 font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
