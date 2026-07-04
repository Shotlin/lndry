import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  tone?: "neutral" | "violet" | "teal" | "onDark";
  className?: string;
}

const toneClasses: Record<NonNullable<PillProps["tone"]>, string> = {
  neutral: "bg-white text-ink-soft border border-hairline",
  violet: "bg-violet text-white border border-violet",
  teal: "bg-teal-tint text-teal border border-transparent",
  onDark: "bg-white/10 text-white border border-white/20",
};

export function Pill({ children, tone = "neutral", className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-label font-medium font-body ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
