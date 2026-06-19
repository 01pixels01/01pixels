"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 150,
    suffix: "+",
    label: "Proyectos entregados",
    description: "En automatización, marketing y seguridad",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfacción del cliente",
    description: "Medido en encuestas post-proyecto",
  },
  {
    value: 3,
    suffix: "x",
    label: "ROI promedio",
    description: "Retorno sobre la inversión en el primer año",
  },
  {
    value: 5,
    suffix: "+",
    label: "Años de experiencia",
    description: "Transformando empresas con tecnología",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate);

  return (
    <div className="relative p-6 rounded-2xl glass border border-white/5 hover:border-blue-500/20 transition-all duration-300 group text-center">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="text-4xl sm:text-5xl font-bold mb-2">
          {stat.prefix && (
            <span className="text-slate-400">{stat.prefix}</span>
          )}
          <span className="text-gradient">{animate ? count : 0}</span>
          <span className="text-blue-400">{stat.suffix}</span>
        </div>
        <div className="text-white font-semibold mb-1">{stat.label}</div>
        <div className="text-slate-500 text-sm">{stat.description}</div>
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-[#050508] relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Resultados que{" "}
            <span className="text-gradient">hablan por sí solos</span>
          </h2>
          <p className="text-slate-400">Números reales de proyectos reales.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
