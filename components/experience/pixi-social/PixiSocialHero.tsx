"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function PixiSocialHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-animated" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(0,229,255,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/8 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          PIXI Social · Ventas en redes con IA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Tus redes responden{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#00E5FF,#7C3AED)" }}>solas</span>.
          <br />
          Tú solo{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#7C3AED,#00FF88)" }}>apruebas</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 text-lg text-slate-400 max-w-2xl mx-auto"
        >
          <span className="text-white font-semibold">PIXI</span>, la inteligencia de 01pixels, redacta cada respuesta
          con la voz de tu marca — explicada, con su fuente, esperando tu visto bueno. Nada sale sin ti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3 justify-center"
        >
          <a href="#demo" className="px-7 py-3.5 rounded-xl text-sm font-semibold text-[#050505] transition-all hover:scale-[1.03]" style={{ background: "linear-gradient(135deg,#00E5FF,#7C3AED)" }}>
            Probar la demo en vivo →
          </a>
          <Link href="/agendar" className="px-7 py-3.5 rounded-xl text-sm font-semibold text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-all">
            Quiero PIXI en mis redes
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 font-mono text-xs tracking-widest uppercase text-slate-500"
        >
          Facebook <span className="text-[#00E5FF]">·</span> Instagram <span className="text-[#7C3AED]">·</span> WhatsApp <span className="text-[#00FF88]">·</span> TikTok
        </motion.div>
      </div>
    </section>
  );
}
