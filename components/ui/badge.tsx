import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "green" | "purple" | "orange" | "white";
}

export function Badge({
  className,
  variant = "blue",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    white: "bg-white/5 text-white/70 border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase border rounded-full px-3 py-1",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
