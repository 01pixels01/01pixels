"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
        className="fixed top-0 left-0 z-[9999] w-2 h-2 bg-blue-400 rounded-full pointer-events-none mix-blend-difference transition-opacity duration-300"
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
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d1628] border border-blue-500/30 text-blue-300 text-xs font-medium px-3 py-2 rounded-xl shadow-[0_0_16px_rgba(59,130,246,0.2)] animate-fade-in">
            {message}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1628] border-r border-b border-blue-500/30 rotate-45" />
          </div>
        )}

        {/* PIXI robot */}
        <div className="w-14 h-14 relative">
          <Image
            src="/pixi-robot.png"
            alt="PIXI"
            width={56}
            height={56}
            className="w-14 h-14 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            onError={() => {
              /* fallback rendered below if image missing */
            }}
          />
          {/* Fallback SVG robot if no image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 relative">
              {/* Head */}
              <div className="absolute top-0 left-1 right-1 h-6 bg-[#1a1f35] border border-blue-500/50 rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.4)] flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse [animation-delay:200ms]" />
              </div>
              {/* Body */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#1a1f35] border border-blue-500/50 rounded-md">
                <div className="grid grid-cols-2 gap-0.5 p-1">
                  <div className="bg-orange-500/80 rounded-sm h-1" />
                  <div className="bg-teal-500/80 rounded-sm h-1" />
                  <div className="bg-green-500/80 rounded-sm h-1" />
                  <div className="bg-blue-500/80 rounded-sm h-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
