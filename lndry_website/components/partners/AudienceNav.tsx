"use client";

import { useEffect, useState } from "react";

const AUDIENCES = [
  { id: "audience-vendors", label: "Vendors" },
  { id: "audience-riders", label: "Riders" },
  { id: "audience-admin", label: "Admin" },
];

export function AudienceNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    AUDIENCES.forEach((a, i) => {
      const el = document.getElementById(a.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav aria-label="Audience sections" className="sticky top-28 hidden flex-col gap-1 self-start lg:flex">
      {AUDIENCES.map((a, i) => (
        <a
          key={a.id}
          href={`#${a.id}`}
          className={`rounded-sm px-4 py-3 font-body text-sm font-semibold transition-colors duration-300 ${
            active === i ? "bg-lavender-soft text-violet" : "text-ink-soft hover:text-violet"
          }`}
        >
          {a.label}
        </a>
      ))}
    </nav>
  );
}
