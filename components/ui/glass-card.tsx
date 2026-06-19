"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlassCard({
  className,
  hover = false,
  glow = false,
  padding = "md",
  children,
  ...props
}: GlassCardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl glass",
        paddings[padding],
        hover && "glass-hover cursor-pointer",
        glow && "shadow-[0_0_32px_rgba(59,130,246,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlowBorder({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative rounded-2xl", className)} {...props}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/10 blur-sm" />
      <div className="relative rounded-2xl border border-blue-500/20 glass">
        {children}
      </div>
    </div>
  );
}
