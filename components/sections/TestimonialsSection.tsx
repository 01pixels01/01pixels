"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Gerente de Operaciones",
    company: "LogiTrans S.A.",
    sector: "Logística",
    avatar: "CM",
    rating: 5,
    text: "01pixels transformó completamente nuestro proceso de despacho. El CRM personalizado nos permitió reducir los tiempos de entrega en un 40% y tener visibilidad total de la cadena.",
  },
  {
    name: "Dra. Claudia Restrepo",
    role: "Directora Médica",
    company: "Clínica Salud Total",
    sector: "Salud",
    avatar: "CR",
    rating: 5,
    text: "La automatización de citas y fichas médicas fue un cambio radical. Ahora nuestro equipo dedica tiempo a los pacientes, no a papelería. Increíble trabajo del equipo.",
  },
  {
    name: "Sebastián Torres",
    role: "CEO",
    company: "Construir & Vivir",
    sector: "Construcción",
    avatar: "ST",
    rating: 5,
    text: "El sistema de control de acceso y CCTV que instalaron en nuestras obras es robusto y fácil de monitorear desde el celular. La atención post-venta es excepcional.",
  },
  {
    name: "Ana Lucía Vargas",
    role: "Directora de Marketing",
    company: "BioNatura Foods",
    sector: "Alimentos",
    avatar: "AV",
    rating: 5,
    text: "Pasamos de cero presencia digital a 15.000 seguidores y ventas online en 6 meses. La estrategia de Meta Ads y SEO que diseñaron fue exactamente lo que necesitábamos.",
  },
  {
    name: "Roberto Herrera",
    role: "Administrador",
    company: "Conjunto Res. El Prado",
    sector: "Residencial",
    avatar: "RH",
    rating: 5,
    text: "Las cámaras IP y el control de acceso vehicular mejoraron la percepción de seguridad de todos los residentes. El soporte técnico responde en menos de 2 horas.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">
            Testimonios
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros <span className="text-gradient">clientes</span>
          </h2>
        </div>

        {/* Main testimonial */}
        <div
          className="max-w-3xl mx-auto mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass rounded-2xl p-8 border border-blue-500/15 shadow-[0_0_48px_rgba(59,130,246,0.08)] transition-all duration-500">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-white text-lg leading-relaxed mb-6 relative">
              <span className="absolute -top-2 -left-2 text-5xl text-blue-500/30 font-serif leading-none">
                "
              </span>
              <span className="relative z-10 pl-4">
                {testimonials[current].text}
              </span>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[current].avatar}
              </div>
              <div>
                <div className="text-white font-semibold">
                  {testimonials[current].name}
                </div>
                <div className="text-slate-400 text-sm">
                  {testimonials[current].role} · {testimonials[current].company}
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                  {testimonials[current].sector}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-blue-500"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
