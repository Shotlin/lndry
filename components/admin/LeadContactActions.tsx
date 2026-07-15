"use client";

import { Check, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function CopyAction({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await copyToClipboard(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-hairline px-3 font-body text-sm font-semibold text-ink transition-colors hover:border-violet hover:text-violet"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Copied" : `Copy ${label}`}
    </button>
  );
}

export function LeadContactActions({ email, phone }: { email: string; phone: string }) {
  const whatsAppNumber = phone.replace(/\D/g, "");

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`mailto:${email}`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-violet px-3 font-body text-sm font-semibold text-white transition-colors hover:bg-violet-deep"
      >
        <Mail size={16} aria-hidden="true" />
        Email
      </a>
      <a
        href={`tel:${phone}`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-hairline px-3 font-body text-sm font-semibold text-ink transition-colors hover:border-violet hover:text-violet"
      >
        <Phone size={16} aria-hidden="true" />
        Call
      </a>
      <a
        href={`https://wa.me/${whatsAppNumber}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-hairline px-3 font-body text-sm font-semibold text-ink transition-colors hover:border-violet hover:text-violet"
      >
        <MessageCircle size={16} aria-hidden="true" />
        WhatsApp
      </a>
      <CopyAction label="email" value={email} />
      <CopyAction label="phone" value={phone} />
    </div>
  );
}
