"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminLoginForm({ nextPath, disabled }: { nextPath: string; disabled: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || isPending) return;

    setIsPending(true);
    setError("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

      if (signInError) {
        setError("We could not sign you in with those details.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Admin sign-in is unavailable right now. Please try again shortly.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5" noValidate>
      <label className="grid gap-2 font-body text-sm font-semibold text-ink-soft">
        Admin email
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={disabled || isPending}
          className="h-12 rounded-sm border border-hairline bg-surface-cool px-4 font-body text-base text-ink outline-none transition-colors focus:border-violet focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="name@lndry.in"
        />
      </label>
      <label className="grid gap-2 font-body text-sm font-semibold text-ink-soft">
        Password
        <input
          required
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={disabled || isPending}
          className="h-12 rounded-sm border border-hairline bg-surface-cool px-4 font-body text-base text-ink outline-none transition-colors focus:border-violet focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Your password"
        />
      </label>
      {error ? <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 font-body text-sm font-semibold text-error">{error}</p> : null}
      <button
        type="submit"
        disabled={disabled || isPending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-violet px-5 font-display text-sm font-semibold text-white shadow-soft transition-colors hover:bg-violet-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? <LockKeyhole size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
        {isPending ? "Signing in…" : "Sign in to operations"}
      </button>
    </form>
  );
}
