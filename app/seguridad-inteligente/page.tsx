import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight, Shield, Camera, Fingerprint, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "CCTV y Control de Acceso Inteligente | 01pixels",
  description:
    "Cámaras IP, CCTV, biometría, videoporteros, alarmas y control de acceso para empresas, conjuntos residenciales e industrias. Monitoreo 24/7.",
};

const services = [
  { icon: <Camera className="w-6 h-6" />, title: "CCTV & Cámaras IP", desc: "Sistemas de videovigilancia con cámaras 4K, visión nocturna, detección de movimiento y almacenamiento en nube.", color: "text-emerald-400" },
  { icon: <Fingerprint className="w-6 h-6" />, title: "Biometría & Control de Acceso", desc: "Lectores biométricos de huella, facial y tarjeta para controlar el acceso a instalaciones con registro detallado.", color: "text-blue-400" },
  { icon: <Shield className="w-6 h-6" />, title: "Videoporteros IP", desc: "Porteros eléctricos con video HD que permiten verificar visitantes desde el celular en cualquier lugar.", color: "text-purple-400" },
  { icon: <Bell className="w-6 h-6" />, title: "Alarmas & Sensores", desc: "Sistemas de alarma con sensores de movimiento, perimetral y notificaciones instantáneas al celular.", color: "text-orange-400" },
];

const clients = ["Conjuntos residenciales", "Bodegas industriales", "Locales comerciales", "Clínicas y hospitales", "Colegios y universidades", "Empresas corporativas", "Industrias y plantas", "Entidades financieras"];

export default function SeguridadInteligentePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-600/6 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="green" className="mb-5">
                  🛡️ Seguridad Electrónica Inteligente
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                  Protege lo que más{" "}
                  <span className="text-gradient">importa</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Diseñamos, instalamos y mantenemos sistemas de videovigilancia,
                  control de acceso biométrico y alarmas que protegen tus instalaciones
                  con tecnología de punta y monitoreo remoto 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contacto">
                    <Button variant="glow" size="lg" icon={<Shield className="w-5 h-5" />}>
                      Solicitar visita técnica
                    </Button>
                  </Link>
                  <Link href="/agendar">
                    <Button variant="outline" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                      Asesoría gratuita
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "📹", label: "Cámaras 4K con IA" },
                  { icon: "📱", label: "Monitoreo desde el celular" },
                  { icon: "🕐", label: "Soporte técnico 24/7" },
                  { icon: "🔧", label: "Instalación certificada" },
                ].map((f) => (
                  <div key={f.label} className="glass rounded-xl p-4 border border-emerald-500/15 text-center">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <p className="text-slate-300 text-sm font-medium leading-tight">{f.label}</p>
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
                Sistemas que instalamos
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {services.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all">
                  <div className={`${s.color} mb-4`}>{s.icon}</div>
                  <h3 className="text-white font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Additional */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Servicios complementarios:</h3>
              <div className="flex flex-wrap gap-3">
                {["Cableado estructurado", "Redes empresariales", "Fibra óptica", "UPS y respaldo eléctrico", "DVR / NVR", "Control vehicular", "Interfonos", "Mantenimiento preventivo"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-16 bg-[#0a0b0f]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">¿Dónde instalamos?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {clients.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full glass border border-emerald-500/15 text-slate-300 text-sm hover:border-emerald-500/30 transition-all cursor-default">
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-12 glass rounded-2xl p-8 border border-emerald-500/15 max-w-lg mx-auto">
              <h3 className="text-white font-bold text-xl mb-3">
                ¿Necesitas proteger tu espacio?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Agenda una visita técnica gratuita. Nuestro equipo evaluará tu
                instalación y te entregará una propuesta personalizada.
              </p>
              <Link href="/contacto">
                <Button variant="glow" size="lg" className="w-full" icon={<Shield className="w-5 h-5" />}>
                  Solicitar visita técnica gratuita
                </Button>
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
