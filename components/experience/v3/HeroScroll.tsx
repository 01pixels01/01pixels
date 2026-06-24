"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PIXIHead } from "@/components/experience/PIXIHead";

// ─── Data ────────────────────────────────────────────────────────────────────

const CHOICES = [
  { icon: "⚡", label: "Automatizar procesos",    href: "/hiperautomatizacion",   color: "#00E5FF", id: "ia"  },
  { icon: "📈", label: "Conseguir más clientes",  href: "/marketing-digital",     color: "#FF6B9D", id: "mkt" },
  { icon: "🛡️", label: "Mejorar seguridad",       href: "/seguridad-inteligente", color: "#7C3AED", id: "seg" },
];

const ORACLES = [
  { name: "Oráculo IA",         img: "/oraculo-ia.png",         color: "#00E5FF", label: "Hiperautomatización"  },
  { name: "Oráculo Marketing",  img: "/oraculo-marketing.png",  color: "#FF6B9D", label: "Marketing Digital"    },
  { name: "Oráculo Seguridad",  img: "/oraculo-seguridad.png",  color: "#7C3AED", label: "Seguridad Inteligente"},
];

const SATS = [
  { label: "IA",   color: "#00E5FF", angle: 0   },
  { label: "CRM",  color: "#7C3AED", angle: 51  },
  { label: "ERP",  color: "#00FF88", angle: 103 },
  { label: "SEO",  color: "#FF6B9D", angle: 154 },
  { label: "ADS",  color: "#FBBC04", angle: 206 },
  { label: "CCTV", color: "#00E5FF", angle: 257 },
  { label: "BIO",  color: "#7C3AED", angle: 309 },
];

// CSS keyframes para satélites (generado una sola vez fuera del componente)
const ORBIT_KEYFRAMES = SATS.map(({ angle }, i) =>
  `@keyframes hs-orbit-${i} {
    from { transform: translate(-50%,-50%) rotate(${angle}deg) translateX(110px) rotate(-${angle}deg); }
    to   { transform: translate(-50%,-50%) rotate(${angle + 360}deg) translateX(110px) rotate(-${angle + 360}deg); }
  }`
).join("\n");

const FLOAT_KEYFRAMES = `
  @keyframes hs-float-0 { 0%,100% { transform: translateY(0px); }  50% { transform: translateY(-10px); } }
  @keyframes hs-float-1 { 0%,100% { transform: translateY(-5px); } 50% { transform: translateY(8px); }  }
  @keyframes hs-float-2 { 0%,100% { transform: translateY(0px); }  50% { transform: translateY(-12px); } }
`;

// ─── Particle Canvas ──────────────────────────────────────────────────────────

function ParticleCanvas({ connectedness }: { connectedness: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connRef   = useRef(connectedness);
  connRef.current = connectedness;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const pts = Array.from({ length: 65 }, () => ({
      x:     Math.random() * W(),
      y:     Math.random() * H(),
      vx:    (Math.random() - 0.5) * 0.22,
      vy:    (Math.random() - 0.5) * 0.22,
      r:     0.7 + Math.random() * 1.1,
      color: Math.random() > 0.5 ? "#00E5FF" : "#7C3AED",
    }));

    const tick = () => {
      const c = connRef.current;
      ctx.clearRect(0, 0, W(), H());

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W();
        if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H();
        if (p.y > H()) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25 + c * 0.35;
        ctx.fill();
      }

      // Red neuronal — aparece cuando connectedness > 0
      if (c > 0.02) {
        const maxDist = 75 + c * 65;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < maxDist) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = "#00E5FF";
              ctx.globalAlpha = c * 0.10 * (1 - d / maxDist);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Scene wrapper — opacidad controlada por scroll ──────────────────────────

function Scene({
  active,
  children,
  className = "",
}: {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 ${className}`}
      style={{
        opacity:        active ? 1 : 0,
        pointerEvents:  active ? "auto" : "none",
        transition:     "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Scene dot indicator ─────────────────────────────────────────────────────

function SceneDots({ scene }: { scene: number }) {
  return (
    <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 pointer-events-none">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1.5 rounded-full transition-all duration-500"
          style={{
            height:     scene === i ? 22 : 5,
            background: scene === i ? "#00E5FF" : "rgba(255,255,255,0.12)",
            boxShadow:  scene === i ? "0 0 8px #00E5FF" : "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeroScroll() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const prefersReduced    = useReducedMotion();
  const [scene,  setScene]  = useState(0);  // 0-5
  const [sceneP, setSceneP] = useState(0);  // 0-1 dentro de la escena actual
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Porcentajes de inicio de cada escena (en scrollYProgress 0-1)
  // Escena 3 (PIXI assembly) recibe más espacio
  const BREAKS = [0, 0.15, 0.30, 0.50, 0.67, 0.83, 1.0];

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!scrolled) setScrolled(true);

    // Detectar escena actual y progreso dentro de ella
    let idx = 0;
    for (let i = 0; i < 6; i++) {
      if (p < BREAKS[i + 1]) { idx = i; break; }
      idx = 5;
    }
    const sp = Math.min(1, Math.max(0,
      (p - BREAKS[idx]) / (BREAKS[idx + 1] - BREAKS[idx])
    ));
    setScene(idx);
    setSceneP(sp);
  });

  // Connectedness: 0 en escena 1, crece en escena 2, desaparece en escena 3
  const connectedness =
    scene === 0 ? 0 :
    scene === 1 ? sceneP :
    scene === 2 ? Math.max(0, 1 - sceneP * 1.5) :
    0;

  return (
    <div ref={containerRef} className="relative min-h-[700svh]">
      {/* Inject CSS keyframes for orbits and floats */}
      <style>{ORBIT_KEYFRAMES + FLOAT_KEYFRAMES}</style>

      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#050505]">

        {/* Particle canvas — escenas 1 y 2 */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: scene <= 2 ? 1 : 0 }}
        >
          <ParticleCanvas connectedness={connectedness} />
        </div>

        {/* Radial ambient glow — cambia de color según escena */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none transition-all duration-1000"
          style={{
            background:
              scene <= 2 ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)" :
              scene === 3 ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.04) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)" :
              scene === 4 ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)" :
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.04) 0%, rgba(0,229,255,0.03) 60%, transparent 70%)",
          }}
        />

        {/* ── ESCENA 01: Pulso digital ─────────────────────────────────── */}
        <Scene active={scene === 0}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-[11px] font-mono text-[#00E5FF]/40 tracking-[0.35em] uppercase mb-6"
          >
            01pixels · transformación digital
          </motion.p>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-3xl"
            style={{
              opacity:    sceneP > 0.08 ? 1 : 0,
              transform:  `translateY(${sceneP > 0.08 ? 0 : 24}px)`,
              filter:     `blur(${sceneP > 0.08 ? 0 : 12}px)`,
              transition: "opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease",
            }}
          >
            Cada empresa
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)" }}
            >
              genera datos.
            </span>
          </h1>

          {/* Scroll hint */}
          <div
            className="flex flex-col items-center gap-2 mt-12 transition-opacity duration-700"
            style={{ opacity: !scrolled ? 1 : 0 }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#00E5FF]/35 to-transparent animate-pulse" />
            <span className="text-[10px] text-slate-600 font-mono tracking-[0.3em] uppercase">scroll</span>
          </div>
        </Scene>

        {/* ── ESCENA 02: Red neuronal ──────────────────────────────────── */}
        <Scene active={scene === 1}>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl"
            style={{
              opacity:    scene === 1 ? 1 : 0,
              transform:  `translateY(${scene === 1 ? 0 : 32}px)`,
              filter:     `blur(${scene === 1 ? 0 : 14}px)`,
              transition: "opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease",
            }}
          >
            Muy pocas las
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)" }}
            >
              convierten en inteligencia.
            </span>
          </h2>

          <p
            className="mt-6 text-slate-500 text-base sm:text-lg max-w-xl"
            style={{
              opacity:    sceneP > 0.4 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Los datos sin análisis son ruido. Con IA, son decisiones.
          </p>

          {/* Network node visual — aparece al final de la escena */}
          <div
            className="flex gap-4 mt-10 items-center"
            style={{
              opacity:    sceneP > 0.65 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            {["Datos", "→", "IA", "→", "Acción"].map((label, i) => (
              <div key={i} className="flex items-center gap-4">
                {label === "→" ? (
                  <div className="w-6 h-px bg-[#00E5FF]/30" />
                ) : (
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{
                      border: "1px solid rgba(0,229,255,0.2)",
                      background: "rgba(0,229,255,0.04)",
                      color: "#00E5FF",
                    }}
                  >
                    {label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Scene>

        {/* ── ESCENA 03: PIXI se ensambla ──────────────────────────────── */}
        <Scene active={scene === 2}>
          {/* PIXI — escala y glow según progreso */}
          <div
            style={{
              opacity:    sceneP > 0.05 ? 1 : 0,
              transform:  `scale(${0.5 + sceneP * 0.5}) translateY(${sceneP > 0.05 ? 0 : 30}px)`,
              filter:     `drop-shadow(0 0 ${sceneP * 36}px rgba(0,229,255,0.45))`,
              transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.34,1.56,0.64,1), filter 0.7s ease",
              marginBottom: 28,
            }}
          >
            <PIXIHead size={150} trackMouse />
          </div>

          {/* "Hola. Soy PIXI." */}
          <div
            className="text-lg sm:text-2xl font-mono font-semibold"
            style={{
              color:      "#00E5FF",
              opacity:    sceneP > 0.35 ? 1 : 0,
              transform:  `translateY(${sceneP > 0.35 ? 0 : 16}px)`,
              transition: "opacity 0.7s ease, transform 0.7s ease",
              textShadow: "0 0 24px rgba(0,229,255,0.4)",
              marginBottom: 10,
            }}
          >
            Hola. Soy PIXI.
          </div>

          {/* Descripción */}
          <p
            className="text-slate-400 text-sm sm:text-base max-w-sm leading-relaxed"
            style={{
              opacity:    sceneP > 0.62 ? 1 : 0,
              transform:  `translateY(${sceneP > 0.62 ? 0 : 12}px)`,
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            El sistema de inteligencia artificial de 01pixels.
            <br />
            Aquí para transformar tu empresa.
          </p>

          {/* Stats rápidos */}
          <div
            className="flex gap-6 mt-8"
            style={{
              opacity:    sceneP > 0.82 ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            {[["150+", "empresas"], ["3x", "ROI / 90 días"], ["24/7", "operación"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold text-white">{val}</div>
                <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </Scene>

        {/* ── ESCENA 04: Tres Oráculos ─────────────────────────────────── */}
        <Scene active={scene === 3}>
          <p
            className="text-[11px] font-mono text-white/25 tracking-[0.3em] uppercase mb-10"
            style={{
              opacity:    scene === 3 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Las tres inteligencias
          </p>

          <div className="flex flex-col sm:flex-row items-end justify-center gap-8 sm:gap-12">
            {ORACLES.map((o, i) => (
              <div
                key={o.name}
                className="flex flex-col items-center gap-3"
                style={{
                  opacity:    sceneP > i * 0.18 ? 1 : 0,
                  transform:  `translateY(${sceneP > i * 0.18 ? 0 : 50}px)`,
                  transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(0.34,1.56,0.64,1)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Oracle card */}
                <div
                  className="relative"
                  style={{
                    animation: scene === 3 ? `hs-float-${i} ${3.2 + i * 0.5}s ease-in-out infinite` : "none",
                  }}
                >
                  {/* Halo */}
                  <div
                    className="absolute -inset-4 rounded-full blur-2xl opacity-25"
                    style={{ background: o.color }}
                  />
                  <div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden"
                    style={{
                      border:    `1px solid ${o.color}35`,
                      boxShadow: `0 0 24px ${o.color}15`,
                    }}
                  >
                    <Image src={o.img} alt={o.name} fill className="object-cover" />
                  </div>
                </div>

                <div className="text-center mt-1">
                  <div className="text-white text-sm font-semibold">{o.name}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5 font-mono">{o.label}</div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-slate-600 text-sm mt-12 max-w-md"
            style={{
              opacity:    sceneP > 0.75 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Cada oráculo domina su dominio. Juntos, transforman tu empresa completa.
          </p>
        </Scene>

        {/* ── ESCENA 05: Ecosistema orbital ────────────────────────────── */}
        <Scene active={scene === 4}>
          <p
            className="text-[11px] font-mono text-white/25 tracking-[0.3em] uppercase mb-10"
            style={{ opacity: scene === 4 ? 1 : 0, transition: "opacity 0.8s ease" }}
          >
            Ecosistema 01pixels
          </p>

          {/* Sistema orbital */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 270, height: 270 }}
          >
            {/* Anillos de órbita */}
            {[270, 175, 90].map((size, ri) => (
              <div
                key={ri}
                className="absolute rounded-full border border-white/[0.04]"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Núcleo central */}
            <div
              className="absolute flex flex-col items-center justify-center z-10"
              style={{
                width: 68, height: 68,
                borderRadius: 16,
                background: "linear-gradient(135deg, #0a0a0a, #141414)",
                border: "1px solid rgba(0,229,255,0.18)",
                boxShadow: "0 0 28px rgba(0,229,255,0.12), inset 0 1px 0 rgba(0,229,255,0.06)",
                opacity:    sceneP > 0.05 ? 1 : 0,
                transform:  `scale(${sceneP > 0.05 ? 1 : 0.5})`,
                transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span className="text-[9px] font-bold text-[#00E5FF]/80 font-mono tracking-wider leading-tight text-center">
                01<br />pixels
              </span>
            </div>

            {/* Satélites orbitando */}
            {SATS.map((sat, i) => (
              <div
                key={sat.label}
                className="absolute flex items-center justify-center"
                style={{
                  width: 34, height: 34,
                  left: "50%", top: "50%",
                  borderRadius: 9,
                  background: `${sat.color}0d`,
                  border: `1px solid ${sat.color}25`,
                  opacity:    sceneP > i * 0.09 ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 60}ms`,
                  animation:  scene === 4 ? `hs-orbit-${i} ${9 + i * 0.7}s linear infinite` : "none",
                  willChange: "transform",
                }}
              >
                <span className="text-[8px] font-bold font-mono" style={{ color: sat.color }}>
                  {sat.label}
                </span>
              </div>
            ))}
          </div>

          <p
            className="text-slate-600 text-sm mt-10 max-w-xs"
            style={{
              opacity: sceneP > 0.75 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            Todo conectado. Todo inteligente. Todo operando solo.
          </p>
        </Scene>

        {/* ── ESCENA 06: Command Center ─────────────────────────────────── */}
        <Scene active={scene === 5}>
          {/* PIXI */}
          <div
            style={{
              opacity:    scene === 5 ? 1 : 0,
              transform:  `scale(${scene === 5 ? 1 : 0.85})`,
              filter:     "drop-shadow(0 0 22px rgba(0,229,255,0.35))",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
              marginBottom: 24,
            }}
          >
            <PIXIHead size={110} trackMouse />
          </div>

          {/* Pregunta */}
          <h2
            className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-10"
            style={{
              opacity:    sceneP > 0.1 ? 1 : 0,
              transform:  `translateY(${sceneP > 0.1 ? 0 : 20}px)`,
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            ¿Qué deseas
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
            >
              transformar hoy?
            </span>
          </h2>

          {/* 3 botones de elección */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
            {CHOICES.map((c, i) => (
              <div
                key={c.id}
                className="flex-1"
                style={{
                  opacity:    sceneP > 0.25 + i * 0.12 ? 1 : 0,
                  transform:  `translateY(${sceneP > 0.25 + i * 0.12 ? 0 : 24}px)`,
                  transition: "opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <Link
                  href={c.href}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-2xl border transition-all duration-300"
                  style={{
                    background:   hovered === c.id ? `${c.color}10` : "rgba(255,255,255,0.025)",
                    borderColor:  hovered === c.id ? `${c.color}45` : "rgba(255,255,255,0.07)",
                    boxShadow:    hovered === c.id ? `0 0 36px ${c.color}18` : "none",
                    transform:    hovered === c.id ? "translateY(-4px)" : "none",
                  }}
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span
                    className="text-sm font-semibold text-center leading-snug transition-colors duration-200"
                    style={{ color: hovered === c.id ? c.color : "#64748b" }}
                  >
                    {c.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA secundario */}
          <div
            className="mt-8 flex gap-4 items-center"
            style={{
              opacity:    sceneP > 0.7 ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <Link
              href="/agendar"
              className="text-xs font-mono text-slate-600 hover:text-[#00E5FF] transition-colors tracking-wider uppercase"
            >
              o agenda una reunión gratuita →
            </Link>
          </div>
        </Scene>

        {/* Dots de navegación */}
        <SceneDots scene={scene} />

      </div>
      {/* Fin sticky viewport */}
    </div>
  );
}
