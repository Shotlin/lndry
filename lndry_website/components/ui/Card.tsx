import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "violet";
}

const toneClasses: Record<NonNullable<CardProps["tone"]>, string> = {
  light: "bg-white border border-hairline",
  dark: "bg-ink-raised border border-ink-line",
  violet: "bg-violet border border-violet text-white",
};

export function Card({ children, className = "", tone = "light" }: CardProps) {
  return (
    <div className={`rounded-lg ${toneClasses[tone]} ${className}`}>
      {children}
    </div>
  );
}
