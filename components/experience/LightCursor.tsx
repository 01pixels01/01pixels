"use client";

import { useEffect, useRef } from "react";

// Cursor ligero: punto cian exacto + anillo que lo sigue con suavidad y
// crece sobre enlaces y botones. Solo en dispositivos con mouse; en táctiles
// no se monta nada. Todo se mueve por refs, sin re-renderizar React.

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

export function LightCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-light-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hover = false;
    let down = false;
    let id = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      hover = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onDown = () => { down = true; };
    const onUp = () => { down = false; };

    const tick = () => {
      const k = reduced ? 1 : 0.18;
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      const scale = (hover ? 1.8 : 1) * (down ? 0.8 : 1);

      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.background = hover ? "rgba(0,229,255,0.08)" : "transparent";
      ring.style.borderColor = hover ? "rgba(0,229,255,0.9)" : "rgba(0,229,255,0.45)";
      id = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    id = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      root.classList.remove("has-light-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border pointer-events-none opacity-0"
        style={{
          borderColor: "rgba(0,229,255,0.45)",
          transition: "opacity 0.2s ease, background 0.2s ease, border-color 0.2s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none opacity-0"
        style={{ background: "#00E5FF", boxShadow: "0 0 6px #00E5FF", transition: "opacity 0.2s ease", willChange: "transform" }}
      />
    </>
  );
}
