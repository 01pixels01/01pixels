"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function Scene2Network() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Node = { x: number; y: number; vx: number; vy: number; size: number; color: string; pulse: number };
    const nodes: Node[] = [];
    const colors = ["#3b82f6", "#60a5fa", "#a78bfa", "#34d399", "#f97316"];

    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let active = true;

    const draw = () => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.25;
            ctx.beginPath();
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, nodes[i].color + Math.round(alpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, nodes[j].color + Math.round(alpha * 255).toString(16).padStart(2, "0"));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.pulse += 0.03;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4);
        glow.addColorStop(0, n.color + "cc");
        glow.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030508]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020305] via-transparent to-[#020305] pointer-events-none" />

      {/* Central content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Red de datos en tiempo real
        </div>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Transformamos procesos
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            en crecimiento
          </span>
        </h2>
        <p className="text-slate-400 text-xl max-w-xl mx-auto">
          Cada conexión es una oportunidad. Cada dato, una decisión más inteligente.
        </p>

        {/* Floating stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { v: "150+", l: "Proyectos" },
            { v: "98%", l: "Satisfacción" },
            { v: "3x", l: "ROI promedio" },
            { v: "24/7", l: "Disponibilidad IA" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`glass rounded-2xl px-6 py-4 border border-white/5 hover:border-blue-500/30 transition-all duration-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100 + 300}ms` }}
            >
              <div className="text-2xl font-bold text-gradient">{s.v}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
