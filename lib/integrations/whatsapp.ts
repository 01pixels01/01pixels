import type { LeadInput } from "@/lib/validations";

const WHATSAPP_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const NOTIFY_PHONE = process.env.NOTIFY_WHATSAPP_NUMBER; // e.g. 573001234567

export async function notifyWhatsApp(lead: LeadInput) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID || !NOTIFY_PHONE) {
    console.warn("[WhatsApp] Not configured. Skipping notification.");
    return;
  }

  const serviceEmojis: Record<string, string> = {
    automatizacion: "⚡",
    marketing: "📈",
    seguridad: "🛡️",
    general: "🌐",
  };

  const message = `🔥 *NUEVO LEAD — 01pixels*\n\n👤 *${lead.nombre}*${lead.empresa ? ` (${lead.empresa})` : ""}\n📧 ${lead.email}${lead.telefono ? `\n📱 ${lead.telefono}` : ""}\n\n${serviceEmojis[lead.servicio]} *Interés:* ${lead.servicio}\n💬 *Necesidad:* ${lead.necesidad}\n\n_Fuente: ${lead.fuente}_`;

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: NOTIFY_PHONE,
        type: "text",
        text: { body: message },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp API error: ${err}`);
  }
}
