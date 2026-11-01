"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Recorte de PIXI con transparencia, sacado del video original (pixi-hola).
const ANIMATED = "/assets/pixi/pixi-agente.webp";
const STILL = "/assets/pixi/pixi-agente-still.webp";
const GREETED_KEY = "pixi-saludo-visto";

// Cabeza de PIXI en 3D para el encabezado y los mensajes del chat.
export function PixiAvatar({ size = 40 }: { size?: number }) {
  const width = size * 1.75;
  return (
    <span
      className="relative block overflow-hidden rounded-full bg-[#10131a] ring-1 ring-[#00E5FF]/30"
      style={{ width: size, height: size }}
    >
      <Image
        src={STILL}
        alt=""
        width={345}
        height={360}
        unoptimized
        className="absolute max-w-none"
        style={{ width, height: "auto", top: size * 0.04, left: size / 2 - width * 0.49 }}
      />
    </span>
  );
}

// PIXI de cuerpo entero: aparece como un holograma que se materializa de abajo hacia arriba.
export function PixiAgent3D({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    // Se carga después de la página para no frenar el primer pintado.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const start = setTimeout(() => {
      setAnimated(!reduced && !conn?.saveData);
      setReady(true);
    }, 900);

    let seen = false;
    try {
      seen = sessionStorage.getItem(GREETED_KEY) === "1";
      sessionStorage.setItem(GREETED_KEY, "1");
    } catch {
      // sin almacenamiento, simplemente saluda
    }
    const show = seen ? undefined : setTimeout(() => setBubble(true), 2600);
    const hide = seen ? undefined : setTimeout(() => setBubble(false), 10000);

    return () => {
      clearTimeout(start);
      if (show) clearTimeout(show);
      if (hide) clearTimeout(hide);
    };
  }, [reduced]);

  if (!ready) return null;

  return (
    <div className="fixed bottom-1 right-1 sm:bottom-3 sm:right-3 z-50 flex flex-col items-end">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="mb-1 mr-2 w-max max-w-[170px] rounded-2xl rounded-br-sm border border-[#00E5FF]/30 bg-[#0b0d13] px-3.5 py-2.5 text-[13px] leading-snug text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <strong className="font-semibold text-[#00E5FF]">¿Te ayudo?</strong> Escríbeme aquí.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Abrir chat con PIXI, asesor IA de 01pixels"
        className="group relative block w-[92px] sm:w-[136px] [perspective:800px]"
        style={{ aspectRatio: "345 / 360" }}
        whileHover={reduced ? undefined : { scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Disco holográfico a los pies */}
        <motion.span
          aria-hidden
          className="absolute -bottom-0.5 left-1/2 h-[16%] w-[86%] -translate-x-1/2 rounded-[50%] border border-[#00E5FF]/70"
          style={{
            background: "radial-gradient(ellipse, rgba(0,229,255,0.45) 0%, rgba(0,229,255,0.08) 55%, transparent 72%)",
            boxShadow: "0 0 18px rgba(0,229,255,0.45)",
          }}
          initial={reduced ? false : { opacity: 0, scaleX: 0.1 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* PIXI */}
        <motion.span
          className="absolute inset-0 block"
          style={{
            filter: "drop-shadow(0 0 7px rgba(0,229,255,0.5)) drop-shadow(0 8px 10px rgba(0,0,0,0.35))",
            transformStyle: "preserve-3d",
          }}
          initial={reduced ? false : { opacity: 0, y: 26, rotateY: -55, clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ opacity: 1, y: 0, rotateY: 0, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={animated ? ANIMATED : STILL} alt="" fill unoptimized sizes="136px" className="object-contain" />
        </motion.span>

        {/* Línea de escaneo mientras se materializa */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-x-[8%] h-[2px] rounded-full bg-[#00E5FF]"
            style={{ boxShadow: "0 0 14px 3px rgba(0,229,255,0.75)" }}
            initial={{ top: "96%", opacity: 0 }}
            animate={{ top: ["96%", "2%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Sello de IA */}
        <motion.span
          className="absolute right-[10%] top-[6%] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#050505] bg-[#00FF88] text-[8px] font-bold text-[#050505]"
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        >
          IA
        </motion.span>
      </motion.button>
    </div>
  );
}
