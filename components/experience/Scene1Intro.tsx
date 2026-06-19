"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Scene1Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pixiRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Line appears
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    // PIXI assembles
    .fromTo(pixiRef.current,
      { opacity: 0, scale: 0.3, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .add(() => setAssembled(true), "-=0.5")
    // Text fades in
    .fromTo(textRef.current?.children ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020305]"
    >
      {/* Deep space background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,20,60,0.8)_0%,_transparent_70%)]" />
        <StarField />
      </div>

      {/* Energy line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 origin-left"
        style={{ boxShadow: "0 0 20px 2px rgba(59,130,246,0.5)" }}
      />

      {/* PIXI assembling */}
      <div ref={pixiRef} className="relative z-10 mb-12 opacity-0">
        <PIXIAssembly assembled={assembled} />
      </div>

      {/* Text */}
      <div ref={textRef} className="relative z-10 text-center px-4">
        <p className="text-blue-400/60 text-xs tracking-[0.5em] uppercase mb-4 font-mono">
          Iniciando experiencia
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-none mb-6">
          Bienvenido al
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            futuro empresarial
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Una experiencia diferente. Una empresa diferente.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-600 animate-bounce">
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
      </div>
    </div>
  );
}

function PIXIAssembly({ assembled }: { assembled: boolean }) {
  return (
    <div className="relative w-40 h-40">
      {/* Orbital rings */}
      <div className={`absolute inset-0 rounded-full border border-blue-500/20 transition-all duration-1000 ${assembled ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        style={{ animation: assembled ? "spin 8s linear infinite" : "none" }} />
      <div className={`absolute inset-3 rounded-full border border-blue-400/15 transition-all duration-1000 delay-200 ${assembled ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        style={{ animation: assembled ? "spin 5s linear infinite reverse" : "none" }} />

      {/* Glow */}
      <div className={`absolute inset-0 bg-blue-500/10 rounded-full blur-xl transition-all duration-1000 ${assembled ? "opacity-100" : "opacity-0"}`} />

      {/* PIXI body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-24 h-24">
          {/* Head */}
          <div className={`absolute top-0 left-2 right-2 h-12 bg-gradient-to-b from-[#1a2040] to-[#0d1628] rounded-xl border border-blue-500/40 flex items-center justify-center gap-2 transition-all duration-700 ${assembled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
            style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            <div className="w-3 h-3 bg-cyan-400 rounded-full" style={{ boxShadow: "0 0 8px #22d3ee", animation: "pulse 1.5s infinite" }} />
            <div className="w-2 h-1 bg-cyan-400/60 rounded-full" />
            <div className="w-3 h-3 bg-cyan-400 rounded-full" style={{ boxShadow: "0 0 8px #22d3ee", animation: "pulse 1.5s infinite 0.3s" }} />
          </div>

          {/* Neck */}
          <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#1a2040] border-x border-blue-500/30 transition-all duration-500 delay-300 ${assembled ? "opacity-100" : "opacity-0"}`} />

          {/* Body */}
          <div className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#1a2040] to-[#111830] rounded-xl border border-blue-500/40 p-2 transition-all duration-700 delay-400 ${assembled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ boxShadow: "0 0 20px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            <div className="grid grid-cols-2 gap-1 h-full">
              <div className="bg-orange-500/80 rounded-sm" style={{ boxShadow: "0 0 6px rgba(249,115,22,0.5)" }} />
              <div className="bg-teal-400/80 rounded-sm" style={{ boxShadow: "0 0 6px rgba(45,212,191,0.5)" }} />
              <div className="bg-emerald-500/80 rounded-sm" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.5)" }} />
              <div className="bg-blue-500/80 rounded-sm" style={{ boxShadow: "0 0 6px rgba(59,130,246,0.5)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.twinkle += 0.02;
        const op = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${op})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
