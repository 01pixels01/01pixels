import { z } from "zod";

export const leadSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto").max(80),
  empresa: z.string().max(100).optional(),
  email: z.string().email("Email inválido"),
  telefono: z
    .string()
    .regex(/^[+\d\s\-()]{7,20}$/, "Teléfono inválido")
    .optional(),
  necesidad: z.string().min(10, "Cuéntanos un poco más").max(1000),
  servicio: z.enum(["automatizacion", "marketing", "seguridad", "general"]),
  fuente: z.enum(["chatbot", "formulario", "landing", "whatsapp"]).default("formulario"),
});

export const contactSchema = z.object({
  nombre: z.string().min(2).max(80),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  servicio: z.enum(["automatizacion", "marketing", "seguridad", "general"]).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
