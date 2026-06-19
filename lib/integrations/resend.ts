import type { LeadInput, ContactInput } from "@/lib/validations";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "notificaciones@01pixels.com";
const TO_EMAIL = process.env.NOTIFY_EMAIL || "contacto@01pixels.net";

async function sendEmail(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  if (!RESEND_API_KEY) {
    console.warn("[Resend] No API key configured. Email not sent.");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

export async function sendLeadNotificationEmail(lead: LeadInput) {
  const serviceLabels: Record<string, string> = {
    automatizacion: "⚡ Hiperautomatización",
    marketing: "📈 Marketing Digital",
    seguridad: "🛡️ Seguridad Inteligente",
    general: "🌐 General",
  };

  await sendEmail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `🔥 Nuevo Lead: ${lead.nombre} — ${serviceLabels[lead.servicio]}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0b0f;color:#f8faff;padding:32px;border-radius:12px;">
        <h2 style="color:#3b82f6;margin-bottom:24px;">🎯 Nuevo Lead Capturado</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#94a3b8;width:140px;">Nombre</td><td style="padding:8px 0;color:#f1f5f9;font-weight:600;">${lead.nombre}</td></tr>
          ${lead.empresa ? `<tr><td style="padding:8px 0;color:#94a3b8;">Empresa</td><td style="padding:8px 0;color:#f1f5f9;">${lead.empresa}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#3b82f6;">${lead.email}</td></tr>
          ${lead.telefono ? `<tr><td style="padding:8px 0;color:#94a3b8;">Teléfono</td><td style="padding:8px 0;color:#f1f5f9;">${lead.telefono}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#94a3b8;">Servicio</td><td style="padding:8px 0;color:#f1f5f9;">${serviceLabels[lead.servicio]}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Fuente</td><td style="padding:8px 0;color:#f1f5f9;">${lead.fuente}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#111827;border-radius:8px;border-left:4px solid #3b82f6;">
          <p style="color:#94a3b8;margin:0 0 8px;font-size:13px;">NECESIDAD:</p>
          <p style="color:#f1f5f9;margin:0;line-height:1.6;">${lead.necesidad}</p>
        </div>
        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${lead.email}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Responder a ${lead.nombre}</a>
        </div>
        <p style="color:#475569;font-size:12px;margin-top:24px;text-align:center;">01pixels · Lead Management System</p>
      </div>
    `,
  });
}

export async function sendContactEmail(contact: ContactInput) {
  await sendEmail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `📩 Contacto web: ${contact.nombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0b0f;color:#f8faff;padding:32px;border-radius:12px;">
        <h2 style="color:#3b82f6;margin-bottom:24px;">📩 Nuevo Mensaje de Contacto</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#94a3b8;width:120px;">Nombre</td><td style="padding:8px 0;color:#f1f5f9;font-weight:600;">${contact.nombre}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#3b82f6;">${contact.email}</td></tr>
          ${contact.telefono ? `<tr><td style="padding:8px 0;color:#94a3b8;">Teléfono</td><td style="padding:8px 0;color:#f1f5f9;">${contact.telefono}</td></tr>` : ""}
          ${contact.empresa ? `<tr><td style="padding:8px 0;color:#94a3b8;">Empresa</td><td style="padding:8px 0;color:#f1f5f9;">${contact.empresa}</td></tr>` : ""}
        </table>
        <div style="margin-top:20px;padding:16px;background:#111827;border-radius:8px;">
          <p style="color:#f1f5f9;margin:0;line-height:1.6;">${contact.mensaje}</p>
        </div>
        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${contact.email}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Responder</a>
        </div>
      </div>
    `,
  });
}
