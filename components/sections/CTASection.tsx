import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#050508] to-purple-950/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Comienza hoy
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          ¿Listo para transformar{" "}
          <span className="text-gradient">tu empresa?</span>
        </h2>

        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Agenda una consultoría gratuita de 30 minutos. Sin compromiso.
          Nuestro equipo analizará tu caso y te presentará un plan personalizado.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/agendar">
            <Button variant="glow" size="xl" icon={<Calendar className="w-5 h-5" />}>
              Agendar consultoría gratis
            </Button>
          </Link>
          <Link href="/contacto">
            <Button
              variant="outline"
              size="xl"
              iconRight={<ArrowRight className="w-5 h-5" />}
            >
              Enviar propuesta
            </Button>
          </Link>
        </div>

        <p className="text-slate-600 text-sm mt-6">
          ✓ Sin costo · ✓ Sin compromiso · ✓ Respuesta en menos de 24 horas
        </p>
      </div>
    </section>
  );
}
