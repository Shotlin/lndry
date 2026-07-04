import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "lg" | "md";
  href?: string;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-violet text-white hover:bg-violet-deep active:bg-violet-deep shadow-soft hover:shadow-elevated",
  secondary:
    "bg-white text-violet border border-hairline hover:border-violet",
  ghost: "bg-transparent text-ink-soft hover:text-ink",
};

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  lg: "h-13 px-6 text-base rounded-sm",
  md: "h-11 px-5 text-sm rounded-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold whitespace-nowrap transition-all duration-300 [transition-timing-function:var(--ease-signature)] focus-visible:outline-2 focus-visible:outline-lavender-electric focus-visible:outline-offset-2";

export function Button({
  variant = "primary",
  size = "lg",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
