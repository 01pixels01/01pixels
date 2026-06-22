"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";

export function Hero2026() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: video se mueve más lento que el scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Contenido sube más rápido → profundidad 3D
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  // El overlay oscurece al hacer scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.7]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    ).fromTo(
      subRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.7"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* ── VIDEO BACKGROUND con parallax ── */}
      <motion.div
        className="absolute inset-0 z-0 scale-110"
        style={{ y: videoY }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.3)" }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── CAPAS DE PROFUNDIDAD / COLOR GRADING ── */}

      {/* 1. Tinte oscuro base */}
      <div className="absolute inset-0 z-[1] bg-[#050505]/30" />

      {/* 2. Viñeta perimetral */}
      <div className="absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,5,5,0.85) 100%)" }}
      />

      {/* 3. Glow cyan arriba */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(0,229,255,0.08)_0%,transparent_70%)]" />

      {/* 4. Glow purple abajo-derecha */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(124,58,237,0.07)_0%,transparent_60%)]" />

      {/* 5. Línea de scanlines sutil */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,1) 2px, rgba(0,229,255,1) 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* 6. Overlay que se oscurece en scroll */}
      <motion.div
        className="absolute inset-0 z-[4] bg-[#050505] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* 7. Fade al siguiente section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[5] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

      {/* ── CONTENIDO con parallax inverso ── */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/8 text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          IA · Automatización · Marketing Digital
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 text-4xl sm:text-6xl lg:text-[76px] font-bold text-white leading-[1.06] tracking-tight mb-6"
          style={{ textShadow: "0 0 60px rgba(0,229,255,0.15)" }}
        >
          Transformamos Empresas
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 55%, #00FF88 100%)",
              filter: "drop-shadow(0 0 20px rgba(0,229,255,0.3))",
            }}
          >
            con IA y Automatización
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="opacity-0 text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
        >
          Construimos ecosistemas digitales que generan clientes, automatizan
          procesos y aceleran el crecimiento de tu empresa.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/agendar"
            className="group relative px-8 py-4 rounded-2xl text-[#050505] font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            <span className="relative z-10">Solicitar Diagnóstico Gratuito</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
          </Link>

          <a
            href="#casos"
            className="group px-8 py-4 rounded-2xl text-white font-medium text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            Ver Casos de Éxito
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-10"
        >
          {[
            { n: "150+", label: "Empresas transformadas" },
            { n: "98%", label: "Satisfacción" },
            { n: "3x", label: "ROI en 90 días" },
            { n: "72h", label: "Primer entregable" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-2xl font-bold text-white"
                style={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}
              >
                {s.n}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#00E5FF]/50 to-transparent animate-pulse" />
        <span className="text-[10px] text-slate-600 font-mono tracking-[0.2em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
