import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import s from "./blueprint.module.css";

// Identidad 01PIXELS: azul 01 #005ED9 · coral #FF7D55 · negro #101114 · hielo #F5F7FA
// Fuentes auto-alojadas (Space Grotesk, Inter, Silkscreen · SIL Open Font License).
const display = localFont({
  variable: "--bp-display",
  display: "swap",
  src: [
    { path: "./fonts/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/space-grotesk-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
});
const body = localFont({
  variable: "--bp-body",
  display: "swap",
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
});
const pixel = localFont({
  variable: "--bp-pixel",
  display: "swap",
  src: [{ path: "./fonts/silkscreen-latin-400-normal.woff2", weight: "400" }],
});

const H = "font-[family-name:var(--bp-display)]";
const PX = "font-[family-name:var(--bp-pixel)]";

const SOLUCIONES = [
  { n: "01", t: "Agentes de IA", d: "Atienden, responden y ejecutan tareas 24/7 con las reglas de tu negocio.", c: "text-[#005ED9]", href: "/hiperautomatizacion" },
  { n: "02", t: "CRM", d: "Todos tus clientes y su historial en un solo lugar.", c: "text-[#005ED9]", href: "/hiperautomatizacion" },
  { n: "03", t: "ERP", d: "Inventario, pedidos y facturación integrados en una operación.", c: "text-[#005ED9]", href: "/hiperautomatizacion" },
  { n: "04", t: "PIXI Social", d: "Tus comentarios y mensajes respondidos con tu voz. Tú apruebas.", c: "text-[#005ED9]", href: "/pixi-social" },
  { n: "05", t: "SEO", d: "Que te encuentren cuando te buscan, sin pagar por cada clic.", c: "text-[#D9532B]", href: "/marketing-digital" },
  { n: "06", t: "Pauta digital", d: "Anuncios en Google y Meta medidos por ventas, no por clics.", c: "text-[#D9532B]", href: "/marketing-digital" },
  { n: "07", t: "Videovigilancia con IA", d: "Cámaras que detectan y avisan, no solo graban.", c: "text-[#101114]", href: "/seguridad-inteligente" },
  { n: "08", t: "Acceso biométrico", d: "Entra quien debe, con registro de cada ingreso.", c: "text-[#101114]", href: "/seguridad-inteligente" },
];

const GUARDIANES = [
  { name: "AURELIUS", title: "Guardián de la IA y la automatización", text: "Agentes de IA, CRM, ERP e integraciones para que tu operación fluya sola.", img: "/assets/oracles/aurelius/hero.webp", alt: "Busto de Aurelius, guardián de la IA, con gafas de sol, rayos y paneles azules", dot: "#3D8BFF", link: "#8DB9FF", href: "/hiperautomatizacion" },
  { name: "LUMINA", title: "Guardiana del marketing y el crecimiento", text: "SEO, pauta, redes y embudos para que tu marca se vea, se recuerde y venda.", img: "/assets/oracles/lumina/hero.webp", alt: "Busto de Lumina, guardiana del marketing, con gafas rosadas y halo de neón", dot: "#FF6FB5", link: "#FF9FCC", href: "/marketing-digital" },
  { name: "AEGIS", title: "Guardián de la seguridad", text: "Videovigilancia con IA, acceso biométrico y sistemas protegidos, de un local a una ciudad.", img: "/assets/oracles/aegis/hero.webp", alt: "Busto de Aegis, guardián de la seguridad, con gafas y escudo dorado", dot: "#D4AF37", link: "#E8C95A", href: "/seguridad-inteligente" },
];

const PASOS = [
  { k: "30 MIN · GRATIS", t: "Diagnóstico", d: "Escuchamos y revisamos tus procesos actuales.", dot: "bg-[#FF7D55]" },
  { k: "1 SEMANA", t: "Estrategia", d: "Un plan con prioridades claras y el resultado esperado.", dot: "bg-[#005ED9]" },
  { k: "2 A 4 SEMANAS", t: "Implementación", d: "Construimos y desplegamos las soluciones.", dot: "bg-[#005ED9]" },
  { k: "1 A 2 SEMANAS", t: "Automatización", d: "Activamos los flujos y entrenamos la IA con tus datos.", dot: "bg-[#005ED9]" },
  { k: "CONTINUO", t: "Escalamiento", d: "Medimos y hacemos crecer lo que funciona.", dot: "bg-[#101114]" },
];

function Kicker({ children, dark = false, color = "#FF7D55" }: { children: React.ReactNode; dark?: boolean; color?: string }) {
  return (
    <div className={`${PX} inline-flex items-center gap-2.5 text-sm ${dark ? "text-[#A5F3FC]" : "text-[#005ED9]"}`}>
      <span className="inline-block h-2.5 w-2.5" style={{ background: color }} aria-hidden="true" />
      {children}
    </div>
  );
}

export function BlueprintHome() {
  return (
    <div className={`${display.variable} ${body.variable} ${pixel.variable} font-[family-name:var(--bp-body)] text-[#101114] antialiased`}>
      {/* HÉROE */}
      <section id="inicio" className={`${s.gridLight} border-b border-[#E3E8EF] pt-24`}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-16 px-6 py-20 sm:px-8 lg:py-24">
          <div className="min-w-0 flex-[1_1_520px]">
            <Kicker>INGENIERÍA + CREATIVIDAD</Kicker>
            <h1 className={`${H} mt-6 text-5xl font-bold leading-none tracking-[-0.035em] sm:text-6xl lg:text-[72px]`}>
              Cada empresa genera datos. <span className="text-[#005ED9]">Nosotros los volvemos decisiones.</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-lg leading-relaxed text-[#3E4552] sm:text-xl">
              Inteligencia artificial, automatización, marketing y seguridad, construidos a la medida de tu empresa y medidos en resultados.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/agendar" className="inline-flex min-h-14 items-center rounded-sm bg-[#005ED9] px-7 text-[17px] font-semibold text-white transition-colors hover:bg-[#004BB0]">
                Agendar diagnóstico gratuito
              </Link>
              <Link href="#como-trabajamos" className="inline-flex min-h-14 items-center px-2 text-[17px] font-semibold text-[#101114] underline underline-offset-4">
                Ver cómo trabajamos
              </Link>
            </div>
            <p className="mt-5 text-sm text-[#5B6472]">30 minutos · Sin costo · Sin contrato de permanencia</p>
          </div>

          {/* PIXI 3D */}
          <div className="flex min-w-0 flex-[1_1_440px] justify-center">
            <div className="relative w-full max-w-[500px]">
              <div className={`${s.gridDark} relative aspect-square overflow-hidden bg-black`}>
                <video
                  className="block h-full w-full object-cover"
                  src="/assets/pixi/pixi-hola.mp4"
                  poster="/assets/pixi/pixi-hola-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="PIXI, el robot de inteligencia artificial de 01PIXELS, saluda y abre los brazos"
                />
                {["left-3.5 top-3.5 border-l-2 border-t-2", "right-3.5 top-3.5 border-r-2 border-t-2", "left-3.5 bottom-3.5 border-l-2 border-b-2", "right-3.5 bottom-3.5 border-r-2 border-b-2"].map((p) => (
                  <span key={p} aria-hidden="true" className={`absolute h-[22px] w-[22px] border-[#22D3EE] ${p}`} />
                ))}
                <div className={`${PX} absolute left-7 top-6 flex items-center gap-2 text-xs text-[#A5F3FC]`}>
                  <span className="inline-block h-2 w-2 bg-[#22C55E]" aria-hidden="true" />
                  PIXI · EN LÍNEA
                </div>
              </div>
              <div className="relative ml-auto -mt-14 w-[86%] border border-[#E3E8EF] bg-white p-5 shadow-[0_18px_40px_rgba(16,17,20,0.14)]">
                <p className="text-base leading-snug">
                  <strong className="font-semibold">Hola, soy PIXI.</strong> La inteligencia de 01PIXELS. ¿Qué quieres transformar hoy?
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {[
                    ["Automatizar procesos", "/hiperautomatizacion"],
                    ["Conseguir más clientes", "/marketing-digital"],
                    ["Mejorar seguridad", "/seguridad-inteligente"],
                  ].map(([label, href]) => (
                    <Link key={href} href={href} className="inline-flex min-h-11 items-center border border-[#C9D2DE] px-3.5 text-sm font-medium text-[#101114] hover:border-[#005ED9] hover:text-[#005ED9]">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              <span aria-hidden="true" className="absolute -left-[18px] -top-[18px] h-9 w-9 bg-[#FF7D55]" />
              <span aria-hidden="true" className="absolute -top-[18px] left-[18px] h-[18px] w-[18px] bg-[#005ED9]" />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section id="soluciones" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[640px]">
              <div className={`${PX} text-sm text-[#005ED9]`}>EL ECOSISTEMA</div>
              <h2 className={`${H} mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl`}>Ocho soluciones. Un solo sistema que trabaja contigo.</h2>
            </div>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-[#3E4552]">Empieza por lo que más te duele hoy. Todo lo demás se conecta después, sin volver a empezar.</p>
          </div>
          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-[#E3E8EF] bg-[#E3E8EF]">
            {SOLUCIONES.map((x) => (
              <Link key={x.n} href={x.href} className="group block min-h-[200px] bg-white px-7 py-8 transition-colors hover:bg-[#F5F7FA]">
                <div className={`${PX} text-[28px] ${x.c}`}>{x.n}</div>
                <h3 className={`${H} mb-2 mt-5 text-[22px] font-semibold text-[#101114] group-hover:text-[#005ED9]`}>{x.t}</h3>
                <p className="text-[15px] leading-relaxed text-[#3E4552]">{x.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PIXI EN ACCIÓN */}
      <section id="pixi-en-accion" className="bg-[#0B0C0F] text-[#F5F7FA]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 py-24 sm:px-8">
          <div className="min-w-0 flex-[1_1_360px]">
            <Kicker dark color="#22D3EE">PIXI EN ACCIÓN</Kicker>
            <h2 className={`${H} mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px]`}>Tus sistemas conectados, operando mientras tú decides.</h2>
            <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-[#A7ADB7]">PIXI orquesta flujos entre tus aplicaciones, tus datos y tu equipo, con tecnología empresarial como Appian. Cada paso queda medido.</p>
            <Link href="/hiperautomatizacion" className="mt-7 inline-flex min-h-[52px] items-center rounded-sm bg-white px-6 text-base font-semibold text-[#101114] hover:bg-[#E6EEFB]">
              Ver automatización
            </Link>
          </div>
          <div className="min-w-0 flex-[1.4_1_520px]">
            <div className="relative border border-[#23262E] bg-black">
              <video
                className="block aspect-video w-full object-cover"
                src="/assets/pixi/pixi-accion.mp4"
                poster="/assets/pixi/pixi-accion-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="PIXI conecta aplicaciones y tableros de datos en un flujo de automatización holográfico"
              />
              <div className={`${PX} absolute bottom-4 left-4 border border-[#23262E] bg-[rgba(11,12,15,0.82)] px-3 py-2.5 text-[11px] text-[#A5F3FC]`}>FLUJO: APPS → DATOS → INTEGRACIÓN</div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARDIANES */}
      <section id="guardianes" className={`${s.gridDark} text-[#F5F7FA]`}>
        <div className="mx-auto max-w-[1240px] px-6 py-28 sm:px-8 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[680px]">
              <div className={`${PX} text-sm text-[#A7ADB7]`}>EL PANTEÓN 01</div>
              <h2 className={`${H} mt-4 text-5xl font-bold leading-none tracking-[-0.035em] text-white sm:text-[56px]`}>Los guardianes de tu empresa.</h2>
            </div>
            <p className="max-w-[400px] text-[17px] leading-relaxed text-[#A7ADB7]">Lo clásico da confianza. Lo nuevo da velocidad. Cada guardián cuida un frente de tu negocio.</p>
          </div>
          <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {GUARDIANES.map((g) => (
              <article key={g.name} className="border border-[#23262E] bg-[#121419]">
                <div className="relative aspect-square">
                  <Image src={g.img} alt={g.alt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-top" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-block h-3 w-3" style={{ background: g.dot }} aria-hidden="true" />
                    <span className={`${PX} text-[22px] text-white`}>{g.name}</span>
                  </div>
                  <p className={`${H} mt-3 text-[19px] font-semibold text-white`}>{g.title}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#A7ADB7]">{g.text}</p>
                  <Link href={g.href} className="mt-3 inline-flex min-h-11 items-center text-[15px] font-semibold underline-offset-4 hover:underline" style={{ color: g.link }}>
                    Conocer a {g.name.charAt(0) + g.name.slice(1).toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PIXI SOCIAL */}
      <section id="pixi-social" className={`${s.gridLight} border-b border-[#E3E8EF]`}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-16 px-6 py-28 sm:px-8">
          <div className="min-w-0 flex-[1_1_460px]">
            <Kicker>NUEVO · PIXI SOCIAL</Kicker>
            <h2 className={`${H} mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-[52px]`}>Tus redes responden solas. Tú solo apruebas.</h2>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-[#3E4552]">PIXI redacta cada respuesta en Facebook, Instagram, WhatsApp y TikTok con la voz de tu marca y tus datos reales. Nada sale sin tu visto bueno.</p>
            <ol className="mt-9 flex flex-col gap-5">
              {[
                ["01", "Alguien comenta o escribe.", "Todo llega a una sola bandeja, con su hilo completo.", "bg-[#005ED9] text-white"],
                ["02", "PIXI prepara la respuesta.", "Responde en público y sigue la venta en privado, citando de dónde sale cada dato.", "bg-[#005ED9] text-white"],
                ["03", "Tú apruebas. PIXI aprende.", "Un clic y sale. Si la editas, aprende tu estilo.", "bg-[#FF7D55] text-[#101114]"],
              ].map(([n, t, d, c]) => (
                <li key={n} className="flex items-start gap-4">
                  <span className={`${PX} grid h-10 w-10 flex-none place-items-center text-[15px] ${c}`}>{n}</span>
                  <div>
                    <strong className={`${H} text-lg font-semibold`}>{t}</strong>
                    <p className="text-[15px] leading-relaxed text-[#3E4552]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/pixi-social" className="mt-9 inline-flex min-h-[52px] items-center rounded-sm border-2 border-[#101114] px-6 text-base font-semibold text-[#101114] hover:bg-[#101114] hover:text-white">
              Probar la demo
            </Link>
          </div>
          <div className="flex min-w-0 flex-[1_1_440px] justify-center">
            <div className="w-full max-w-[480px] border border-[#DDE3EB] bg-white shadow-[0_24px_60px_rgba(16,17,20,0.10)]" aria-label="Ejemplo de la bandeja de PIXI Social">
              <div className="flex items-center gap-3 border-b border-[#EEF1F5] px-5 py-4">
                <Image src="/pixi-robot.png" alt="" width={32} height={40} className="h-10 w-8 bg-[#1B1D22] object-contain" aria-hidden="true" />
                <div className="leading-tight">
                  <div className="text-[15px] font-semibold">Bandeja de PIXI</div>
                  <div className="text-[13px] text-[#5B6472]">3 respuestas esperan tu visto bueno</div>
                </div>
                <span className={`${PX} ml-auto bg-[#EAF2FF] px-2 py-1.5 text-[11px] text-[#004BB0]`}>EJEMPLO</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFE3D9] text-sm font-semibold text-[#8A2E12]" aria-hidden="true">CL</span>
                  <div className="leading-tight">
                    <div className="text-[15px] font-semibold">Cliente de ejemplo</div>
                    <div className="text-[13px] text-[#5B6472]">comentó tu Reel · Instagram</div>
                  </div>
                </div>
                <div className="mt-3.5 bg-[#F5F7FA] px-3.5 py-3 text-[15px] text-[#3E4552]">«Hola, me interesa. ¿Me pasan info y precios?»</div>
                <div className="mt-2.5 border border-[#CFE0FA] bg-[#F4F8FF] p-3.5 text-[15px] leading-relaxed">
                  <div className={`${PX} mb-1.5 text-[11px] text-[#004BB0]`}>BORRADOR DE PIXI</div>
                  «¡Hola! Con gusto. En 01PIXELS hacemos IA, automatización, marketing y seguridad para empresas. Te escribo por privado para darte el detalle. ¿Qué te gustaría lograr?»
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#3E4552]">
                  <span className="border border-[#DDE3EB] px-2.5 py-1.5">Fuente: servicios de 01pixels.net</span>
                  <span className="border border-[#DDE3EB] px-2.5 py-1.5">Sigue por DM</span>
                </div>
                <div className="mt-4 flex gap-2.5" aria-hidden="true">
                  <span className="flex min-h-12 flex-1 items-center justify-center rounded-sm bg-[#005ED9] text-[15px] font-semibold text-white">Aprobar y enviar</span>
                  <span className="flex min-h-12 items-center rounded-sm border border-[#C9D2DE] px-4 text-[15px] font-semibold">Editar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="como-trabajamos" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:px-8 lg:py-28">
          <div className="max-w-[680px]">
            <div className={`${PX} text-sm text-[#005ED9]`}>CÓMO TRABAJAMOS</div>
            <h2 className={`${H} mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl`}>De la primera conversación a resultados, paso a paso.</h2>
          </div>
          <ol className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t-2 border-[#101114]">
            {PASOS.map((p) => (
              <li key={p.t} className="pr-6 pt-7">
                <div className={`-mt-9 h-3.5 w-3.5 ${p.dot}`} aria-hidden="true" />
                <div className={`${PX} mt-7 text-[13px] text-[#5B6472]`}>{p.k}</div>
                <h3 className={`${H} mb-2 mt-2 text-[22px] font-semibold`}>{p.t}</h3>
                <p className="text-[15px] leading-relaxed text-[#3E4552]">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUIÉN ESTÁ DETRÁS */}
      <section id="nosotros" className="border-y border-[#E3E8EF] bg-[#F5F7FA]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-16 px-6 py-24 sm:px-8 lg:py-28">
          <div className="min-w-0 flex-[1_1_380px]">
            <div className="relative aspect-[4/5] max-w-[440px] bg-[#4A4C52]">
              <Image src="/assets/team/jair-cortes.jpg" alt="Jair Cortes, fundador y CEO de 01PIXELS, con saco azul oscuro y camisa blanca" fill sizes="(max-width: 768px) 100vw, 440px" className="object-cover" />
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-12 w-12 bg-[#FF7D55]" />
              <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 bg-[#005ED9]" />
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_480px]">
            <div className={`${PX} text-sm text-[#005ED9]`}>QUIÉN ESTÁ DETRÁS</div>
            <blockquote className={`${H} mt-5 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[40px]`}>«La tecnología no reemplaza el criterio. Lo hace más rápido.»</blockquote>
            <p className="mt-7 max-w-[560px] text-[17px] leading-relaxed text-[#3E4552]">Somos un equipo de ingenieros y creativos. Diseñamos cada solución con las personas que la van a usar y respondemos por los resultados después de la entrega.</p>
            <div className="mt-8 flex items-center gap-3.5">
              <span className="inline-block h-11 w-2 bg-[#005ED9]" aria-hidden="true" />
              <div className="leading-snug">
                <div className="text-[17px] font-semibold">Jair Cortes</div>
                <div className="text-[15px] text-[#5B6472]">Founder &amp; CEO · Ingeniero de Sistemas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="agendar" className={`${s.gridBlue} text-white`}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-12 px-6 py-28 sm:px-8">
          <div className="min-w-0 flex-[1_1_560px]">
            <h2 className={`${H} text-5xl font-bold leading-none tracking-[-0.035em] text-white sm:text-[64px]`}>El primer paso es una conversación.</h2>
            <p className="mt-6 max-w-[540px] text-[19px] leading-relaxed text-[#E6EEFB]">Diagnóstico gratuito de 30 minutos. Te decimos qué guardián necesita tu empresa y por dónde empezar.</p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/agendar" className="inline-flex min-h-[60px] items-center rounded-sm bg-[#FF7D55] px-8 text-[17px] font-bold text-[#101114] hover:bg-[#FF9472]">Agendar diagnóstico</Link>
            <Link href="/contacto" className="inline-flex min-h-[60px] items-center rounded-sm border-2 border-white px-7 text-[17px] font-semibold text-white hover:bg-white hover:text-[#005ED9]">Escribirnos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
