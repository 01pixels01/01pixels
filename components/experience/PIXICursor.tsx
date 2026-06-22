"use client";

import { useEffect, useRef, useState } from "react";

export function PIXICursor() {
  const pixiRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [talking, setTalking] = useState(false);
  const [message, setMessage] = useState("");

  const messages = [
    "¡Hola! Soy PIXI 👋",
    "¿Listo para el futuro?",
    "Podemos automatizar eso ⚡",
    "Hablemos de tu empresa",
    "¡Impresionante, verdad? 😄",
  ];

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", onMove);

    let animId: number;
    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.08;
      current.current.y += (pos.current.y - current.current.y) * 0.08;

      if (pixiRef.current) {
        pixiRef.current.style.transform = `translate(${current.current.x - 28}px, ${current.current.y - 28}px)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Random messages
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        setTalking(true);
        setTimeout(() => setTalking(false), 3000);
      }
    }, 8000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{ background: "#00E5FF", boxShadow: "0 0 6px #00E5FF" }}
        style={{ willChange: "transform" }}
      />

      {/* PIXI mascot */}
      <div
        ref={pixiRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* Speech bubble */}
        {talking && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0D0D0D] border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-medium px-3 py-2 rounded-xl shadow-[0_0_16px_rgba(0,229,255,0.15)]">
            {message}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D0D0D] border-r border-b border-[#00E5FF]/25 rotate-45" />
          </div>
        )}

        {/* PIXI orbit cursor */}
        <div className="w-14 h-14 relative flex items-center justify-center">
          <style>{`
            @keyframes pixi-c-orbit-1 {
              from { transform: rotate(0deg)   translateX(18px) rotate(0deg); }
              to   { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
            }
            @keyframes pixi-c-orbit-2 {
              from { transform: rotate(120deg)   translateX(18px) rotate(-120deg); }
              to   { transform: rotate(480deg)   translateX(18px) rotate(-480deg); }
            }
            @keyframes pixi-c-orbit-3 {
              from { transform: rotate(240deg)   translateX(18px) rotate(-240deg); }
              to   { transform: rotate(600deg)   translateX(18px) rotate(-600deg); }
            }
          `}</style>

          {/* Outer glow ring */}
          <div className="absolute w-12 h-12 rounded-full border border-[#00E5FF]/15" />

          {/* Inner ring */}
          <div className="absolute w-7 h-7 rounded-full border border-[#7C3AED]/20" />

          {/* Nucleus */}
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, #00E5FF 0%, #7C3AED 100%)",
              boxShadow: "0 0 8px rgba(0,229,255,0.9), 0 0 16px rgba(124,58,237,0.5)",
            }}
          />

          {/* Dot 1 — cyan */}
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: "#00E5FF",
              boxShadow: "0 0 6px #00E5FF, 0 0 12px rgba(0,229,255,0.5)",
              animation: "pixi-c-orbit-1 1.6s linear infinite",
            }}
          />

          {/* Dot 2 — purple */}
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "#7C3AED",
              boxShadow: "0 0 6px #7C3AED, 0 0 12px rgba(124,58,237,0.5)",
              animation: "pixi-c-orbit-2 1.6s linear infinite",
            }}
          />

          {/* Dot 3 — green */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "#00FF88",
              boxShadow: "0 0 6px #00FF88, 0 0 12px rgba(0,255,136,0.5)",
              animation: "pixi-c-orbit-3 1.6s linear infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
