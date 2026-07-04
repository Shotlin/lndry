/**
 * Shared motion language. Every animated section pulls from here instead of
 * inventing its own easing/timing so the whole site reads as one direction.
 */
export const motionTokens = {
  easeSignature: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeScrub: "none",
  staggerStep: 0.08,
  durationBase: 0.6,
} as const;
