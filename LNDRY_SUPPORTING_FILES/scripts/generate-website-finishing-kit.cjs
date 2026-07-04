const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets/brand/v2/website-finishing');
const overlayDir = path.join(out, 'overlays');
const ogDir = path.join(out, 'og');
const motionDir = path.join(out, 'motion');

for (const dir of [out, overlayDir, ogDir, motionDir]) fs.mkdirSync(dir, { recursive: true });

const C = {
  violet: '#6C63E8',
  deep: '#5046C8',
  electric: '#887CF6',
  lavender: '#EAE8FF',
  bg: '#F4F3FB',
  white: '#FFFFFF',
  ink: '#080F14',
  inkSoft: '#495467',
  muted: '#7E8998',
  border: '#E7E8F0',
  teal: '#0FB5A6',
  tealTint: '#DDF7F3',
  dark: '#080F14',
};

function esc(str) {
  return String(str).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function text(x, y, value, size = 24, fill = C.ink, weight = 700, anchor = 'start') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Sora, Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(value)}</text>`;
}

function pill(x, y, w, h, label, fill = C.white, stroke = C.border, color = C.inkSoft) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}"/>
  ${text(x + w / 2, y + h / 2 + 5, label, 15, color, 700, 'middle')}`;
}

function card(x, y, w, h, r = 24, fill = C.white, stroke = C.border) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
}

function svg(width, height, body, transparent = true) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#433791" flood-opacity=".14"/>
    </filter>
    <linearGradient id="violet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.deep}"/>
    </linearGradient>
  </defs>
  ${transparent ? '' : `<rect width="100%" height="100%" fill="${C.bg}"/>`}
  ${body}
  </svg>`;
}

async function writeSvgPng(name, width, height, body, transparent = true) {
  const svgText = svg(width, height, body, transparent);
  const svgPath = path.join(overlayDir, `${name}.svg`);
  const pngPath = path.join(overlayDir, `${name}.png`);
  const webpPath = path.join(overlayDir, `${name}.webp`);
  fs.writeFileSync(svgPath, svgText, 'utf8');
  await sharp(Buffer.from(svgText)).png({ compressionLevel: 9 }).toFile(pngPath);
  await sharp(Buffer.from(svgText)).webp({ quality: 90, effort: 5 }).toFile(webpPath);
}

async function generateOverlays() {
  await writeSvgPng(
    'careline-thread-overlay',
    1440,
    420,
    `<path d="M42 278 C220 120 390 355 566 205 C735 60 888 320 1058 186 C1188 86 1300 138 1396 82" fill="none" stroke="${C.violet}" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 18" opacity=".92"/>
    <path d="M42 278 C220 120 390 355 566 205 C735 60 888 320 1058 186 C1188 86 1300 138 1396 82" fill="none" stroke="${C.electric}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    ${[42, 566, 1058, 1396].map((x, i) => `<circle cx="${x}" cy="${[278, 205, 186, 82][i]}" r="18" fill="${C.tealTint}" stroke="${C.teal}" stroke-width="3"/><path d="M ${x - 7} ${[278, 205, 186, 82][i]} l 5 6 l 10 -13" fill="none" stroke="${C.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}`,
  );

  await writeSvgPng(
    'marketplace-proof-card-cluster',
    760,
    500,
    `<g filter="url(#softShadow)">
      ${card(80, 56, 470, 152, 24)}
      <circle cx="126" cy="108" r="24" fill="${C.lavender}"/><path d="M117 107 h18 M126 98 v18" stroke="${C.violet}" stroke-width="4" stroke-linecap="round"/>
      ${text(170, 104, 'BrightFold Care', 28, C.ink, 800)}
      ${text(170, 143, '1.1 km · ₹79/kg · 5-6 PM slot', 18, C.inkSoft, 600)}
      ${pill(170, 163, 126, 38, 'Verified', C.tealTint, C.tealTint, C.teal)}
      ${card(178, 244, 500, 172, 24, C.lavender, C.electric)}
      <circle cx="224" cy="304" r="24" fill="${C.white}"/><path d="M215 304 h18 M224 295 v18" stroke="${C.violet}" stroke-width="4" stroke-linecap="round"/>
      ${text(268, 300, 'UrbanPress Studio', 30, C.ink, 800)}
      ${text(268, 342, 'Dry cleaning · Steam press · 6-7 PM', 18, C.inkSoft, 600)}
      ${pill(268, 363, 160, 40, 'Available today', C.tealTint, C.tealTint, C.teal)}
      <rect x="486" y="348" width="128" height="46" rx="14" fill="${C.violet}"/>
      ${text(550, 378, 'Selected', 15, C.white, 800, 'middle')}
    </g>`,
  );

  await writeSvgPng(
    'otp-verified-handoff-card',
    640,
    390,
    `<g filter="url(#softShadow)">
      ${card(62, 40, 516, 304, 28)}
      <circle cx="320" cy="112" r="42" fill="${C.tealTint}" stroke="${C.teal}" stroke-width="4"/>
      <path d="M300 112 l15 16 l31 -38" fill="none" stroke="${C.teal}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      ${text(320, 188, 'OTP handover verified', 32, C.ink, 820, 'middle')}
      ${text(320, 228, 'Pickup and delivery stay auditable', 19, C.inkSoft, 600, 'middle')}
      <rect x="166" y="266" width="308" height="44" rx="14" fill="${C.lavender}"/>
      <circle cx="202" cy="288" r="10" fill="${C.violet}"/>
      <circle cx="246" cy="288" r="10" fill="${C.violet}"/>
      <circle cx="290" cy="288" r="10" fill="${C.violet}"/>
      <circle cx="334" cy="288" r="10" fill="${C.violet}"/>
      <circle cx="438" cy="288" r="12" fill="${C.teal}"/>
    </g>`,
  );

  await writeSvgPng(
    'service-tag-ribbon',
    1040,
    280,
    `<path d="M68 156 C200 84 290 212 426 142 C556 76 652 200 790 122 C872 76 936 92 986 50" fill="none" stroke="${C.violet}" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 15"/>
    ${[
      ['Wash & fold', 92, 132, 'shirt'],
      ['Dry cleaning', 292, 84, 'hanger'],
      ['Steam press', 504, 146, 'iron'],
      ['Shoe care', 716, 96, 'shoe'],
      ['Bag care', 858, 150, 'bag'],
    ].map(([label, x, y, icon]) => `<g filter="url(#softShadow)">
      <rect x="${x}" y="${y}" width="166" height="86" rx="20" fill="${C.white}" stroke="${C.border}"/>
      <circle cx="${Number(x) + 35}" cy="${Number(y) + 42}" r="20" fill="${C.lavender}"/>
      <path d="${icon === 'hanger' ? `M ${Number(x)+25} ${Number(y)+45} q 10 -20 20 0 l 16 18 h -52 z` : icon === 'iron' ? `M ${Number(x)+23} ${Number(y)+51} h 48 l -10 -19 h -27 q -11 0 -11 19 z` : icon === 'shoe' ? `M ${Number(x)+20} ${Number(y)+51} q 25 16 58 0 q -7 20 -58 16 z` : icon === 'bag' ? `M ${Number(x)+22} ${Number(y)+39} h 52 v 32 h -52 z M ${Number(x)+35} ${Number(y)+39} q 13 -22 26 0` : `M ${Number(x)+24} ${Number(y)+28} h 48 v 42 h -48 z`}" fill="none" stroke="${C.violet}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${text(Number(x) + 68, Number(y) + 49, label, 15, C.ink, 800)}
    </g>`).join('')}`,
  );

  await writeSvgPng(
    'scroll-chapter-dots',
    520,
    760,
    `<g filter="url(#softShadow)">
      <rect x="76" y="56" width="106" height="648" rx="42" fill="${C.white}" stroke="${C.border}"/>
      ${['Discover', 'Choose', 'Compare', 'Journey', 'Trust', 'Close'].map((label, i) => {
        const y = 116 + i * 102;
        return `<circle cx="130" cy="${y}" r="${i === 2 ? 18 : 12}" fill="${i === 2 ? C.violet : C.lavender}" stroke="${i === 2 ? C.violet : C.border}" stroke-width="2"/>
        ${i < 5 ? `<line x1="130" y1="${y + 22}" x2="130" y2="${y + 80}" stroke="${C.border}" stroke-width="2"/>` : ''}
        ${text(214, y + 6, label, 22, i === 2 ? C.ink : C.inkSoft, i === 2 ? 820 : 650)}`;
      }).join('')}
    </g>`,
  );

  await writeSvgPng(
    'verified-partner-badge',
    520,
    300,
    `<g filter="url(#softShadow)">
      <rect x="54" y="46" width="412" height="208" rx="34" fill="${C.white}" stroke="${C.border}"/>
      <circle cx="142" cy="150" r="54" fill="${C.tealTint}" stroke="${C.teal}" stroke-width="4"/>
      <path d="M119 151 l17 18 l32 -42" fill="none" stroke="${C.teal}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      ${text(220, 130, 'Verified partner', 31, C.ink, 820)}
      ${text(220, 172, 'Eligible for this address', 19, C.inkSoft, 650)}
      ${pill(220, 194, 146, 40, 'Available', C.tealTint, C.tealTint, C.teal)}
    </g>`,
  );
}

async function generateOg() {
  const storyDir = path.join(root, 'assets/brand/v2/website-story/finals');
  const assets = [
    ['home-og-1200x630.png', 'website-home-hero-indian-handoff-v1.png', 'LNDRY', 'A laundry marketplace that feels handled'],
    ['services-og-1200x630.png', 'website-services-hero-care-specialist-v1.png', 'Services', 'Compare service scope before booking'],
    ['marketplace-og-1200x630.png', 'website-marketplace-hero-vendor-order-v1.png', 'Marketplace', 'Nearby partners, visible proof'],
    ['journey-og-1200x630.png', 'website-how-it-works-careline-journey-v1.png', 'How it works', 'Pickup, processing, OTP handover'],
    ['partners-og-1200x630.png', 'website-partners-operations-system-v1.png', 'Operations', 'Vendor, rider and admin in one system'],
  ];

  for (const [file, image, title, subtitle] of assets) {
    const bg = await sharp(path.join(storyDir, image)).resize({ width: 1200, height: 630, fit: 'cover' }).modulate({ saturation: 0.92 }).png().toBuffer();
    const overlay = Buffer.from(svg(1200, 630, `
      <rect width="1200" height="630" fill="url(#violet)" opacity=".12"/>
      <rect x="0" y="0" width="590" height="630" fill="#F4F3FB" opacity=".92"/>
      <path d="M68 390 C176 285 290 452 402 332 C468 262 528 288 574 232" fill="none" stroke="${C.violet}" stroke-width="6" stroke-linecap="round" stroke-dasharray="11 15" opacity=".75"/>
      <rect x="74" y="76" width="64" height="64" rx="18" fill="${C.violet}"/>
      <path d="M96 97 q 0 24 24 24 h 22" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="145" cy="121" r="5" fill="${C.teal}"/>
      ${text(74, 226, title, 58, C.ink, 880)}
      ${text(76, 302, subtitle, 30, C.inkSoft, 650)}
      <rect x="76" y="476" width="280" height="54" rx="27" fill="${C.violet}"/>
      ${text(216, 511, 'lndry-website.vercel.app', 18, C.white, 780, 'middle')}
    `, true));
    await sharp(bg).composite([{ input: overlay, left: 0, top: 0 }]).png({ compressionLevel: 9 }).toFile(path.join(ogDir, file));
  }
}

async function writeGuidance() {
  const guide = `# LNDRY Website Finishing Kit

Generated on 2026-07-02.

This kit fills the remaining visual layer after the cinematic section assets:

- floating marketplace proof cards
- OTP verified handoff card
- service tag ribbon
- careline thread overlay
- scroll chapter dots
- verified partner badge
- OG/social images for key pages

## Recommended animation use

1. Hero: fade in the careline thread overlay with stroke-dashoffset from 100% to 0.
2. Services: use service-tag-ribbon as a horizontal parallax layer behind service cards.
3. Marketplace: float marketplace-proof-card-cluster over the vendor hero image with a slow y: -8 to +8 loop.
4. How it works: use careline-thread-overlay as the scroll progress path.
5. Trust/CTA: show otp-verified-handoff-card after image reveal, then pulse the teal check once.

## Motion rules

- 180-260ms for UI transitions.
- 700-1100ms for cinematic section reveal.
- Use ease: cubic-bezier(0.16, 1, 0.3, 1).
- Respect prefers-reduced-motion by disabling loops and showing final states.

## Repo placement

Copy this folder to:

\`public/brand/website-finishing/\`

Then reference, for example:

\`\`\`tsx
<Image
  src="/brand/website-finishing/overlays/marketplace-proof-card-cluster.webp"
  alt=""
  width={760}
  height={500}
  className="pointer-events-none absolute right-8 top-16 w-[min(42vw,520px)]"
/>
\`\`\`
`;
  fs.writeFileSync(path.join(out, 'WEBSITE_FINISHING_KIT.md'), guide, 'utf8');
}

async function main() {
  await generateOverlays();
  await generateOg();
  await writeGuidance();
  console.log('LNDRY website finishing kit generated');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
