"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Send, Minimize2, User } from "lucide-react";
import { getContextualGreeting } from "@/lib/ai/prompts";
import { PIXIHead } from "@/components/experience/PIXIHead";

function PIXIOrbitIcon({ size = 40 }: { size?: number }) {
  const r = size / 2;
  const dots = [
    { angle: 0,   color: "#00E5FF", delay: "0s",    orbit: r * 0.72 },
    { angle: 120, color: "#7C3AED", delay: "0.15s", orbit: r * 0.72 },
    { angle: 240, color: "#00FF88", delay: "0.30s", orbit: r * 0.72 },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Core nucleus */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          background: "radial-gradient(circle, #00E5FF 0%, #7C3AED 100%)",
          boxShadow: "0 0 10px rgba(0,229,255,0.7), 0 0 20px rgba(124,58,237,0.4)",
        }}
      />

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-[#00E5FF]/20"
        style={{ width: size * 0.88, height: size * 0.88 }}
      />

      {/* Orbiting dots — CSS animation via keyframes injected inline */}
      <style>{`
        @keyframes pixi-orbit {
          from { transform: rotate(0deg) translateX(${size * 0.36}px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(${size * 0.36}px) rotate(-360deg); }
        }
      `}</style>

      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.18,
            height: size * 0.18,
            background: d.color,
            boxShadow: `0 0 6px ${d.color}`,
            animation: `pixi-orbit ${1.8 + i * 0.2}s linear infinite`,
            animationDelay: d.delay,
            transformOrigin: "center center",
            transform: `rotate(${d.angle}deg) translateX(${size * 0.36}px) rotate(-${d.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = getContextualGreeting(pathname);
      setMessages([
        {
          id: "init",
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [open, messages.length, pathname]);

  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open, minimized]);

  // Show pulse after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowPulse(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Detect lead data in assistant response and send to API
  const detectAndCaptureLead = useCallback(async (allMessages: Message[]) => {
    const fullConversation = allMessages.map(m => m.content).join(" ");
    const emailMatch = fullConversation.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = fullConversation.match(/\b(3\d{9}|\+57\d{10}|57\d{10})\b/);
    const nameMatch = fullConversation.match(/(?:me llamo|soy|llámame|mi nombre es)\s+([A-ZÁÉÍÓÚa-záéíóú]+(?:\s+[A-ZÁÉÍÓÚa-záéíóú]+)?)/i);

    if (emailMatch && phoneMatch) {
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameMatch?.[1] || "Lead desde PIXI",
            email: emailMatch[0],
            phone: phoneMatch[0],
            service: "Consulta vía PIXI Chat",
            message: allMessages.slice(-6).map(m => `${m.role === "user" ? "Cliente" : "PIXI"}: ${m.content}`).join("\n"),
          }),
        });
      } catch {
        // silent fail
      }
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          pageContext: pathname,
        }),
      });

      if (!res.ok) throw new Error("Error en la respuesta");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.delta?.content || "";
                if (text) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id
                        ? { ...m, content: m.content + text }
                        : m
                    )
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      }
      // After streaming, check if lead data was captured
      setMessages((prev) => {
        detectAndCaptureLead(prev);
        return prev;
      });

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Lo siento, hubo un error. Por favor escríbenos directamente a contacto@01pixels.net o por WhatsApp.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, pathname, detectAndCaptureLead]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickOptions = [
    "Quiero automatizar mis procesos",
    "Necesito marketing digital",
    "Quiero cámaras de seguridad",
    "¿Cuánto cuestan sus servicios?",
  ];

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300",
            minimized ? "h-14" : "h-[540px]"
          )}
        >
          <div className="flex flex-col h-full glass rounded-2xl border border-blue-500/20 shadow-[0_0_48px_rgba(0,0,0,0.8),0_0_24px_rgba(59,130,246,0.15)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#00E5FF]/10 to-[#7C3AED]/10 border-b border-white/5">
              <div className="relative">
                <PIXIHead size={40} trackLocal />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0b14]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">PIXI</p>
                <p className="text-xs text-emerald-400">Asesor virtual · En línea</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Minimizar"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-2.5",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex-shrink-0 mt-0.5">
                          <PIXIHead size={28} />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-white/5 text-slate-200 border border-white/8 rounded-bl-sm"
                        )}
                      >
                        {msg.content || (
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                          </span>
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Quick options (only at start) */}
                  {messages.length === 1 && (
                    <div className="flex flex-col gap-2 mt-2">
                      <p className="text-xs text-slate-500 text-center">
                        Opciones rápidas:
                      </p>
                      {quickOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setInput(opt);
                            setTimeout(() => sendMessage(), 50);
                          }}
                          className="text-left text-xs px-3 py-2 rounded-xl border border-blue-500/20 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe tu mensaje..."
                      disabled={loading}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                      aria-label="Enviar mensaje"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-600 mt-2">
                    PIXI · Asesor IA de 01pixels • Respuesta en segundos
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating PIXI button */}
      <button
        onClick={() => {
          setOpen(!open);
          setShowPulse(false);
          setMinimized(false);
        }}
        className={cn(
          "fixed bottom-6 right-4 sm:right-6 z-50 w-16 h-16 rounded-2xl bg-[#0d0d0d] border border-[#00E5FF]/25 flex items-center justify-center shadow-[0_0_32px_rgba(0,229,255,0.2)] hover:shadow-[0_0_48px_rgba(0,229,255,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 hover:border-[#00E5FF]/50",
          open && "rotate-0"
        )}
        aria-label="Abrir chat con PIXI, asesor IA de 01pixels"
      >
        {open ? (
          <X className="w-6 h-6 text-[#00E5FF]" />
        ) : (
          <PIXIHead size={48} trackLocal />
        )}
        {showPulse && !open && (
          <>
            <span className="absolute inset-0 rounded-2xl bg-[#00E5FF] animate-ping opacity-10" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#00FF88] rounded-full border-2 border-[#050505] flex items-center justify-center">
              <span className="text-[8px] font-bold text-[#050505]">IA</span>
            </span>
          </>
        )}
      </button>
    </>
  );
}
