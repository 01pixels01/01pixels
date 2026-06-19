"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { servicio: "general" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error desconocido");
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Error al enviar");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5";
  const errorClass = "text-red-400 text-xs mt-1";

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 border border-emerald-500/20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-bold mb-3">¡Mensaje enviado!</h3>
        <p className="text-slate-400 text-sm mb-6">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass rounded-2xl p-7 border border-white/8 space-y-5"
    >
      <h2 className="text-white font-bold text-xl mb-2">Envíanos un mensaje</h2>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input {...register("nombre")} placeholder="Tu nombre" className={inputClass} />
          {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Empresa</label>
          <input {...register("empresa")} placeholder="Tu empresa" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email *</label>
          <input {...register("email")} type="email" placeholder="tu@empresa.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <input {...register("telefono")} placeholder="+57 317 532 4098" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>¿Qué servicio te interesa?</label>
        <select {...register("servicio")} className={inputClass + " cursor-pointer"}>
          <option value="general">Selecciona un servicio</option>
          <option value="automatizacion">⚡ Hiperautomatización & IA</option>
          <option value="marketing">📈 Marketing Digital</option>
          <option value="seguridad">🛡️ CCTV y Seguridad</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Mensaje *</label>
        <textarea
          {...register("mensaje")}
          placeholder="Cuéntanos sobre tu empresa y qué necesitas lograr..."
          rows={4}
          className={inputClass + " resize-none"}
        />
        {errors.mensaje && <p className={errorClass}>{errors.mensaje.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="glow"
        size="lg"
        className="w-full"
        loading={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </Button>

      <p className="text-center text-slate-600 text-xs">
        Al enviar aceptas nuestra política de privacidad. Sin spam, prometido.
      </p>
    </form>
  );
}
