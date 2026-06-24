"use client";

import { useEffect, useRef, useState } from "react";
import { PIXIHead } from "./PIXIHead";

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
        style={{ background: "#00E5FF", boxShadow: "0 0 6px #00E5FF", willChange: "transform" }}
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

        {/* PIXI head cursor */}
        <PIXIHead size={56} trackMouse />
      </div>
    </>
  );
}
