"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bot, Users, Boxes, Megaphone, Fingerprint, type LucideIcon } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Card = {
  tag: string;
  title: string;
  color: string;
  img?: string;
  icon?: LucideIcon;
};

const CARDS: Card[] = [
  { tag: "IA",   title: "Agentes que trabajan 24/7", color: "#00E5FF", img: "/assets/oracles/aurelius/hero.webp" },
  { tag: "CRM",  title: "Tus clientes en un solo lugar", color: "#7C3AED", icon: Users },
  { tag: "ERP",  title: "La operación, integrada",   color: "#00FF88", icon: Boxes },
  { tag: "SEO",  title: "Que te encuentren",          color: "#FF55CC", img: "/assets/oracles/lumina/hero.webp" },
  { tag: "ADS",  title: "Pauta que sí vende",         color: "#FBBC04", icon: Megaphone },
  { tag: "CCTV", title: "Vigilancia con IA",          color: "#D4AF37", img: "/assets/oracles/aegis/hero.webp" },
  { tag: "BIO",  title: "Acceso biométrico",          color: "#7C3AED", icon: Fingerprint },
  { tag: "PIXI", title: "Tu asistente en redes",      color: "#00E5FF", img: "/pixi-robot.png" },
];

const STEP = 360 / CARDS.length;

// ─── Cinta 3D ────────────────────────────────────────────────────────────────
// Las tarjetas viven en un cilindro inclinado; giran con el scroll y, en
// reposo, siguen rotando despacio. La rotación se aplica fuera de React
// (requestAnimationFrame + refs) para no re-renderizar en cada frame.

export function EcosystemRibbon({
  active,
  progress,
  reduced,
}: {
  active: boolean;
  progress: number;
  reduced: boolean;
}) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardW = mobile ? 128 : 190;
  const cardH = mobile ? 172 : 250;
  const radius = Math.round((cardW * CARDS.length) / (2 * Math.PI) * 1.18);

  useEffect(() => {
    if (!active) return;
    let id: number;
    let rot = progressRef.current * 150;
    const start = performance.now();

    const tick = (now: number) => {
      const target = progressRef.current * 150 + (reduced ? 0 : ((now - start) / 1000) * 7);
      rot += (target - rot) * 0.08; // suavizado

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const theta = i * STEP - rot;
        const rad = (theta * Math.PI) / 180;
        const depth = (Math.cos(rad) + 1) / 2; // 1 = al frente, 0 = atrás
        const wave = Math.sin(rad * 2) * (mobile ? 14 : 26);
        el.style.transform =
          `rotateY(${theta}deg) translateZ(${radius}px) translateY(${wave}px) rotateZ(${Math.sin(rad) * -4}deg)`;
        el.style.opacity = String(0.18 + depth * 0.82);
        el.style.filter = `brightness(${0.35 + depth * 0.65}) saturate(${0.6 + depth * 0.4})`;
        el.style.zIndex = String(Math.round(depth * 100));
      });
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, reduced, radius, mobile]);

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: cardH + 90, perspective: mobile ? 900 : 1400 }}
    >
      <div
        className="relative"
        style={{
          width: cardW,
          height: cardH,
          transformStyle: "preserve-3d",
          transform: "rotateX(-8deg)",
        }}
      >
        {CARDS.map((c, i) => {
          const Icon = c.icon ?? Bot;
          return (
            <div
              key={c.tag}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 rounded-2xl overflow-hidden text-left"
              style={{
                transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)`,
                border: `1px solid ${c.color}40`,
                boxShadow: `0 20px 60px -20px ${c.color}55, inset 0 1px 0 rgba(255,255,255,0.06)`,
                background: c.img
                  ? "#05070c"
                  : `radial-gradient(120% 90% at 20% 0%, ${c.color}30 0%, #07080d 60%)`,
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
            >
              {c.img ? (
                <Image
                  src={c.img}
                  alt=""
                  fill
                  sizes="200px"
                  className={c.tag === "PIXI" ? "object-contain p-4 pb-16" : "object-cover"}
                />
              ) : (
                <Icon
                  aria-hidden
                  className="absolute right-3 top-3 opacity-90"
                  style={{ color: c.color, width: mobile ? 34 : 52, height: mobile ? 34 : 52 }}
                  strokeWidth={1.25}
                />
              )}

              {/* Pie de la tarjeta */}
              <div
                className="absolute inset-x-0 bottom-0 p-3 sm:p-4"
                style={{ background: "linear-gradient(to top, rgba(3,4,8,0.95) 30%, transparent)" }}
              >
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em]"
                  style={{ color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}35` }}
                >
                  {c.tag}
                </span>
                <p className="mt-1.5 text-white text-xs sm:text-sm font-semibold leading-snug">{c.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sombra de piso */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: radius * 2.2,
          height: 40,
          background: "radial-gradient(ellipse, rgba(0,229,255,0.18), transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
