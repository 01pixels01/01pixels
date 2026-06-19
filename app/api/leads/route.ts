import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations";
import { sendLeadNotificationEmail } from "@/lib/integrations/resend";
import { notifyWhatsApp } from "@/lib/integrations/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const lead = result.data;

    // Fire-and-forget notifications (don't block the response)
    Promise.allSettled([
      sendLeadNotificationEmail(lead),
      notifyWhatsApp(lead),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Lead notification ${i} failed:`, r.reason);
        }
      });
    });

    return NextResponse.json({ success: true, message: "Lead capturado correctamente" });
  } catch (error) {
    console.error("[Leads API Error]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
