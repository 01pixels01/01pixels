import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { BlueprintHome } from "@/components/experience/blueprint/BlueprintHome";

export const metadata: Metadata = {
  title: "01pixels | Transformación Digital con IA, Automatización y Seguridad",
  description:
    "Transformamos empresas con Inteligencia Artificial, Hiperautomatización, Marketing Digital y Seguridad Inteligente. CRM, ERP, Agentes IA, Google Ads, CCTV.",
};

export default function HomePage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <BlueprintHome />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
