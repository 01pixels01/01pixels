import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PIXICursor } from "@/components/experience/PIXICursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "01pixels | Transformación Digital con IA y Automatización",
    template: "%s | 01pixels",
  },
  description:
    "Transformamos empresas mediante Inteligencia Artificial, Automatización y Soluciones Digitales. CRM, ERP, Marketing Digital, CCTV y Control de Acceso.",
  keywords: [
    "hiperautomatización",
    "automatización de procesos",
    "inteligencia artificial empresarial",
    "marketing digital",
    "CCTV empresarial",
    "control de acceso",
    "CRM personalizado",
    "agentes IA",
    "desarrollo software",
    "transformación digital",
  ],
  authors: [{ name: "01pixels" }],
  creator: "01pixels",
  metadataBase: new URL("https://01pixels.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://01pixels.com",
    siteName: "01pixels",
    title: "01pixels | Transformación Digital con IA y Automatización",
    description:
      "Transformamos empresas mediante Inteligencia Artificial, Automatización y Soluciones Digitales.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "01pixels - Transformación Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "01pixels | Transformación Digital con IA",
    description:
      "Transformamos empresas mediante IA, Automatización y Soluciones Digitales.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/Logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050508] text-[#F8FAFF]">
        <PIXICursor />
        {children}
      </body>
    </html>
  );
}
