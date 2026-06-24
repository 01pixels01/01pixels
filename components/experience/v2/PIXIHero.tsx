"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { PIXIHead } from "@/components/experience/PIXIHead";

const LINES = ["Hola. Soy PIXI.", "¿Qué deseas transformar hoy?"];

function Typewriter({ text, onDone, delay = 0 }: { text: string; onDone?: () => void; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); onDoneRef.current?.(); }
      }, 38);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]); // onDone fuera de deps — se lee por ref para no reiniciar el effect
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

const choices = [
  { icon: "⚡", label: "Automatizar procesos", href: "/hiperautomatizacion", color: "#00E5FF", id: "ia" },
  { icon: "📈", label: "Conseguir más clientes", href: "/marketing-digital", color: "#FF6B9D", id: "mkt" },
  { icon: "🛡️", label: "Mejorar seguridad", href: "/seguridad-inteligente", color: "#7C3AED", id: "seg" },
];

export function PIXIHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0); // 0=dark 1=pixi 2=line1 3=line2 4=buttons
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: 0.5 + Math.random() * 1,
      color: Math.random() > 0.5 ? "#00E5FF" : "#7C3AED",
    }));
    const tick = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "#00E5FF";
            ctx.globalAlpha = 0.04 * (1 - d / 100);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Awakening sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-60" />

      {/* Radial glow behind PIXI */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-[1] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)" }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">

        {/* PIXI head — aparece primero */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="mb-8"
              style={{ filter: "drop-shadow(0 0 24px rgba(0,229,255,0.4))" }}
            >
              <PIXIHead size={120} trackMouse />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Línea 1 — "Hola. Soy PIXI." */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-3 font-mono"
              style={{ textShadow: "0 0 30px rgba(0,229,255,0.4)" }}
            >
              <Typewriter text={LINES[0]} onDone={() => setStep(3)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Línea 2 — "¿Qué deseas transformar hoy?" */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-12 leading-tight"
              style={{ textShadow: "0 0 40px rgba(0,229,255,0.15)" }}
            >
              <Typewriter
                text={LINES[1]}
                delay={100}
                onDone={() => setTimeout(() => setStep(4), 300)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 botones de elección */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
            >
              {choices.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 180 }}
                  className="flex-1"
                >
                  <Link
                    href={c.href}
                    onMouseEnter={() => setHoveredChoice(c.id)}
                    onMouseLeave={() => setHoveredChoice(null)}
                    className="group flex flex-col items-center gap-3 w-full py-6 px-4 rounded-2xl border transition-all duration-300"
                    style={{
                      background: hoveredChoice === c.id ? `${c.color}12` : "rgba(255,255,255,0.03)",
                      borderColor: hoveredChoice === c.id ? `${c.color}50` : "rgba(255,255,255,0.08)",
                      boxShadow: hoveredChoice === c.id ? `0 0 40px ${c.color}20` : "none",
                      transform: hoveredChoice === c.id ? "translateY(-4px)" : "none",
                    }}
                  >
                    <span className="text-3xl">{c.icon}</span>
                    <span
                      className="text-sm font-semibold text-center leading-snug transition-colors"
                      style={{ color: hoveredChoice === c.id ? c.color : "#94a3b8" }}
                    >
                      {c.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip / scroll indicator */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#00E5FF]/30 to-transparent animate-pulse" />
            <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
