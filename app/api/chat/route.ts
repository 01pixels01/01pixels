import { OpenAI } from "openai";
import { SYSTEM_PROMPT } from "@/lib/ai/prompts";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Bad request", { status: 400 });
    }

    const systemWithContext = `${SYSTEM_PROMPT}\n\nContexto actual: El usuario está visitando la página "${pageContext}" del sitio web de 01pixels. Adapta tu saludo y recomendaciones a este contexto.`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemWithContext },
        ...messages.slice(-20), // últimos 20 mensajes para el contexto
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          const data = JSON.stringify({ choices: [{ delta: { content: text } }] });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Chat API Error]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
