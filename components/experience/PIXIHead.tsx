"use client";
import { useEffect, useRef, useState } from "react";

interface PIXIHeadProps {
  size?: number;
  /** Si true, los ojos siguen el mouse globalmente */
  trackMouse?: boolean;
  /** Si true, los ojos siguen el mouse relativo al contenedor */
  trackLocal?: boolean;
}

export function PIXIHead({ size = 48, trackMouse = false, trackLocal = false }: PIXIHeadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  // Seguimiento de ojos
  useEffect(() => {
    if (!trackMouse && !trackLocal) return;

    const handleMove = (e: MouseEvent) => {
      if (trackLocal && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxOffset = 2.5;
        setGaze({
          x: dist > 0 ? (dx / dist) * Math.min(dist / 40, maxOffset) : 0,
          y: dist > 0 ? (dy / dist) * Math.min(dist / 40, maxOffset) : 0,
        });
      } else if (trackMouse && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxOffset = 2;
        setGaze({
          x: dist > 0 ? (dx / dist) * Math.min(dist / 60, maxOffset) : 0,
          y: dist > 0 ? (dy / dist) * Math.min(dist / 60, maxOffset) : 0,
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [trackMouse, trackLocal]);

  // Parpadeo aleatorio
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 150);
      }, delay);
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  const s = size;
  const eyeRx = s * 0.095;
  const eyeRy = blink ? 0.5 : s * 0.13;
  const eyeY = s * 0.42;
  const eyeLX = s * 0.35;
  const eyeRX = s * 0.65;

  return (
    <div ref={containerRef} style={{ width: s, height: s }} className="relative flex-shrink-0">
      <svg
        viewBox={`0 0 ${s} ${s}`}
        width={s}
        height={s}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter para los ojos */}
          <filter id="pixi-eye-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Glow exterior cabeza */}
          <filter id="pixi-head-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradiente metálico cabeza */}
          <linearGradient id="pixi-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="40%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          {/* Gradiente pantalla */}
          <linearGradient id="pixi-screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050810" />
            <stop offset="100%" stopColor="#020508" />
          </linearGradient>
          {/* Glow cyan para ojos */}
          <radialGradient id="pixi-eye-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#80F4FF" />
            <stop offset="60%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0099BB" />
          </radialGradient>
        </defs>

        {/* ── OREJAS / ALTAVOCES LATERALES ── */}
        {/* Izquierda */}
        <circle cx={s * 0.06} cy={s * 0.46} r={s * 0.085} fill="#1a1a1a" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx={s * 0.06} cy={s * 0.46} r={s * 0.045} fill="#050810" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.6" />
        <circle cx={s * 0.06} cy={s * 0.46} r={s * 0.018} fill="#00E5FF" opacity="0.8" />
        {/* Derecha */}
        <circle cx={s * 0.94} cy={s * 0.46} r={s * 0.085} fill="#1a1a1a" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx={s * 0.94} cy={s * 0.46} r={s * 0.045} fill="#050810" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.6" />
        <circle cx={s * 0.94} cy={s * 0.46} r={s * 0.018} fill="#00E5FF" opacity="0.8" />

        {/* ── CUERPO / CABEZA ── */}
        {/* Sombra/glow exterior */}
        <rect
          x={s * 0.11} y={s * 0.08}
          width={s * 0.78} height={s * 0.78}
          rx={s * 0.12} ry={s * 0.12}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1"
          strokeOpacity="0.15"
          filter="url(#pixi-head-glow)"
        />
        {/* Marco metálico principal */}
        <rect
          x={s * 0.12} y={s * 0.09}
          width={s * 0.76} height={s * 0.76}
          rx={s * 0.11} ry={s * 0.11}
          fill="url(#pixi-metal)"
          stroke="#333"
          strokeWidth="1"
        />
        {/* Bisel interior */}
        <rect
          x={s * 0.17} y={s * 0.14}
          width={s * 0.66} height={s * 0.66}
          rx={s * 0.08} ry={s * 0.08}
          fill="#111"
          stroke="#222"
          strokeWidth="0.5"
        />
        {/* Pantalla */}
        <rect
          x={s * 0.19} y={s * 0.16}
          width={s * 0.62} height={s * 0.62}
          rx={s * 0.07} ry={s * 0.07}
          fill="url(#pixi-screen)"
        />
        {/* Reflejo sutil en pantalla */}
        <rect
          x={s * 0.21} y={s * 0.17}
          width={s * 0.28} height={s * 0.08}
          rx={s * 0.04}
          fill="white"
          opacity="0.03"
        />

        {/* ── OJOS ── */}
        {/* Ojo izquierdo - base glow */}
        <ellipse
          cx={eyeLX + gaze.x}
          cy={eyeY + gaze.y}
          rx={eyeRx * 1.6}
          ry={eyeRy * 1.4}
          fill="#00E5FF"
          opacity="0.12"
          filter="url(#pixi-eye-glow)"
        />
        {/* Ojo izquierdo */}
        <ellipse
          cx={eyeLX + gaze.x}
          cy={eyeY + gaze.y}
          rx={eyeRx}
          ry={eyeRy}
          fill="url(#pixi-eye-grad)"
          filter="url(#pixi-eye-glow)"
          style={{ transition: "ry 0.08s ease" }}
        />

        {/* Ojo derecho - base glow */}
        <ellipse
          cx={eyeRX + gaze.x}
          cy={eyeY + gaze.y}
          rx={eyeRx * 1.6}
          ry={eyeRy * 1.4}
          fill="#00E5FF"
          opacity="0.12"
          filter="url(#pixi-eye-glow)"
        />
        {/* Ojo derecho */}
        <ellipse
          cx={eyeRX + gaze.x}
          cy={eyeY + gaze.y}
          rx={eyeRx}
          ry={eyeRy}
          fill="url(#pixi-eye-grad)"
          filter="url(#pixi-eye-glow)"
          style={{ transition: "ry 0.08s ease" }}
        />

        {/* Brillo en ojos */}
        {!blink && (
          <>
            <ellipse cx={eyeLX + gaze.x - eyeRx * 0.3} cy={eyeY + gaze.y - eyeRy * 0.35} rx={eyeRx * 0.22} ry={eyeRy * 0.22} fill="white" opacity="0.5" />
            <ellipse cx={eyeRX + gaze.x - eyeRx * 0.3} cy={eyeY + gaze.y - eyeRy * 0.35} rx={eyeRx * 0.22} ry={eyeRy * 0.22} fill="white" opacity="0.5" />
          </>
        )}

        {/* ── SONRISA ── */}
        {!blink && (
          <>
            {/* Glow sonrisa */}
            <path
              d={`M ${s*0.33} ${s*0.62} Q ${s*0.5} ${s*0.73} ${s*0.67} ${s*0.62}`}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.2"
              filter="url(#pixi-eye-glow)"
            />
            {/* Sonrisa principal */}
            <path
              d={`M ${s*0.33} ${s*0.62} Q ${s*0.5} ${s*0.73} ${s*0.67} ${s*0.62}`}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </>
        )}

        {/* ── BASE / CUELLO ── */}
        <rect
          x={s * 0.38} y={s * 0.85}
          width={s * 0.24} height={s * 0.08}
          rx={s * 0.03}
          fill="#1a1a1a"
          stroke="#222"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
