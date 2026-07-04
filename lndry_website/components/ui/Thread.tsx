interface ThreadProps {
  className?: string;
  opacity?: number;
  flip?: boolean;
}

/**
 * The recurring careline motif — an L-seam curve with three stitch ticks and a thread node.
 * Purely decorative background layer, reused across header/footer/section backgrounds so the
 * same brand mark quietly threads through the whole site instead of living in one hero graphic.
 */
export function Thread({ className = "", opacity = 0.14, flip = false }: ThreadProps) {
  return (
    <svg
      viewBox="0 0 200 600"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ opacity, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M40 0 V180 C40 230 78 268 128 268 H200 M128 268 C78 268 40 306 40 356 V600"
        stroke="var(--color-violet)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M20 40 H32 M20 80 H32 M20 120 H32" stroke="var(--color-violet)" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M20 480 H32 M20 520 H32 M20 560 H32" stroke="var(--color-violet)" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="128" cy="268" r="5" fill="var(--color-teal)" />
    </svg>
  );
}
