import { NextRequest, NextResponse } from "next/server";

// Proxy al motor de PIXI Social (services/conversations). Servidor→servidor: sin CORS.
// En local apunta a http://localhost:8801; en producción a ventas.01pixels.net (env PIXI_API_URL).
const MOTOR = process.env.PIXI_API_URL ?? "http://localhost:8801";

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = `${MOTOR}/${path.join("/")}${req.nextUrl.search}`;
  const init: RequestInit = { method: req.method, headers: { "content-type": "application/json" } };
  if (req.method !== "GET" && req.method !== "HEAD") init.body = await req.text();
  try {
    const res = await fetch(target, init);
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "motor no disponible" }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
