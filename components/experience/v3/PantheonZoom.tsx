"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { OracleSanctuary } from "./OracleSanctuary";

// ─── Data ────────────────────────────────────────────────────────────────────
// portal = punto de la imagen (0–1) por donde la cámara "entra" al siguiente oráculo

const ORACLES = [
  {
    id: "ia",
    codename: "AURELIUS",
    name: "Oráculo IA",
    tagline: "The Oracle of Hyperautomation",
    desc: "CRM, ERP, Appian y agentes de IA que trabajan 24/7 por tu empresa.",
    color: "#00E5FF",
    href: "/hiperautomatizacion",
    img: "/assets/oracles/aurelius/hero.webp",
    stat: "80%",
    statLabel: "menos trabajo manual",
    cta: "Automatizar mi empresa",
    tags: ["ERP", "CRM", "BPM", "AI AGENTS", "API"],
    portal: { x: 0.43, y: 0.23 },
  },
  {
    id: "mkt",
    codename: "LUMINA",
    name: "Oráculo Marketing",
    tagline: "Guardian of Digital Growth",
    desc: "SEO, pauta inteligente y estrategias enfocadas en ROI, no en métricas de vanidad.",
    color: "#FF55CC",
    href: "/marketing-digital",
    img: "/assets/oracles/lumina/hero.webp",
    stat: "3.4×",
    statLabel: "ROAS promedio",
    cta: "Crecer mi marca",
    tags: ["SEO", "GOOGLE ADS", "FUNNEL", "SOCIAL", "BRANDING"],
    portal: { x: 0.375, y: 0.285 },
  },
  {
    id: "seg",
    codename: "AEGIS",
    name: "Oráculo Seguridad",
    tagline: "Guardian of Digital & Physical Protection",
    desc: "Vigilancia absoluta con CCTV, biometría e IA que protege antes de que ocurra cualquier amenaza.",
    color: "#D4AF37",
    href: "/seguridad-inteligente",
    img: "/assets/oracles/aegis/hero.webp",
    stat: "24/7",
    statLabel: "vigilancia activa",
    cta: "Proteger mi empresa",
    tags: ["CCTV", "BIOMETRÍA", "ACCESO", "THREAT AI"],
    portal: { x: 0.5, y: 0.685 },
  },
];

type Oracle = (typeof ORACLES)[number];

const N = ORACLES.length;
// Línea de tiempo en "unidades": intro (1) + por oráculo [pausa (1) + transición (1)] + cierre (1)
const UNITS = 2 * N + 2;
const VH_PER_UNIT = 90;

// ─── Viewport ────────────────────────────────────────────────────────────────

function useViewport() {
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vp;
}

// ─── Vista general del Panteón (inicio y cierre) ─────────────────────────────

function Overview({ u, vp }: { u: MotionValue<number>; vp: { w: number; h: number } }) {
  const rowW = Math.min(vp.w * 0.9, 1100);
  const cardW = rowW / 3;
  const offset = cardW; // distancia del centro de una carta lateral al centro de la pantalla
  // La carta crece hasta el tamaño exacto de la escena del oráculo
  const zoom = Math.min(vp.w * 0.92, vp.h * 0.62, 1000) / cardW;

  const opacity = useTransform(u, [0, 0.6, 0.95, 2 * N + 0.25, 2 * N + 0.8], [1, 1, 0, 0, 1]);
  const scale = useTransform(u, [0, 1, 2 * N, 2 * N + 1], [1, zoom, zoom, 1]);
  const x = useTransform(u, [0, 1, 2 * N, 2 * N + 1], [0, offset * zoom, -offset * zoom, 0]);
  // La cámara entra por la primera carta y sale por la última
  const origin = useTransform(u, (v) =>
    v < N ? `calc(50% - ${offset}px) 55%` : `calc(50% + ${offset}px) 55%`,
  );

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity }}>
      <motion.div
        className="w-full flex flex-col items-center"
        style={{ scale, x, transformOrigin: origin }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "linear-gradient(135deg,#00E5FF,#FF55CC)" }}
          />
          El Panteón 01
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white text-center leading-tight mb-8">
          Los guardianes de{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #00E5FF 0%, #FF55CC 50%, #D4AF37 100%)" }}
          >
            tu empresa
          </span>
        </h2>

        <div className="grid grid-cols-3" style={{ width: rowW }}>
          {ORACLES.map((o) => (
            <div key={o.id} className="px-1.5 sm:px-2">
              <div
                className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 0 50px ${o.color}30`, border: `1px solid ${o.color}30` }}
              >
                <Image src={o.img} alt={`${o.codename}, ${o.name}`} fill sizes="34vw" className="object-cover" />
              </div>
              <p
                className="mt-3 text-center text-[9px] sm:text-[11px] font-mono tracking-[0.3em] uppercase"
                style={{ color: o.color }}
              >
                {o.codename}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Escena de cada oráculo ──────────────────────────────────────────────────

function OracleScene({
  o,
  i,
  u,
  active,
}: {
  o: Oracle;
  i: number;
  u: MotionValue<number>;
  active: boolean;
}) {
  const s = 1 + 2 * i; // inicio de la pausa en este oráculo
  const isLast = i === N - 1;
  const prev = i > 0 ? ORACLES[i - 1] : null;

  // Entrada: nace desde el portal del oráculo anterior (o desde la vista general)
  const enterScale = useTransform(u, [s - 1, s], [prev ? 0.12 : 0.85, 1]);
  const enterX = useTransform(u, [s - 1, s], [prev ? `${(prev.portal.x - 0.5) * 100}%` : "0%", "0%"]);
  const enterY = useTransform(u, [s - 1, s], [prev ? `${(prev.portal.y - 0.5) * 100}%` : "0%", "0%"]);

  // Pausa: leve acercamiento. Salida: zoom dentro del portal (o alejamiento al final)
  const exitScale = useTransform(u, [s, s + 1, s + 2], [1, 1.06, isLast ? 0.35 : 9]);

  const opacity = useTransform(
    u,
    isLast
      ? [s - 0.45, s - 0.05, s + 1.25, s + 1.7]
      : [s - 0.45, s - 0.05, s + 1.5, s + 1.92],
    [0, 1, 1, 0],
  );
  // Fuera de cuadro no se pinta (la capa a 9× es enorme)
  const visibility = useTransform(opacity, (v) => (v < 0.01 ? "hidden" : "visible"));

  const hudOpacity = useTransform(u, [s - 0.05, s + 0.25, s + 0.8, s + 1.1], [0, 1, 1, 0]);
  const hudY = useTransform(u, [s - 0.05, s + 0.25, s + 0.8, s + 1.1], [40, 0, 0, -30]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, visibility, pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      {/* Fondo del templo teñido con el color del oráculo */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 55%, ${o.color}22 0%, #020305 62%)` }}
      />

      {/* Imagen — capa de cámara */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center pt-[9vh] md:pt-0">
        <motion.div
          className="relative"
          style={{
            width: "min(92vw, 62vh, 1000px)",
            height: "min(92vw, 62vh, 1000px)",
            x: enterX,
            y: enterY,
            scale: enterScale,
          }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              scale: exitScale,
              transformOrigin: `${o.portal.x * 100}% ${o.portal.y * 100}%`,
            }}
          >
            {/* Halo giratorio */}
            <div
              className="absolute -inset-[6%] rounded-full pointer-events-none"
              style={{
                border: `1px solid ${o.color}40`,
                boxShadow: `0 0 80px ${o.color}25, inset 0 0 80px ${o.color}15`,
                animation: "pantheon-spin 40s linear infinite",
              }}
            />
            <div
              className="relative w-full h-full rounded-[28px] overflow-hidden"
              style={{ boxShadow: `0 0 120px ${o.color}40, 0 0 40px ${o.color}25` }}
            >
              <Image
                src={o.img}
                alt={`${o.codename}, ${o.name}: ${o.tagline}`}
                fill
                sizes="(max-width: 768px) 92vw, 62vh"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* HUD de texto — HTML real, accesible */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-5 pb-6 md:inset-auto md:left-[4vw] md:top-1/2 md:-translate-y-1/2 md:pb-0 md:px-0 md:w-[min(24vw,340px)]"
        style={{ opacity: hudOpacity, y: hudY }}
      >
        <div
          className="rounded-2xl p-5 md:p-6 backdrop-blur-xl"
          style={{ background: "rgba(5,5,8,0.72)", border: `1px solid ${o.color}30` }}
        >
          <div
            className="h-px w-full mb-4"
            style={{ background: `linear-gradient(90deg, ${o.color}, transparent)` }}
          />
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1" style={{ color: o.color }}>
            {String(i + 1).padStart(2, "0")} · {o.codename}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{o.name}</h3>
          <p className="text-[11px] font-mono text-slate-500 mb-3">{o.tagline}</p>
          <p className="hidden md:block text-slate-400 text-sm leading-relaxed mb-4">{o.desc}</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold" style={{ color: o.color }}>
              {o.stat}
            </span>
            <span className="text-xs text-slate-500">{o.statLabel}</span>
          </div>
          <div className="hidden md:flex flex-wrap gap-1.5 mb-5">
            {o.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md text-[10px] font-mono tracking-wider"
                style={{ background: `${o.color}12`, border: `1px solid ${o.color}25`, color: o.color }}
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            href={o.href}
            tabIndex={active ? 0 : -1}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${o.color}25, ${o.color}10)`,
              border: `1px solid ${o.color}40`,
              color: o.color,
            }}
          >
            {o.cta} →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Sección ─────────────────────────────────────────────────────────────────

export function PantheonZoom() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const vp = useViewport();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const u = useTransform(scrollYProgress, [0, 1], [0, UNITS]);

  // Escena activa: -1 = vista general
  const [active, setActive] = useState(-1);
  useMotionValueEvent(u, "change", (v) => {
    const idx = Math.floor((v - 0.5) / 2);
    setActive(idx >= 0 && idx < N && v < 2 * N + 0.5 ? idx : -1);
  });

  const ctaOpacity = useTransform(u, [2 * N + 0.9, 2 * N + 1.3], [0, 1]);

  // Sin animaciones: mostramos el santuario estático de siempre
  if (reduce) return <OracleSanctuary />;

  const skip = () => {
    const el = ref.current;
    if (el) window.scrollTo({ top: el.offsetTop + el.offsetHeight, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const unit = (el.offsetHeight - window.innerHeight) / UNITS;
    window.scrollTo({ top: el.offsetTop + unit * (1.35 + 2 * i), behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="panteon"
      className="relative bg-[#020305]"
      style={{ height: `${(UNITS + 1) * VH_PER_UNIT}vh` }}
      aria-label="El Panteón 01: los oráculos de 01pixels"
    >
      <style>{`@keyframes pantheon-spin { to { transform: rotate(360deg); } }`}</style>

      <div className="sticky top-0 h-screen overflow-hidden">
        <Overview u={u} vp={vp} />

        {ORACLES.map((o, i) => (
          <OracleScene key={o.id} o={o} i={i} u={u} active={active === i} />
        ))}

        {/* CTA del cierre */}
        <motion.div
          className="absolute inset-x-0 bottom-[7vh] flex flex-col items-center px-6"
          style={{ opacity: ctaOpacity, pointerEvents: active === -1 ? "auto" : "none" }}
        >
          <Link
            href="/agendar"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[#050505] text-base transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)" }}
          >
            Agendar Diagnóstico Gratuito →
          </Link>
          <p className="text-slate-600 text-xs mt-3 font-mono">Sin costo · Sin compromiso</p>
        </motion.div>

        {/* Navegación: un punto por oráculo */}
        <nav
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
          aria-label="Oráculos"
        >
          {ORACLES.map((o, i) => (
            <button
              key={o.id}
              onClick={() => goTo(i)}
              aria-label={`Ir a ${o.codename}`}
              aria-current={active === i}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: active === i ? o.color : "transparent",
                border: `1px solid ${o.color}`,
                boxShadow: active === i ? `0 0 12px ${o.color}` : "none",
                transform: active === i ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </nav>

        <button
          onClick={skip}
          className="absolute top-24 right-4 md:right-8 text-[10px] font-mono tracking-[0.25em] uppercase text-slate-500 hover:text-white transition-colors"
        >
          Saltar ↓
        </button>
      </div>
    </section>
  );
}
