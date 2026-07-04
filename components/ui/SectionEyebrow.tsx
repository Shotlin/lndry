export function SectionEyebrow({
  children,
  tone = "violet",
}: {
  children: string;
  tone?: "violet" | "onDark";
}) {
  return (
    <p
      className={`font-body text-label font-semibold uppercase tracking-[0.14em] ${
        tone === "onDark" ? "text-lavender-electric" : "text-violet"
      }`}
    >
      {children}
    </p>
  );
}
