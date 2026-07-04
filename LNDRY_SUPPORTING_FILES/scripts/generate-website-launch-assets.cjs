const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = process.cwd();
const pack = path.join(root, "assets", "brand", "v2", "website-launch");
const heroDir = path.join(pack, "hero");
const compDir = path.join(pack, "components");
const ogDir = path.join(pack, "og");
const docsDir = path.join(pack, "docs");
const publicDir = path.join(root, "lndry_website", "public", "brand", "website-launch");

for (const dir of [pack, heroDir, compDir, ogDir, docsDir, publicDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const brand = {
  violet: "#6C63E8",
  deep: "#5046C8",
  electric: "#887CF6",
  lavender: "#EAE8FF",
  lavender2: "#F4F3FB",
  teal: "#0FB5A6",
  tealTint: "#DDF7F3",
  ink: "#080F14",
  secondary: "#495467",
  muted: "#7E8998",
  line: "#E7E8F0",
  surface: "#FFFFFF",
};

const esc = (s) => String(s)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function shell(width, height, title, subtitle, body, inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="0.58" stop-color="#F4F3FB"/>
      <stop offset="1" stop-color="#EAE8FF"/>
    </linearGradient>
    <linearGradient id="violet" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${brand.violet}"/>
      <stop offset="1" stop-color="${brand.deep}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#433791" flood-opacity="0.10"/>
    </filter>
    <style>
      .display{font-family:Sora,Inter,Arial,sans-serif;font-size:46px;font-weight:700;letter-spacing:-1.2px;fill:${brand.ink}}
      .title{font-family:Sora,Inter,Arial,sans-serif;font-size:25px;font-weight:700;letter-spacing:-.25px;fill:${brand.ink}}
      .body{font-family:Inter,Arial,sans-serif;font-size:17px;font-weight:500;fill:${brand.secondary}}
      .label{font-family:Inter,Arial,sans-serif;font-size:13px;font-weight:700;fill:${brand.secondary}}
      .caption{font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:700;fill:${brand.muted}}
      .tiny{font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;fill:${brand.muted}}
    </style>
  </defs>
  <rect width="${width}" height="${height}" rx="0" fill="url(#bg)"/>
  <path d="M82 92 C162 42 235 58 304 116 C377 178 470 165 528 102" stroke="${brand.lavender}" stroke-width="22" stroke-linecap="round" opacity=".72"/>
  <path d="M77 ${height - 108} L77 ${height - 58} L127 ${height - 58}" stroke="${brand.violet}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="146" cy="${height - 58}" r="7" fill="${brand.teal}"/>
  <path d="M103 ${height - 86} h18 M103 ${height - 72} h18 M103 ${height - 58} h18" stroke="${brand.deep}" stroke-width="4" stroke-linecap="round"/>
  <text x="72" y="92" class="caption">LNDRY launch asset</text>
  <text x="72" y="148" class="display">${esc(title)}</text>
  <text x="74" y="190" class="body">${esc(subtitle)}</text>
  <text x="74" y="220" class="body">${esc(body)}</text>
  ${inner}
</svg>`;
}

function pill(x, y, w, text, tone = "violet") {
  const fill = tone === "teal" ? brand.tealTint : tone === "lavender" ? brand.lavender : brand.surface;
  const stroke = tone === "teal" ? brand.teal : tone === "violet" ? brand.violet : brand.line;
  const color = tone === "teal" ? brand.teal : tone === "violet" ? brand.deep : brand.secondary;
  return `<rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="${fill}" stroke="${stroke}"/>
  <circle cx="${x + 22}" cy="${y + 19}" r="5" fill="${tone === "teal" ? brand.teal : brand.violet}"/>
  <text x="${x + 38}" y="${y + 24}" class="label" fill="${color}">${esc(text)}</text>`;
}

function card(x, y, w, h, heading, body, extra = "") {
  return `<g filter="url(#soft)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${brand.surface}" stroke="${brand.line}"/>
    <path d="M${x + 24} ${y + 28} L${x + 24} ${y + 52} L${x + 48} ${y + 52}" stroke="${brand.violet}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${x + 59}" cy="${y + 52}" r="5" fill="${brand.teal}"/>
    <text x="${x + 82}" y="${y + 40}" class="title">${esc(heading)}</text>
    <text x="${x + 82}" y="${y + 68}" class="body">${esc(body)}</text>
    ${extra}
  </g>`;
}

const components = [];

components.push({
  name: "smart-recommendation-card",
  title: "Smart partner recommendation",
  subtitle: "Address first, one eligible partner next.",
  body: "Use this instead of a compare-many-vendors section.",
  inner: `
    <g transform="translate(604 108)">
      <rect x="0" y="0" width="520" height="420" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <rect x="34" y="34" width="452" height="58" rx="29" fill="${brand.lavender2}" stroke="${brand.line}"/>
      <text x="62" y="70" class="body">Enter pickup area</text>
      <path d="M64 140 C160 88 286 88 394 148 C440 174 462 214 448 252 C432 296 368 322 292 306 C220 291 175 334 116 312 C42 284 20 186 64 140Z" fill="${brand.lavender}"/>
      <path d="M106 242 C190 188 276 188 398 238" stroke="${brand.violet}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="106" cy="242" r="18" fill="${brand.surface}" stroke="${brand.violet}" stroke-width="5"/>
      <circle cx="398" cy="238" r="18" fill="${brand.tealTint}" stroke="${brand.teal}" stroke-width="5"/>
      <rect x="54" y="316" width="412" height="72" rx="18" fill="${brand.deep}"/>
      <text x="82" y="348" class="label" fill="#fff">Recommended verified partner</text>
      <text x="82" y="374" class="body" fill="#fff">Book pickup</text>
      ${pill(308, 338, 128, "Verified", "teal")}
    </g>`,
});

components.push({
  name: "early-access-form-states",
  title: "Pune early access",
  subtitle: "Lead capture that feels useful, not pushy.",
  body: "Fields match the client request and launch narrative.",
  inner: `
    <g transform="translate(598 96)">
      <rect x="0" y="0" width="526" height="438" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="40" y="58" class="title">Launching soon in Pune</text>
      ${["Name", "Mobile number", "Area"].map((t, i) => `<rect x="40" y="${88 + i * 68}" width="446" height="52" rx="16" fill="${brand.lavender2}" stroke="${brand.line}"/><text x="62" y="${121 + i * 68}" class="body">${t}</text>`).join("")}
      <rect x="40" y="300" width="222" height="54" rx="16" fill="${brand.violet}"/>
      <text x="75" y="334" class="label" fill="#fff">Join early access</text>
      <rect x="292" y="292" width="164" height="72" rx="20" fill="${brand.tealTint}" stroke="${brand.teal}"/>
      <path d="M318 330 l16 16 l36 -42" stroke="${brand.teal}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="310" y="386" class="caption">Success state ready</text>
    </g>`,
});

const areas = ["Baner", "Balewadi", "Wakad", "Hinjewadi", "Kharadi", "Viman Nagar"];
components.push({
  name: "pune-launch-area-grid",
  title: "Pune launch areas",
  subtitle: "Area storytelling for launch sections and SEO pages.",
  body: "Use as a grid, map companion, or page divider.",
  inner: `
    <g transform="translate(598 98)">
      ${areas.map((area, i) => {
        const x = (i % 2) * 258;
        const y = Math.floor(i / 2) * 116;
        return `<rect x="${x}" y="${y}" width="230" height="92" rx="18" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
          <circle cx="${x + 34}" cy="${y + 36}" r="14" fill="${brand.lavender}" stroke="${brand.violet}" stroke-width="4"/>
          <text x="${x + 62}" y="${y + 36}" class="title">${area}</text>
          <text x="${x + 62}" y="${y + 64}" class="caption">Launching soon</text>`;
      }).join("")}
      <path d="M38 288 C146 220 286 216 482 286" stroke="${brand.violet}" stroke-width="7" stroke-linecap="round" opacity=".55"/>
    </g>`,
});

const trust = [
  ["Verified partners", "Partner onboarding proof"],
  ["OTP verification", "Pickup and delivery checks"],
  ["Secure payments", "Clear digital payment path"],
  ["Customer support", "Human help when needed"],
  ["Order status tracking", "Progress without fake live maps"],
  ["Quality ratings", "Feedback signal after orders"],
];
components.push({
  name: "trust-signal-strip",
  title: "Trust signal strip",
  subtitle: "Client trust asks, cleaned for product truth.",
  body: "Use near CTA, footer, service, and checkout lead-ins.",
  inner: `
    <g transform="translate(566 72)">
      ${trust.map(([a, b], i) => {
        const x = (i % 2) * 292;
        const y = Math.floor(i / 2) * 126;
        return card(x, y, 266, 94, a, b, "");
      }).join("")}
    </g>`,
});

const benefits = [
  ["Recurring customers", "Repeat demand from your area"],
  ["More orders", "Better capacity utilization"],
  ["Digital presence", "Your shop appears online"],
  ["Tech support", "Booking and status tools"],
  ["Zero marketing spend", "LNDRY brings demand"],
  ["Grow business", "Expand with measured capacity"],
];
components.push({
  name: "partner-benefit-grid",
  title: "Partner benefit grid",
  subtitle: "For the Partner With Us page.",
  body: "Matches the client’s requested vendor-acquisition story.",
  inner: `
    <g transform="translate(566 72)">
      ${benefits.map(([a, b], i) => {
        const x = (i % 2) * 292;
        const y = Math.floor(i / 2) * 126;
        return card(x, y, 266, 94, a, b, "");
      }).join("")}
    </g>`,
});

components.push({
  name: "partner-lead-form-preview",
  title: "Partner lead form",
  subtitle: "A direct form preview for vendor acquisition.",
  body: "Fields are exactly scoped to the client feedback.",
  inner: `
    <g transform="translate(594 56)">
      <rect width="536" height="488" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="38" y="54" class="title">Become a LNDRY Partner</text>
      ${["Laundry name", "Owner name", "Mobile number", "Email", "Area", "Monthly orders", "Pickup and delivery", "Capacity per day"].map((t, i) => {
        const x = i % 2 === 0 ? 38 : 286;
        const y = 86 + Math.floor(i / 2) * 78;
        return `<rect x="${x}" y="${y}" width="212" height="52" rx="15" fill="${brand.lavender2}" stroke="${brand.line}"/><text x="${x + 18}" y="${y + 33}" class="caption">${t}</text>`;
      }).join("")}
      <rect x="38" y="414" width="240" height="54" rx="16" fill="${brand.violet}"/>
      <text x="68" y="448" class="label" fill="#fff">Become a LNDRY Partner</text>
    </g>`,
});

components.push({
  name: "company-details-card",
  title: "Company details",
  subtitle: "For About Us and legal/footer credibility.",
  body: "Uses the exact entity details from the client PDF.",
  inner: `
    <g transform="translate(574 104)">
      <rect width="548" height="368" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="38" y="58" class="title">LNDRY CARE TECHNOLOGIES PRIVATE LIMITED</text>
      <rect x="38" y="92" width="220" height="40" rx="20" fill="${brand.lavender}"/>
      <text x="60" y="118" class="label">CIN U96010PN2026PTC256972</text>
      <text x="38" y="176" class="body">Registered office</text>
      <text x="38" y="214" class="label">301, FLOOR-3/SHAFT-1, TOWER-H, BRAMHA SKY CITY</text>
      <text x="38" y="244" class="label">Dhanori, Pune - 411015</text>
      <path d="M38 294 h472" stroke="${brand.line}"/>
      ${pill(38, 316, 150, "Pune HQ", "violet")}
      ${pill(208, 316, 170, "Marketplace", "lavender")}
    </g>`,
});

components.push({
  name: "founder-info-placeholder",
  title: "Founder information",
  subtitle: "A premium founder block without inventing biography.",
  body: "Use real founder name, photo, and note before publishing.",
  inner: `
    <g transform="translate(588 96)">
      <rect width="536" height="416" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <circle cx="104" cy="104" r="58" fill="${brand.lavender}" stroke="${brand.violet}" stroke-width="5"/>
      <path d="M78 116 C92 88 118 88 132 116" stroke="${brand.violet}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="104" cy="82" r="20" fill="#fff" stroke="${brand.violet}" stroke-width="5"/>
      <text x="190" y="78" class="title">Founder name</text>
      <text x="190" y="112" class="body">Founder, LNDRY</text>
      ${pill(190, 136, 174, "Pune based", "violet")}
      <rect x="48" y="208" width="440" height="128" rx="20" fill="${brand.lavender2}" stroke="${brand.line}"/>
      <text x="76" y="250" class="body">Add a short human note about why LNDRY exists,</text>
      <text x="76" y="280" class="body">how partner quality is handled, and what launch</text>
      <text x="76" y="310" class="body">customers can expect.</text>
      ${pill(48, 360, 202, "Replace before launch", "teal")}
    </g>`,
});

const legal = ["Privacy Policy", "Terms & Conditions", "Refund & Cancellation", "Delivery Policy"];
components.push({
  name: "legal-policy-card-set",
  title: "Legal page cards",
  subtitle: "A polished entry point for mandatory policies.",
  body: "Four policy tiles for footer, legal hub, or launch checklist.",
  inner: `
    <g transform="translate(592 116)">
      ${legal.map((t, i) => {
        const x = (i % 2) * 252;
        const y = Math.floor(i / 2) * 138;
        return `<rect x="${x}" y="${y}" width="224" height="110" rx="20" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
        <path d="M${x + 28} ${y + 30} h48 M${x + 28} ${y + 50} h70 M${x + 28} ${y + 70} h56" stroke="${brand.violet}" stroke-width="5" stroke-linecap="round"/>
        <text x="${x + 28}" y="${y + 96}" class="label">${esc(t)}</text>`;
      }).join("")}
    </g>`,
});

components.push({
  name: "payment-gateway-readiness-checklist",
  title: "Gateway readiness",
  subtitle: "Visual checklist for trust and payment approval.",
  body: "Use internally or on the legal/about execution board.",
  inner: `
    <g transform="translate(594 86)">
      <rect width="528" height="426" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="38" y="56" class="title">Before payment gateway review</text>
      ${["About page", "Contact details", "Privacy policy", "Terms and conditions", "Refund policy", "Delivery policy"].map((t, i) => `<rect x="38" y="${88 + i * 50}" width="452" height="38" rx="14" fill="${brand.lavender2}" stroke="${brand.line}"/><circle cx="62" cy="${107 + i * 50}" r="9" fill="${brand.tealTint}" stroke="${brand.teal}" stroke-width="3"/><path d="M57 ${107 + i * 50} l4 4 l8 -10" stroke="${brand.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text x="86" y="${113 + i * 50}" class="label">${esc(t)}</text>`).join("")}
      ${pill(38, 386, 184, "Trust foundation", "teal")}
    </g>`,
});

const faqs = [
  "How does LNDRY work?",
  "Who picks up my clothes?",
  "How is a vendor selected?",
  "Can I track my order?",
  "How long does delivery take?",
  "What if clothes are damaged?",
  "How do I contact support?",
  "How do refunds work?",
];
components.push({
  name: "faq-accordion-preview",
  title: "FAQ accordion",
  subtitle: "Client’s exact FAQ coverage, designed as a reusable block.",
  body: "Use after How It Works, Contact, or Legal.",
  inner: `
    <g transform="translate(574 42)">
      <rect width="548" height="520" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      ${faqs.map((t, i) => `<rect x="32" y="${32 + i * 58}" width="484" height="44" rx="14" fill="${i === 0 ? brand.lavender : brand.lavender2}" stroke="${brand.line}"/><text x="52" y="${60 + i * 58}" class="label">${esc(t)}</text><path d="M482 ${56 + i * 58} l8 8 l8 -8" stroke="${brand.violet}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
    </g>`,
});

components.push({
  name: "sticky-navigation-spec",
  title: "Sticky navigation",
  subtitle: "The exact client nav translated into a premium pattern.",
  body: "Home, Services, How It Works, Partners, FAQ, Contact.",
  inner: `
    <g transform="translate(544 178)">
      <rect width="612" height="172" rx="34" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="42" y="62" class="title">LNDRY</text>
      ${["Home", "Services", "How It Works", "Partners", "FAQ", "Contact"].map((t, i) => `<text x="${150 + i * 74}" y="64" class="label">${esc(t)}</text>`).join("")}
      <rect x="414" y="96" width="136" height="48" rx="16" fill="${brand.violet}"/>
      <text x="444" y="126" class="label" fill="#fff">Book Pickup</text>
      <rect x="252" y="96" width="146" height="48" rx="16" fill="#fff" stroke="${brand.violet}"/>
      <text x="274" y="126" class="label" fill="${brand.violet}">Partner With LNDRY</text>
    </g>`,
});

components.push({
  name: "primary-secondary-cta-pair",
  title: "CTA pair",
  subtitle: "Client priority: Book Pickup first, Partner second.",
  body: "Use in hero, close CTA, launch pages, and footer actions.",
  inner: `
    <g transform="translate(592 168)">
      <rect width="536" height="228" rx="30" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="42" y="66" class="title">Ready to use CTA hierarchy</text>
      <rect x="42" y="106" width="190" height="58" rx="17" fill="${brand.violet}"/>
      <text x="88" y="142" class="label" fill="#fff">Book Pickup</text>
      <rect x="252" y="106" width="216" height="58" rx="17" fill="#fff" stroke="${brand.violet}"/>
      <text x="292" y="142" class="label" fill="${brand.violet}">Partner With LNDRY</text>
      ${pill(42, 180, 180, "Conversion first", "violet")}
      ${pill(242, 180, 172, "Vendor growth", "lavender")}
    </g>`,
});

components.push({
  name: "whatsapp-support-floating-cta",
  title: "Floating support CTA",
  subtitle: "Sticky help, without overwhelming the page.",
  body: "Use as the visual spec for a WhatsApp/support button.",
  inner: `
    <g transform="translate(594 164)">
      <rect x="0" y="0" width="520" height="220" rx="34" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <circle cx="86" cy="110" r="46" fill="${brand.tealTint}" stroke="${brand.teal}" stroke-width="4"/>
      <path d="M66 107 C66 88 82 75 101 80 C120 85 130 102 123 120 C117 136 98 144 80 136 L64 142 L70 126 C67 120 66 114 66 107Z" fill="none" stroke="${brand.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="158" y="98" class="title">Need help?</text>
      <text x="158" y="132" class="body">Chat on WhatsApp</text>
      ${pill(158, 154, 154, "Support", "teal")}
    </g>`,
});

components.push({
  name: "testimonials-after-pilot-block",
  title: "Testimonials after pilot",
  subtitle: "A future-proof proof section without fake reviews.",
  body: "Keep hidden until real customer feedback exists.",
  inner: `
    <g transform="translate(568 88)">
      <rect width="562" height="424" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <text x="38" y="58" class="title">Customer stories after pilot</text>
      ${[0,1,2].map((i) => `<rect x="38" y="${92 + i * 96}" width="486" height="74" rx="18" fill="${brand.lavender2}" stroke="${brand.line}"/><circle cx="72" cy="${129 + i * 96}" r="18" fill="${brand.lavender}" stroke="${brand.violet}" stroke-width="3"/><text x="112" y="${122 + i * 96}" class="label">Real review placeholder</text><text x="112" y="${146 + i * 96}" class="caption">Add only after pilot launch or verified order feedback.</text>`).join("")}
      ${pill(38, 370, 206, "Do not fake testimonials", "teal")}
    </g>`,
});

components.push({
  name: "blog-insights-card-set",
  title: "Blog and care guides",
  subtitle: "Future enhancement for SEO and trust content.",
  body: "Use for care education, launch updates, and local pages.",
  inner: `
    <g transform="translate(570 104)">
      ${["Garment care guide", "Pune launch update", "Partner quality notes"].map((t, i) => `<rect x="${i * 188}" y="0" width="164" height="286" rx="22" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/><rect x="${i * 188 + 22}" y="26" width="120" height="86" rx="18" fill="${brand.lavender}"/><path d="M${i * 188 + 46} 72 h72 M${i * 188 + 58} 92 h48" stroke="${brand.violet}" stroke-width="5" stroke-linecap="round"/><text x="${i * 188 + 22}" y="154" class="label">${esc(t)}</text><text x="${i * 188 + 22}" y="186" class="caption">Future content</text><text x="${i * 188 + 22}" y="210" class="caption">SEO support</text>`).join("")}
    </g>`,
});

components.push({
  name: "contact-info-card",
  title: "Contact card",
  subtitle: "A no-fake-data contact information layout.",
  body: "Labels are ready; replace placeholders in code or CMS.",
  inner: `
    <g transform="translate(594 94)">
      <rect width="528" height="404" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      ${["Email", "Phone", "WhatsApp", "Business hours", "Registered office"].map((t, i) => `<rect x="38" y="${38 + i * 66}" width="452" height="48" rx="15" fill="${brand.lavender2}" stroke="${brand.line}"/><circle cx="64" cy="${62 + i * 66}" r="8" fill="${i === 2 ? brand.teal : brand.violet}"/><text x="88" y="${68 + i * 66}" class="body">${t}</text>`).join("")}
    </g>`,
});

components.push({
  name: "seo-location-page-template",
  title: "Location SEO template",
  subtitle: "For Baner, Wakad, Hinjewadi, Kharadi, and more.",
  body: "Keeps local pages visual but avoids fake availability claims.",
  inner: `
    <g transform="translate(584 72)">
      <rect width="540" height="454" rx="28" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
      <rect x="36" y="34" width="468" height="104" rx="22" fill="${brand.lavender}"/>
      <text x="62" y="78" class="title">Laundry service in [Area]</text>
      <text x="62" y="110" class="body">Launching area page structure</text>
      <path d="M58 194 C132 138 252 148 302 210 C350 270 434 234 478 290" stroke="${brand.violet}" stroke-width="8" stroke-linecap="round"/>
      ${areas.slice(0, 4).map((a, i) => pill(44 + (i % 2) * 232, 326 + Math.floor(i / 2) * 54, 178, a, i === 0 ? "teal" : "lavender")).join("")}
    </g>`,
});

components.push({
  name: "future-vision-service-strip",
  title: "Future wardrobe care",
  subtitle: "Phase 3 story for upcoming expansion.",
  body: "Clear future framing for shoes, bags, tailoring, care, repairs.",
  inner: `
    <g transform="translate(556 148)">
      ${["Shoe cleaning", "Bag cleaning", "Tailoring", "Premium garment care", "Repairs"].map((t, i) => {
        const x = i * 108;
        return `<circle cx="${x + 54}" cy="70" r="48" fill="#fff" stroke="${brand.line}" filter="url(#soft)"/>
        <path d="M${x + 34} 66 h42 M${x + 38} 84 h32" stroke="${i === 4 ? brand.teal : brand.violet}" stroke-width="5" stroke-linecap="round"/>
        <text x="${x + 54}" y="146" text-anchor="middle" class="caption">${t}</text>`;
      }).join("")}
    </g>`,
});

async function renderSvgAsset(component) {
  const svg = shell(1200, 640, component.title, component.subtitle, component.body, component.inner);
  const svgPath = path.join(compDir, `${component.name}.svg`);
  const pngPath = path.join(compDir, `${component.name}.png`);
  const webpPath = path.join(compDir, `${component.name}.webp`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  await sharp(pngPath).webp({ quality: 88 }).toFile(webpPath);
  return { svgPath, pngPath, webpPath };
}

async function makeHeroWebps() {
  const heroes = fs.existsSync(heroDir)
    ? fs.readdirSync(heroDir).filter((f) => f.endsWith(".png"))
    : [];
  for (const hero of heroes) {
    await sharp(path.join(heroDir, hero))
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(path.join(heroDir, hero.replace(/\.png$/, ".webp")));
  }
}

async function makeOg(name, title, subtitle, hero) {
  const heroPath = path.join(heroDir, hero);
  const base = fs.existsSync(heroPath)
    ? await sharp(heroPath).resize(1200, 630, { fit: "cover" }).toBuffer()
    : await sharp({ create: { width: 1200, height: 630, channels: 4, background: brand.lavender2 } }).png().toBuffer();
  const overlay = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="#080F14" stop-opacity=".86"/>
        <stop offset=".58" stop-color="#080F14" stop-opacity=".38"/>
        <stop offset="1" stop-color="#080F14" stop-opacity="0"/>
      </linearGradient>
      <style>
        .brand{font-family:Sora,Inter,Arial,sans-serif;font-size:26px;font-weight:800;fill:#fff;letter-spacing:.18em}
        .title{font-family:Sora,Inter,Arial,sans-serif;font-size:70px;font-weight:800;fill:#fff;letter-spacing:-1.5px}
        .sub{font-family:Inter,Arial,sans-serif;font-size:28px;font-weight:600;fill:#EAE8FF}
      </style>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <path d="M84 72 L84 120 L132 120" stroke="#887CF6" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="154" cy="120" r="8" fill="#0FB5A6"/>
    <text x="84" y="184" class="brand">LNDRY</text>
    <text x="84" y="294" class="title">${esc(title)}</text>
    <text x="88" y="346" class="sub">${esc(subtitle)}</text>
  </svg>`;
  await sharp(base).composite([{ input: Buffer.from(overlay), top: 0, left: 0 }]).png().toFile(path.join(ogDir, `${name}.png`));
}

async function makeContactSheet() {
  const thumbs = [
    ...fs.readdirSync(heroDir).filter((f) => f.endsWith(".png")).map((f) => ["hero", f, path.join(heroDir, f)]),
    ...components.map((c) => ["component", `${c.name}.png`, path.join(compDir, `${c.name}.png`)]),
  ];
  const cellW = 420;
  const cellH = 310;
  const cols = 3;
  const rows = Math.ceil(thumbs.length / cols);
  const headerH = 110;
  const width = cols * cellW;
  const height = headerH + rows * cellH;
  const composites = [];
  const header = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${brand.lavender2}"/>
    <text x="42" y="56" font-family="Sora,Inter,Arial" font-size="34" font-weight="800" fill="${brand.ink}">LNDRY website launch asset pack</text>
    <text x="44" y="86" font-family="Inter,Arial" font-size="17" font-weight="600" fill="${brand.secondary}">Client-feedback assets for About, Partners, Contact, FAQ, legal, trust, and Pune launch storytelling.</text>
  </svg>`;
  composites.push({ input: Buffer.from(header), top: 0, left: 0 });
  for (let i = 0; i < thumbs.length; i++) {
    const [type, file, source] = thumbs[i];
    const x = (i % cols) * cellW + 24;
    const y = headerH + Math.floor(i / cols) * cellH + 24;
    const thumb = await sharp(source).resize(372, 210, { fit: "cover" }).png().toBuffer();
    const label = `<svg xmlns="http://www.w3.org/2000/svg" width="372" height="64">
      <rect width="372" height="64" rx="14" fill="#FFFFFF"/>
      <text x="16" y="25" font-family="Inter,Arial" font-size="12" font-weight="800" fill="${type === "hero" ? brand.violet : brand.teal}">${type.toUpperCase()}</text>
      <text x="16" y="48" font-family="Inter,Arial" font-size="14" font-weight="700" fill="${brand.ink}">${esc(file.replace(/\.(png|svg|webp)$/g, ""))}</text>
    </svg>`;
    composites.push({ input: thumb, top: y, left: x });
    composites.push({ input: Buffer.from(label), top: y + 218, left: x });
  }
  await sharp({ create: { width, height, channels: 4, background: brand.lavender2 } })
    .composite(composites)
    .png()
    .toFile(path.join(pack, "website-launch-contact-sheet.png"));
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, item.name);
    const to = path.join(dest, item.name);
    if (item.isDirectory()) copyRecursive(from, to);
    else fs.copyFileSync(from, to);
  }
}

function writeManifest() {
  const heroFiles = fs.readdirSync(heroDir).filter((f) => /\.(png|webp)$/.test(f)).sort();
  const componentFiles = fs.readdirSync(compDir).filter((f) => /\.(svg|png|webp)$/.test(f)).sort();
  const ogFiles = fs.readdirSync(ogDir).filter((f) => /\.png$/.test(f)).sort();
  const manifest = `# LNDRY Website Launch Asset Pack

Generated for the client-feedback pass. No website source code was changed by this pack.

## Asset direction

- Premium, Indian/Pune context, violet-led LNDRY identity.
- Customer flow: address first, LNDRY recommends one eligible nearby partner. Do not present this as a compare-many-vendors experience.
- Teal is used only for verified, support, available, or status cues.
- Avoid unsupported claims like guaranteed quality, live rider map, subscriptions, surge pricing, or loyalty.

## Recommended website placements

| Page or section | Use these assets |
|---|---|
| About Us | \`hero/about-us-company-hero-v1.png\`, \`components/company-details-card.svg\` |
| Partner With Us | \`hero/partner-with-us-growth-hero-v1.png\`, \`components/partner-benefit-grid.svg\`, \`components/partner-lead-form-preview.svg\` |
| Contact Us | \`hero/contact-support-hero-v1.png\`, \`components/contact-info-card.svg\`, \`components/whatsapp-support-floating-cta.svg\` |
| Pune launch / early access | \`hero/pune-launch-early-access-hero-v1.png\`, \`components/early-access-form-states.svg\`, \`components/pune-launch-area-grid.svg\` |
| Marketplace explanation | \`hero/smart-recommended-partner-hero-v1.png\`, \`components/smart-recommendation-card.svg\` |
| FAQ | \`components/faq-accordion-preview.svg\` |
| Legal hub/footer | \`components/legal-policy-card-set.svg\` |
| Trust strip | \`components/trust-signal-strip.svg\` |
| Future vision | \`hero/future-wardrobe-care-hero-v1.png\`, \`components/future-vision-service-strip.svg\` |

## Client-required page/content checklist

- About Us: company intro, mission, vision, why LNDRY, founder info, company details.
- Company details: LNDRY CARE TECHNOLOGIES PRIVATE LIMITED, CIN U96010PN2026PTC256972, registered office at 301, FLOOR-3/SHAFT-1, TOWER-H, BRAMHA SKY CITY, Dhanori, Pune - 411015.
- Partner page: benefits plus form fields for laundry name, owner name, mobile number, email, area, existing monthly orders, pickup and delivery availability, current capacity per day.
- Contact page: email, phone, WhatsApp, registered office, business hours.
- Legal pages: Privacy Policy, Terms & Conditions, Refund & Cancellation Policy, Delivery Policy.
- FAQ: how LNDRY works, pickup, vendor selection, order status, delivery time, damaged clothes, support, refunds.
- Launch areas: Baner, Balewadi, Wakad, Hinjewadi, Kharadi, Viman Nagar.

## Import paths

Assets are mirrored into the Next.js public folder, so the website can reference them like:

\`\`\`tsx
<Image
  src="/brand/website-launch/hero/about-us-company-hero-v1.png"
  alt="LNDRY company and garment care operations"
  width={1600}
  height={900}
/>
\`\`\`

For SVG components:

\`\`\`tsx
<img src="/brand/website-launch/components/trust-signal-strip.svg" alt="LNDRY trust signals" />
\`\`\`

## Hero files

${heroFiles.map((f) => `- \`hero/${f}\``).join("\n")}

## Component files

${componentFiles.map((f) => `- \`components/${f}\``).join("\n")}

## Open Graph files

${ogFiles.map((f) => `- \`og/${f}\``).join("\n")}
`;
  fs.writeFileSync(path.join(root, "WEBSITE_LAUNCH_ASSET_MANIFEST.md"), manifest);
  fs.writeFileSync(path.join(docsDir, "WEBSITE_LAUNCH_ASSET_MANIFEST.md"), manifest);
}

(async () => {
  for (const component of components) await renderSvgAsset(component);
  await makeHeroWebps();
  await makeOg("about-og-1200x630", "About LNDRY", "A careline marketplace built from Pune.", "about-us-company-hero-v1.png");
  await makeOg("partner-og-1200x630", "Partner with LNDRY", "Bring your laundry business online.", "partner-with-us-growth-hero-v1.png");
  await makeOg("contact-og-1200x630", "Contact LNDRY", "Support, office, and business details.", "contact-support-hero-v1.png");
  await makeOg("launch-og-1200x630", "Launching soon in Pune", "Early access across priority areas.", "pune-launch-early-access-hero-v1.png");
  await makeOg("marketplace-og-1200x630", "Recommended partner flow", "One eligible partner after address.", "smart-recommended-partner-hero-v1.png");
  await makeOg("future-og-1200x630", "Urban wardrobe care", "The future LNDRY service vision.", "future-wardrobe-care-hero-v1.png");
  await makeContactSheet();
  writeManifest();
  copyRecursive(pack, publicDir);
  console.log(`Generated ${components.length} component systems, hero WebPs, OG images, contact sheet, and manifest.`);
})();
