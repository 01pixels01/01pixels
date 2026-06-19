import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AgendarClient } from "./AgendarClient";

export const metadata: Metadata = {
  title: "Agendar Sesión Estratégica Gratuita",
  description:
    "Agenda una sesión estratégica gratuita de 30 minutos con el equipo de 01pixels. Descubre cómo transformar tu empresa con IA, automatización y marketing digital.",
};

export default function AgendarPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#020305] pt-20">
        <AgendarClient />
      </main>
      <Footer />
    </>
  );
}
