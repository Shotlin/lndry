"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Download, Loader2, Smartphone } from "lucide-react";
import { FaAndroid } from "react-icons/fa";
import { Container } from "../ui/Container";
import { PhoneFrame } from "../ui/PhoneFrame";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type AppReleaseInfo = {
  app: "CUSTOMER" | "VENDOR";
  appName: string;
  versionName: string;
  versionCode: number;
  fileSizeBytes: number;
  downloadUrl: string;
} | null;

type ReleasesResponse = {
  success: boolean;
  data: { customer: AppReleaseInfo; vendor: AppReleaseInfo };
};

const DOWNLOAD_CARDS = [
  { key: "customer" as const, label: "LNDRY", tagline: "Customer app · book & track pickups" },
  { key: "vendor" as const, label: "Lndry Partner", tagline: "Vendor app · manage orders" },
];

const APP_PREVIEWS = [
  {
    label: "Customer app",
    src: "/brand/mockups/track-order-v1.png",
    alt: "LNDRY customer app showing order tracking",
    title: "Track every care stage",
    body: "Pickup, processing, quality check, out for delivery, and completed in one calm mobile flow.",
    className: "z-20 mx-auto w-44 sm:w-52 lg:w-56",
  },
  {
    label: "Vendor app",
    src: "/brand/vendor-mockups/new-order-v1.png",
    alt: "LNDRY vendor app showing a new order request",
    title: "Accept qualified orders",
    body: "Vendors see service type, customer notes, order value, and handover status before fulfilment.",
    className: "z-30 mx-auto w-48 sm:w-56 lg:w-60 lg:-mt-8",
  },
  {
    label: "Rider app",
    src: "/brand/rider-mockups/assignments-v1.png",
    alt: "LNDRY rider app showing pickup and delivery assignments",
    title: "Verify each handover",
    body: "Delivery employees get route context, OTP checkpoints, and assignment clarity for each order.",
    className: "z-10 mx-auto w-44 sm:w-52 lg:w-56",
  },
];

export function AppLaunchSection() {
  const reducedMotion = useReducedMotion();
  const [releases, setReleases] = useState<ReleasesResponse["data"] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.lndry.in/api/v1/app-releases/all")
      .then((res) => (res.ok ? (res.json() as Promise<ReleasesResponse>) : Promise.reject(res)))
      .then((json) => {
        if (!cancelled) setReleases(json.data);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".app-launch-item", { opacity: 1, y: 0, rotation: 0 });
        return;
      }

      gsap.from(".app-launch-copy > *", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#act-apps",
          start: "top 72%",
        },
      });

      gsap.from(".app-launch-item", {
        opacity: 0,
        y: 56,
        rotation: (index) => [-7, 0, 7][index] ?? 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#act-apps",
          start: "top 68%",
        },
      });

      gsap.to(".app-launch-float", {
        y: (index) => [-14, 18, -10][index] ?? -12,
        rotation: (index) => [-1.5, 1, 1.5][index] ?? 1,
        duration: (index) => [3.4, 3.9, 3.2][index] ?? 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });

      gsap.to(".app-launch-orbit", {
        y: -10,
        scale: 1.04,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    },
    { dependencies: [reducedMotion] },
  );

  return (
    <section
      id="act-apps"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#eae8ff_0%,#f4f3fb_34%,#ffffff_74%)] py-24 md:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-teal/12 blur-3xl" />

      <Container className="relative grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="app-launch-copy max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-violet-deep shadow-soft">
            <Smartphone size={16} />
            Download the apps directly
          </div>
          <h2 className="mt-5 font-display text-headline text-ink">
            One app for customers. One platform powering every order.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft md:text-lg">
            Everything from booking your pickup to tracking your garments and secure delivery happens
            in one connected experience.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-xl border border-ink/10 bg-ink p-3 shadow-elevated">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: "url('/brand/banners/app-release-storebackdrop-v1.png')" }}
            />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {DOWNLOAD_CARDS.map(({ key, label, tagline }) => {
                const release = releases?.[key] ?? null;
                const isReady = !!release;
                return isReady ? (
                  <a
                    key={key}
                    href={release.downloadUrl}
                    className="group flex min-h-17 items-center gap-3 rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-left text-white shadow-soft backdrop-blur-sm transition-colors hover:border-teal/60 hover:bg-ink/85 sm:px-5"
                    aria-label={`Download ${label} for Android, version ${release.versionName}`}
                  >
                    <FaAndroid className="size-7 shrink-0 text-teal" aria-hidden="true" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-[0.62rem] font-semibold tracking-[0.14em] text-white/65">
                        DOWNLOAD FOR ANDROID
                      </span>
                      <span className="font-display text-lg font-semibold leading-tight">{label}</span>
                      <span className="font-body text-[0.68rem] text-white/60">
                        v{release.versionName} · {(release.fileSizeBytes / (1024 * 1024)).toFixed(0)} MB
                      </span>
                    </span>
                    <Download className="size-5 shrink-0 text-white/70 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                ) : (
                  <div
                    key={key}
                    className="group flex min-h-17 items-center gap-3 rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-left text-white shadow-soft backdrop-blur-sm sm:px-5"
                    aria-label={`${label} download ${loadFailed ? "unavailable" : "loading"}`}
                  >
                    <FaAndroid className="size-7 shrink-0 text-white/40" aria-hidden="true" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-[0.62rem] font-semibold tracking-[0.14em] text-white/50">
                        {loadFailed ? "NOT AVAILABLE YET" : "DOWNLOAD FOR ANDROID"}
                      </span>
                      <span className="font-display text-lg font-semibold leading-tight text-white/70">{label}</span>
                      <span className="font-body text-[0.68rem] text-white/50">{tagline}</span>
                    </span>
                    {!loadFailed && <Loader2 className="size-5 shrink-0 animate-spin text-white/40" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 font-body text-sm leading-relaxed text-muted">
            Not on Google Play yet — download the APK directly and install it on your Android
            phone. Once we launch on Play Store, these buttons switch over automatically.
          </p>
        </div>

        <div className="relative">
          <div className="app-launch-orbit absolute left-8 top-8 hidden rounded-full bg-white px-4 py-2 font-body text-xs font-semibold text-violet-deep shadow-soft md:block">
            User app
          </div>
          <div className="app-launch-orbit absolute right-8 top-20 hidden rounded-full bg-teal-tint px-4 py-2 font-body text-xs font-semibold text-ink shadow-soft md:block">
            Vendor app
          </div>
          <div className="app-launch-orbit absolute bottom-10 left-1/2 hidden -translate-x-1/2 rounded-full bg-lavender-soft px-4 py-2 font-body text-xs font-semibold text-violet-deep shadow-soft md:block">
            Delivery app
          </div>

          <div className="grid items-end gap-6 sm:grid-cols-3 lg:gap-0">
            {APP_PREVIEWS.map((preview, index) => (
              <article
                key={preview.label}
                className={`app-launch-item ${index === 0 ? "lg:rotate-[-6deg]" : ""} ${
                  index === 2 ? "lg:rotate-[6deg]" : ""
                }`}
              >
                <div className="app-launch-float">
                  <PhoneFrame
                    src={preview.src}
                    alt={preview.alt}
                    label={preview.label}
                    className={preview.className}
                    priority={index === 1}
                  />
                </div>
                <div className="mt-5 rounded-lg bg-white p-4 shadow-soft sm:hidden">
                  <h3 className="font-display text-lg font-semibold text-ink">{preview.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{preview.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 hidden grid-cols-3 gap-4 sm:grid">
            {APP_PREVIEWS.map((preview) => (
              <article key={preview.title} className="rounded-lg bg-white p-4 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-ink">{preview.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{preview.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
