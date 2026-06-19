import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/integrations/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }

    await sendContactEmail(result.data);

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente. Te contactaremos en menos de 24 horas.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
  }
}
