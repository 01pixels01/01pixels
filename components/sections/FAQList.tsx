"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "General",
    items: [
      { q: "¿Qué hace exactamente 01pixels?", a: "Somos una empresa de transformación digital especializada en tres áreas: Hiperautomatización & Software (CRM, ERP, Agentes IA), Marketing Digital (SEO, Ads, Branding) y Seguridad Electrónica (CCTV, Control de Acceso). Ayudamos a empresas a crecer usando tecnología de vanguardia." },
      { q: "¿Atienden empresas de todos los tamaños?", a: "Sí. Trabajamos con PYMES, empresas medianas y grandes corporaciones. Adaptamos nuestras soluciones al tamaño y presupuesto de cada cliente. Lo importante es tener un reto que resolver." },
      { q: "¿Dónde están ubicados?", a: "Somos una empresa colombiana con atención en todo el país. Ofrecemos servicios de forma presencial y virtual, lo que nos permite atender clientes en cualquier ciudad." },
    ],
  },
  {
    category: "Hiperautomatización",
    items: [
      { q: "¿Cuánto tiempo toma implementar un CRM o ERP?", a: "Depende de la complejidad. Un CRM básico puede estar listo en 4-6 semanas. Un ERP completo puede tomar 3-6 meses. Trabajamos con metodología ágil, entregando funcionalidades útiles desde las primeras semanas." },
      { q: "¿Pueden integrarse con mis sistemas actuales?", a: "Absolutamente. Integramos con prácticamente cualquier sistema: contabilidad, e-commerce, WhatsApp, correo, bancos, sistemas legacy y más de 50 aplicaciones populares." },
      { q: "¿Qué es un Agente IA y cómo puede ayudar a mi empresa?", a: "Un Agente IA es un sistema inteligente que puede leer documentos, responder emails, procesar órdenes, atender clientes por WhatsApp y tomar decisiones automáticas. Básicamente, es un empleado digital que trabaja 24/7 sin errores." },
    ],
  },
  {
    category: "Marketing Digital",
    items: [
      { q: "¿Cuánto tiempo tarda en verse resultados de SEO?", a: "El SEO es una estrategia a mediano-largo plazo. Los primeros resultados de posicionamiento se ven entre 3-6 meses. Las campañas de Google Ads y Meta Ads pueden generar resultados desde el primer día." },
      { q: "¿Manejan el presupuesto de publicidad de mis campañas?", a: "Sí. Gestionamos el presupuesto de tus campañas en Google Ads y Meta Ads. El presupuesto de pauta va directamente a las plataformas; nosotros cobramos por la gestión estratégica y optimización." },
      { q: "¿Qué incluye el servicio de diseño web?", a: "Diseño UX/UI completo, desarrollo responsive, optimización de velocidad, SEO técnico básico, formularios de contacto, integración con WhatsApp y panel de edición de contenido básico." },
    ],
  },
  {
    category: "Seguridad Electrónica",
    items: [
      { q: "¿Qué garantía tienen los equipos instalados?", a: "Todos los equipos tienen garantía del fabricante (generalmente 1-3 años). Adicionalmente ofrecemos garantía de instalación por 12 meses y planes de mantenimiento preventivo." },
      { q: "¿Puedo ver las cámaras desde mi celular?", a: "Sí. Todos nuestros sistemas se configuran para acceso remoto desde celular, tablet o computador. Puedes ver cámaras en vivo y grabaciones desde cualquier lugar del mundo." },
      { q: "¿Hacen mantenimiento preventivo?", a: "Sí. Ofrecemos planes de mantenimiento preventivo trimestral o semestral que incluyen revisión de equipos, limpieza, actualización de firmware y verificación de almacenamiento." },
    ],
  },
  {
    category: "Precios y proceso",
    items: [
      { q: "¿Cuáles son sus precios?", a: "Los precios varían según el proyecto, alcance y tecnologías. Ofrecemos consultoría inicial gratuita para entender tu caso y luego presentamos una propuesta personalizada con precios transparentes." },
      { q: "¿Cómo es el proceso para comenzar?", a: "1) Agenda una consultoría gratuita. 2) Analizamos tu situación y preparamos una propuesta. 3) Aprobación y firma de contrato. 4) Kickoff del proyecto. 5) Implementación ágil con entregas parciales. 6) Soporte post-lanzamiento." },
      { q: "¿Ofrecen soporte después de la entrega?", a: "Sí. Todos nuestros proyectos incluyen soporte post-lanzamiento con planes de soporte mensual, SLA garantizado y actualizaciones continuas." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("glass rounded-xl border transition-all duration-200", open ? "border-blue-500/25" : "border-white/5 hover:border-white/10")}>
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm leading-snug">{q}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200", open && "rotate-180 text-blue-400")} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQList() {
  return (
    <div className="space-y-10">
      {faqs.map((section) => (
        <div key={section.category}>
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 pl-1">
            {section.category}
          </h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
