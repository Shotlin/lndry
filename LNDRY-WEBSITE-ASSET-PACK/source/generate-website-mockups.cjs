const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets/brand/v2/website/exports');
fs.mkdirSync(outDir, { recursive: true });

const C = {
  violet: '#6C63E8',
  violetDeep: '#5046C8',
  lavender: '#EAE8FF',
  lavender2: '#F4F3FB',
  electric: '#887CF6',
  teal: '#0FB5A6',
  tealTint: '#DDF7F3',
  ink: '#080F14',
  ink2: '#495467',
  muted: '#7E8998',
  border: '#E7E8F0',
  white: '#FFFFFF',
  cool: '#F7F8FC',
  warn: '#F3A929',
};

const A = {
  logo: 'assets/brand/v2/logos/wordmark-horizontal.svg',
  symbol: 'assets/brand/v2/logos/careline-symbol.svg',
  hero: 'assets/brand/v2/illustrations/journey-home-relief-v2.png',
  pickup: 'assets/brand/v2/illustrations/journey-pickup-v1.png',
  process: 'assets/brand/v2/illustrations/journey-processing-v1.png',
  quality: 'assets/brand/v2/illustrations/journey-quality-check-v1.png',
  package: 'assets/brand/v2/illustrations/journey-packaging-v1.png',
  delivery: 'assets/brand/v2/illustrations/journey-delivery-v1.png',
  bag: 'assets/brand/v2/illustrations/service-bag-care-v1.png',
  washFold: 'assets/brand/v2/illustrations/service-wash-fold-v1.png',
  washIron: 'assets/brand/v2/illustrations/service-wash-iron-v1.png',
  dry: 'assets/brand/v2/illustrations/service-dry-cleaning-v1.png',
  steam: 'assets/brand/v2/illustrations/service-steam-press-v1.png',
  shoe: 'assets/brand/v2/illustrations/service-shoe-care-v1.png',
  premium: 'assets/brand/v2/illustrations/service-premium-garment-care-v1.png',
  tailoring: 'assets/brand/v2/illustrations/service-tailoring-v1.png',
  curtain: 'assets/brand/v2/illustrations/service-curtain-cleaning-v1.png',
  carpet: 'assets/brand/v2/illustrations/service-carpet-cleaning-v1.png',
  blanket: 'assets/brand/v2/illustrations/service-blanket-cleaning-v1.png',
  mobileHome: 'assets/brand/v2/mockups/location-serviceability-v1.png',
  mobileReview: 'assets/brand/v2/mockups/review-order-v1.png',
  mobileTrack: 'assets/brand/v2/mockups/track-order-v1.png',
  mobileDelivery: 'assets/brand/v2/mockups/delivery-otp-v1.png',
  admin: 'assets/brand/v2/admin-mockups/dashboard-v1.png',
  vendor: 'assets/brand/v2/vendor-mockups/new-order-v1.png',
  rider: 'assets/brand/v2/rider-mockups/assignments-v1.png',
  bannerCompare: 'assets/brand/v2/banners/compare-partners-v1.png',
  bannerCare: 'assets/brand/v2/banners/care-process-v1.png',
  storePlaceholder: 'assets/brand/v2/deployment/vendor-store-placeholder-640.png',
};

function p(rel) { return path.join(root, rel); }
function esc(s) { return String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch])); }
function wrapText(text, chars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > chars && line) {
      lines.push(line);
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}
function text(x, y, copy, size = 16, fill = C.ink, weight = 500, width = 48, lh = 1.28, anchor = 'start') {
  const lines = Array.isArray(copy) ? copy : wrapText(copy, width);
  return `<text x="${x}" y="${y}" font-family="Sora, Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">
    ${lines.map((l, i) => `<tspan x="${x}" dy="${i ? size * lh : 0}">${esc(l)}</tspan>`).join('')}
  </text>`;
}
function pill(x, y, w, h, label, fill = C.white, stroke = C.border, color = C.ink2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}"/>
  ${text(x + w / 2, y + h / 2 + 5, label, 14, color, 650, 30, 1.2, 'middle')}`;
}
function btn(x, y, w, h, label, fill = C.violet, color = C.white) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}"/>
  ${text(x + w / 2, y + h / 2 + 6, label, 15, color, 700, 30, 1.2, 'middle')}`;
}
function card(x, y, w, h, r = 18, fill = C.white, stroke = C.border) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
}
function careline(x, y, scale = 1, color = C.violet) {
  return `<path d="M ${x} ${y} q 0 ${26 * scale} ${26 * scale} ${26 * scale} h ${52 * scale}" fill="none" stroke="${color}" stroke-width="${3 * scale}" stroke-linecap="round"/>
  <circle cx="${x + 84 * scale}" cy="${y + 26 * scale}" r="${4 * scale}" fill="${C.teal}"/>
  <path d="M ${x + 19 * scale} ${y + 9 * scale} h ${9 * scale} M ${x + 19 * scale} ${y + 19 * scale} h ${9 * scale} M ${x + 19 * scale} ${y + 29 * scale} h ${9 * scale}" stroke="${color}" stroke-width="${2 * scale}" stroke-linecap="round"/>`;
}
function header(w, transparent = false) {
  const pad = w >= 1000 ? 88 : 28;
  const nav = w >= 900 ? `
    ${text(pad + 235, 58, 'Services', 15, C.ink2, 650, 20)}
    ${text(pad + 330, 58, 'Marketplace', 15, C.ink2, 650, 20)}
    ${text(pad + 462, 58, 'How it works', 15, C.ink2, 650, 20)}
    ${text(pad + 590, 58, 'Partners', 15, C.ink2, 650, 20)}
    ${btn(w - pad - 160, 31, 160, 46, 'Book pickup')}
  ` : `
    ${pill(w - pad - 114, 29, 114, 44, 'Menu', C.white, C.border, C.violet)}
  `;
  return `${transparent ? '' : `<rect x="0" y="0" width="${w}" height="92" fill="${C.white}" opacity=".92"/>`}
  <rect x="${pad}" y="30" width="46" height="46" rx="12" fill="${C.violet}"/>
  ${careline(pad + 14, 41, .28, C.white)}
  ${text(pad + 60, 58, 'LNDRY', 22, C.ink, 800, 10)}
  ${nav}`;
}
async function img(rel, left, top, width, opts = {}) {
  const file = p(rel);
  const meta = await sharp(file).metadata();
  const height = opts.height || Math.round(width * meta.height / meta.width);
  let pipeline = sharp(file).resize({ width, height, fit: opts.fit || 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (opts.round) {
    const mask = Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${opts.round}" fill="#fff"/></svg>`);
    pipeline = pipeline.composite([{ input: mask, blend: 'dest-in' }]);
  }
  return { input: await pipeline.png().toBuffer(), left, top };
}
function browserChrome(x, y, w, h, title = 'lndry.app') {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${C.white}" stroke="${C.border}"/>
    <rect x="${x}" y="${y}" width="${w}" height="54" rx="22" fill="${C.cool}"/>
    <circle cx="${x + 30}" cy="${y + 27}" r="6" fill="#D94557"/><circle cx="${x + 50}" cy="${y + 27}" r="6" fill="#F3A929"/><circle cx="${x + 70}" cy="${y + 27}" r="6" fill="#16A36A"/>
    <rect x="${x + 105}" y="${y + 16}" width="${w - 140}" height="24" rx="12" fill="${C.white}" stroke="${C.border}"/>
    ${text(x + 126, y + 33, title, 11, C.muted, 600, 50)}
  </g>`;
}
function phoneFrame(x, y, w, h, label = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(34, w * .09)}" fill="#10131B"/>
  <rect x="${x + 8}" y="${y + 10}" width="${w - 16}" height="${h - 20}" rx="${Math.min(28, w * .075)}" fill="${C.white}"/>
  <rect x="${x + w * .38}" y="${y + 18}" width="${w * .24}" height="5" rx="3" fill="#DDE0EA"/>
  ${label ? text(x + w / 2, y + h + 24, label, 13, C.ink2, 650, 22, 1.2, 'middle') : ''}`;
}
function laptopFrame(x, y, w, h, label = '') {
  return `${browserChrome(x, y, w, h, label)}
  <rect x="${x + 18}" y="${y + 72}" width="${w - 36}" height="${h - 92}" rx="14" fill="${C.lavender2}"/>`;
}
async function buildSvgPng(filename, width, height, body, composites = []) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="heroGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#FFFFFF"/><stop offset=".62" stop-color="#F4F3FB"/><stop offset="1" stop-color="#EAE8FF"/>
      </linearGradient>
      <linearGradient id="violetPanel" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#6C63E8"/><stop offset="1" stop-color="#5046C8"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#433791" flood-opacity=".12"/>
      </filter>
      <style>
        text { dominant-baseline: alphabetic; }
      </style>
    </defs>
    <rect width="100%" height="100%" fill="${C.lavender2}"/>
    ${body}
  </svg>`);
  await sharp(svg).composite(composites).png({ compressionLevel: 9 }).toFile(path.join(outDir, filename));
}

async function desktopHome() {
  const w = 1440, h = 3930, pad = 88;
  const comps = [
    await img(A.hero, 740, 168, 520),
    await img(A.mobileHome, 890, 585, 228, { round: 28 }),
    await img(A.mobileReview, 1108, 645, 202, { round: 25 }),
    await img(A.washFold, 120, 1370, 180),
    await img(A.dry, 430, 1370, 180),
    await img(A.steam, 740, 1370, 180),
    await img(A.shoe, 1050, 1370, 180),
    await img(A.pickup, 150, 2350, 185),
    await img(A.process, 455, 2350, 185),
    await img(A.quality, 760, 2350, 185),
    await img(A.delivery, 1065, 2350, 185),
    await img(A.admin, 168, 3185, 318, { round: 18 }),
    await img(A.vendor, 565, 3185, 220, { round: 24 }),
    await img(A.rider, 918, 3185, 220, { round: 24 }),
  ];
  const serviceCards = [
    ['Wash & fold', 'Everyday garments, clear per-kg pricing', 96],
    ['Dry cleaning', 'Special care handled by eligible partners', 406],
    ['Steam press', 'Crisp finish with visible service basis', 716],
    ['Shoe care', 'Specialist cleaning with partner evidence', 1026],
  ].map(([a, b, x]) => `${card(x, 1308, 250, 318, 20)}${text(x + 24, 1540, a, 22, C.ink, 750, 16)}${text(x + 24, 1576, b, 14, C.ink2, 420, 28)}`).join('');
  const body = `
    <rect x="0" y="0" width="${w}" height="980" fill="url(#heroGrad)"/>
    ${header(w, true)}
    ${pill(pad, 150, 248, 42, 'Multi-vendor garment care', C.white, C.border, C.violet)}
    ${text(pad, 246, ['A laundry marketplace', 'that feels handled,', 'not handed off.'], 70, C.ink, 760, 26, 1.05)}
    ${text(pad, 515, 'LNDRY helps customers compare nearby eligible vendors, choose services, schedule a 60-minute pickup slot, pay online, and follow OTP-verified delivery without calling around.', 20, C.ink2, 450, 55, 1.48)}
    ${btn(pad, 650, 184, 56, 'Book a pickup')}
    ${pill(pad + 204, 650, 196, 56, 'Compare partners', C.white, C.border, C.violet)}
    ${card(pad, 754, 550, 138, 22)}${text(pad + 28, 806, 'Start with your area', 18, C.ink, 750, 24)}${text(pad + 28, 843, 'Kolkata 700091', 30, C.ink, 750, 20)}${pill(pad + 350, 797, 150, 44, 'Check vendors', C.tealTint, C.tealTint, C.teal)}
    <circle cx="1260" cy="250" r="150" fill="${C.lavender}" opacity=".68"/>
    ${phoneFrame(875, 560, 260, 562, 'Customer booking')}
    ${phoneFrame(1094, 626, 234, 506, 'Order review')}
    ${text(pad, 1170, 'Services built as a premium catalog, not a generic laundry grid', 42, C.ink, 760, 40, 1.13)}
    ${text(pad, 1246, 'Each category uses LNDRY’s existing cutouts and careline logic. No random bubbles, no stock washing-machine clip art.', 17, C.ink2, 560, 70, 1.45)}
    ${serviceCards}
    <rect x="0" y="1740" width="${w}" height="430" fill="${C.ink}"/>
    ${text(pad, 1840, 'Compare real partner choices before booking', 46, C.white, 760, 32, 1.12)}
    ${text(pad, 1916, 'The website should explain the marketplace model with the same proof customers see in the app: rate basis, distance, slots, verification and care categories.', 18, '#DDE0EA', 520, 58, 1.46)}
    ${card(700, 1810, 250, 220, 20, '#121B24', '#273143')}${text(728, 1865, 'BrightFold Care', 24, C.white, 750, 20)}${text(728, 1910, '1.2 km · ₹79/kg · Slot 6-7 PM', 16, '#DDE0EA', 500, 30)}${pill(728, 1950, 126, 38, 'Verified', C.tealTint, C.tealTint, C.teal)}
    ${card(982, 1775, 310, 278, 20, '#FFFFFF', 'transparent')}${text(1016, 1845, 'UrbanPress Studio', 26, C.ink, 750, 20)}${text(1016, 1894, 'Dry clean, steam press, premium garment care', 16, C.ink2, 500, 32)}${pill(1016, 1955, 148, 40, 'Available today', C.tealTint, C.tealTint, C.teal)}
    ${text(pad, 2240, 'The booking story is a visible careline', 42, C.ink, 760, 30)}
    ${text(pad, 2335, 'The site introduces the full order arc so the customer understands what happens after checkout.', 17, C.ink2, 520, 58, 1.45)}
    <path d="M240 2515 C430 2445 590 2605 760 2525 S1088 2465 1220 2577" fill="none" stroke="${C.violet}" stroke-width="5" stroke-linecap="round"/>
    ${[150,455,760,1065].map((x,i)=>`${card(x, 2535, 216, 236, 20)}${text(x+24, 2702, ['Pickup','Processing','Quality check','OTP delivery'][i], 20, C.ink, 750, 16)}${text(x+24, 2737, ['60-minute slot','Partner updates','Care verification','Secure handover'][i], 14, C.ink2, 500, 22)}`).join('')}
    ${text(pad, 2900, 'Operational credibility for a big-industry feel', 40, C.ink, 760, 34, 1.15)}
    ${text(pad, 3045, 'The website can show that LNDRY is not only a customer app. Vendor fulfilment, rider handovers and admin review are part of the same designed system.', 17, C.ink2, 560, 60, 1.45)}
    ${laptopFrame(130, 3160, 400, 326, 'Admin operations')}
    ${phoneFrame(560, 3152, 246, 532, 'Vendor app')}
    ${phoneFrame(920, 3152, 246, 532, 'Delivery employee')}
    ${card(1190, 3200, 138, 320, 22, C.violet, C.violet)}
    ${text(1214, 3268, 'One system', 28, C.white, 760, 12)}
    ${text(1214, 3340, 'Customer, vendor, rider and admin surfaces share the same careline language.', 15, '#F0EEFF', 500, 15, 1.45)}
    <rect x="0" y="3798" width="${w}" height="132" fill="${C.violetDeep}"/>
    ${text(pad, 3876, 'LNDRY website mockup system', 26, C.white, 760, 32)}
    ${pill(w - pad - 216, 3846, 216, 48, 'Client-ready visuals', '#FFFFFF22', '#FFFFFF44', C.white)}
  `;
  await buildSvgPng('website-homepage-desktop-1440x3930.png', w, h, body, comps);
}

async function desktopServices() {
  const w = 1440, h = 2850, pad = 88;
  const services = [
    ['Wash & fold', 'Daily laundry by weight', A.washFold],
    ['Wash & iron', 'Cleaned and pressed garments', A.washIron],
    ['Dry cleaning', 'Eligible specialist partners', A.dry],
    ['Steam press', 'Crisp finish and folds', A.steam],
    ['Shoe care', 'Brush, clean and finish', A.shoe],
    ['Bag care', 'Gentle accessory handling', A.bag],
    ['Premium garment', 'Care for delicate items', A.premium],
    ['Tailoring', 'Alteration-ready partner flow', A.tailoring],
    ['Curtains', 'Large-format cleaning', A.curtain],
    ['Carpets', 'Roll pickup and care', A.carpet],
    ['Blankets', 'Bulky-care service', A.blanket],
  ];
  const comps = [];
  services.forEach((s, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    comps.push(img(s[2], pad + 34 + col * 420, 640 + row * 390, 170));
  });
  const imgs = await Promise.all(comps);
  const cards = services.map((s, i) => {
    const col = i % 3, row = Math.floor(i / 3), x = pad + col * 420, y = 592 + row * 390;
    return `${card(x, y, 370, 340, 22)}${pill(x + 230, y + 28, 112, 34, row < 2 ? 'Popular' : 'Specialist', row < 2 ? C.tealTint : C.lavender, 'transparent', row < 2 ? C.teal : C.violet)}${text(x + 32, y + 238, s[0], 27, C.ink, 760, 20)}${text(x + 32, y + 282, s[1], 15, C.ink2, 500, 28)}${text(x + 32, y + 316, 'Compare eligible partners near you', 13, C.violet, 700, 34)}`;
  }).join('');
  const body = `
    <rect x="0" y="0" width="${w}" height="440" fill="${C.ink}"/>
    ${header(w, true)}
    ${text(pad, 180, 'Service catalog mockup', 64, C.white, 780, 28, 1.08)}
    ${text(pad, 270, 'A premium web catalog that makes service scope, partner eligibility and rate basis visible before a customer starts booking.', 20, '#DDE0EA', 620, 58, 1.45)}
    ${pill(980, 180, 250, 46, '11 approved service families', '#FFFFFF18', '#FFFFFF33', C.white)}
    ${pill(980, 244, 214, 46, 'No generic icon filler', '#FFFFFF18', '#FFFFFF33', C.white)}
    ${text(pad, 520, 'Choose a service, then compare who can actually handle it', 42, C.ink, 760, 34, 1.12)}
    ${cards}
    <rect x="0" y="2210" width="${w}" height="520" fill="${C.lavender}"/>
    ${text(pad, 2320, 'Website-specific section art', 44, C.ink, 760, 30)}
    ${text(pad, 2390, 'The catalog can use larger service cutouts, while the product detail remains grounded in marketplace facts: service basis, partner capability, pickup slots and handover verification.', 18, C.ink2, 590, 60, 1.45)}
    ${card(770, 2310, 480, 250, 24, C.white, 'transparent')}
    ${text(810, 2378, 'Example service detail', 25, C.ink, 760, 24)}
    ${text(810, 2428, 'Dry cleaning partners shown only when eligible for the selected address. Rate basis and expected completion are shown before payment.', 16, C.ink2, 420, 44)}
    ${pill(810, 2518, 136, 42, '₹ per item', C.cool, C.border, C.ink2)}
    ${pill(966, 2518, 174, 42, 'OTP handover', C.tealTint, 'transparent', C.teal)}
    ${text(pad, 2768, 'LNDRY website service page mockup', 20, C.ink2, 700, 40)}
  `;
  await buildSvgPng('website-services-desktop-1440x2850.png', w, h, body, imgs);
}

async function desktopMarketplace() {
  const w = 1440, h = 2600, pad = 88;
  const comps = [
    await img(A.bannerCompare, 832, 185, 470, { round: 26 }),
    await img(A.storePlaceholder, 132, 750, 190, { round: 24 }),
    await img(A.vendor, 1018, 1585, 228, { round: 24 }),
  ];
  const rows = ['BrightFold Care', 'UrbanPress Studio', 'CareLoop Laundry', 'Spotless Partner', 'Lavender Press'].map((name, i) => {
    const y = 720 + i * 220;
    const selected = i === 1;
    return `${card(370, y, 740, 172, 20, selected ? C.lavender : C.white, selected ? C.violet : C.border)}
    ${text(400, y + 48, name, 24, C.ink, 760, 28)}
    ${text(400, y + 88, `${(1.1 + i * .4).toFixed(1)} km · ₹${79 + i * 8}/kg · ${i % 2 ? '6-7 PM' : '5-6 PM'} slot`, 16, C.ink2, 500, 56)}
    ${pill(400, y + 114, 108, 36, 'Verified', C.tealTint, 'transparent', C.teal)}
    ${pill(522, y + 114, 138, 36, i < 3 ? 'Available' : 'Tomorrow', C.cool, C.border, C.ink2)}
    ${btn(916, y + 96, 150, 48, selected ? 'Selected' : 'Compare', selected ? C.violet : C.white, selected ? C.white : C.violet)}`;
  }).join('');
  const body = `
    <rect x="0" y="0" width="${w}" height="${h}" fill="${C.cool}"/>
    ${header(w)}
    ${text(pad, 185, 'Marketplace comparison mockup', 60, C.ink, 780, 28, 1.08)}
    ${text(pad, 272, 'The premium feel comes from confidence: customers can compare partners without calling, guessing, or losing the booking context.', 20, C.ink2, 620, 58, 1.45)}
    ${browserChrome(88, 460, 1264, 1620, 'lndry.app/compare')}
    ${card(126, 548, 280, 1340, 20, C.white)}
    ${text(158, 610, 'Filters', 26, C.ink, 760, 20)}
    ${['Wash & fold', 'Dry cleaning', '6-7 PM slot', 'Within 2 km', 'Verified only'].map((l, i) => pill(158, 670 + i * 64, 170 + (i % 2) * 30, 44, l, i === 1 ? C.violet : C.white, i === 1 ? C.violet : C.border, i === 1 ? C.white : C.ink2)).join('')}
    ${card(158, 1070, 216, 260, 18, C.lavender)}
    ${text(184, 1130, 'Why compare?', 22, C.ink, 760, 20)}
    ${text(184, 1172, 'Rate basis, timing, distance and partner capability are visible together.', 15, C.ink2, 210, 25, 1.42)}
    ${rows}
    ${card(1140, 720, 160, 1020, 20, C.lavender)}
    ${text(1170, 786, 'Slot view', 24, C.ink, 760, 14)}
    ${[0,1,2,3,4].map((_,i)=>`${pill(1165, 850+i*84, 110, 46, ['4-5 PM','5-6 PM','6-7 PM','7-8 PM','Tomorrow'][i], i===2?C.tealTint:C.white, i===2?'transparent':C.border, i===2?C.teal:C.ink2)}`).join('')}
    ${text(pad, 2190, 'No unsupported map promise', 38, C.ink, 760, 30)}
    ${text(pad, 2250, 'This mockup shows area and eligibility, not continuous live rider tracking. The trust story remains operationally true to the app workflow.', 18, C.ink2, 640, 60, 1.45)}
    ${card(860, 2132, 360, 240, 22, C.white)}
    ${text(900, 2202, 'Selected partner', 18, C.muted, 700, 20)}
    ${text(900, 2250, 'UrbanPress Studio', 31, C.ink, 780, 22)}
    ${text(900, 2302, '1.5 km · Dry clean eligible · 6-7 PM pickup', 16, C.ink2, 500, 38)}
    ${btn(900, 2348, 180, 52, 'Continue booking')}
  `;
  await buildSvgPng('website-marketplace-desktop-1440x2600.png', w, h, body, comps);
}

async function desktopBooking() {
  const w = 1440, h = 2650, pad = 88;
  const comps = [
    await img(A.mobileReview, 170, 590, 250, { round: 28 }),
    await img(A.mobileTrack, 1010, 1440, 250, { round: 28 }),
    await img(A.mobileDelivery, 760, 1440, 220, { round: 25 }),
    await img(A.pickup, 900, 500, 260),
  ];
  const steps = ['Service', 'Garments', 'Slot', 'Payment', 'Status', 'OTP handover'];
  const body = `
    <rect x="0" y="0" width="${w}" height="570" fill="url(#heroGrad)"/>
    ${header(w, true)}
    ${text(pad, 178, 'Booking flow website mockup', 60, C.ink, 780, 28, 1.08)}
    ${text(pad, 268, 'A desktop booking story that remains calm and readable, while clearly explaining the same auditable journey as the mobile app.', 20, C.ink2, 620, 58, 1.45)}
    ${btn(pad, 384, 190, 56, 'Start booking')}
    ${steps.map((s,i)=>`${i<5?`<line x1="${250+i*180}" y1="740" x2="${390+i*180}" y2="740" stroke="${C.border}" stroke-width="3"/>`:''}<circle cx="${210+i*180}" cy="740" r="28" fill="${i<3?C.violet:C.white}" stroke="${i<3?C.violet:C.border}"/>${text(210+i*180, 746, String(i+1), 16, i<3?C.white:C.ink2, 760, 10, 1, 'middle')}${text(210+i*180, 800, s, 15, C.ink2, 650, 16, 1, 'middle')}`).join('')}
    ${card(470, 930, 740, 390, 24, C.white)}
    ${text(520, 1004, 'Garment selection with price basis', 34, C.ink, 760, 28)}
    ${text(520, 1066, 'The website mockup keeps the web flow big and spacious, but the decision points stay the same: selected partner, service, garments, weight estimate and pickup slot.', 17, C.ink2, 560, 58, 1.45)}
    ${['Shirts × 5','Trousers × 2','Bedsheet × 1'].map((l,i)=>`${card(530, 1160+i*58, 360, 42, 12, C.cool)}${text(552, 1187+i*58, l, 15, C.ink, 650, 28)}${text(820, 1187+i*58, ['₹175','₹110','₹90'][i], 15, C.ink2, 650, 10)}`).join('')}
    ${card(930, 1148, 220, 164, 18, C.lavender)}
    ${text(962, 1198, 'Estimate', 18, C.ink, 760, 12)}
    ${text(962, 1248, '₹375', 42, C.violet, 800, 10)}
    ${text(962, 1288, 'Final weight may update', 13, C.ink2, 500, 20)}
    ${card(150, 1422, 1110, 600, 28, C.ink)}
    ${text(210, 1530, 'Status visibility after checkout', 46, C.white, 760, 28)}
    ${text(210, 1602, 'The site can explain pickup OTP, partner processing, quality checks and delivery OTP without implying unsupported live rider maps.', 18, '#DDE0EA', 610, 60, 1.45)}
    ${[0,1,2,3].map((_,i)=>`${card(215+i*125, 1740+i*30, 96, 96, 18, i<2?C.violet:'#1B2532', i<2?C.violet:'#303B4D')}${text(263+i*125, 1798+i*30, ['✓','2','3','4'][i], 28, i<2?C.white:'#AEB7C8', 800, 8, 1, 'middle')}`).join('')}
    ${text(pad, 2210, 'Web checkout is not a new product, it is the same LNDRY journey at larger scale', 38, C.ink, 760, 42, 1.16)}
    ${text(pad, 2292, 'This keeps the client presentation honest: desktop users see better comparison space, not extra features the platform has not approved.', 18, C.ink2, 650, 70, 1.45)}
  `;
  await buildSvgPng('website-booking-flow-desktop-1440x2650.png', w, h, body, comps);
}

async function desktopPartners() {
  const w = 1440, h = 2480, pad = 88;
  const comps = [
    await img(A.vendor, 760, 260, 250, { round: 26 }),
    await img(A.admin, 928, 780, 342, { round: 18 }),
    await img(A.rider, 193, 1450, 236, { round: 26 }),
  ];
  const body = `
    <rect x="0" y="0" width="${w}" height="700" fill="${C.violetDeep}"/>
    ${header(w, true)}
    ${text(pad, 185, 'Partner and operations mockup', 60, C.white, 780, 28, 1.08)}
    ${text(pad, 278, 'A website page for explaining LNDRY’s operating model to vendors, clients and internal stakeholders: application, fulfilment, handover and admin review.', 20, '#F0EEFF', 620, 58, 1.45)}
    ${btn(pad, 406, 190, 56, 'View workflow', C.white, C.violet)}
    ${phoneFrame(740, 228, 286, 618, 'Vendor fulfilment')}
    ${card(150, 820, 520, 420, 24, C.white)}
    ${text(198, 902, 'Vendor onboarding is framed as quality control', 36, C.ink, 760, 30, 1.14)}
    ${text(198, 982, 'Application review, documents, radius, services, capacity and order assignment are presented as a trust system, not as a generic business sign-up.', 17, C.ink2, 420, 50, 1.45)}
    ${['Application review','Service editor','Order assignment','Processing audit'].map((l,i)=>pill(198, 1100+i*52, 190, 38, l, i===0?C.tealTint:C.cool, i===0?'transparent':C.border, i===0?C.teal:C.ink2)).join('')}
    ${laptopFrame(875, 735, 430, 350, 'Admin review')}
    ${text(840, 1224, 'Admin proof for the client deck', 34, C.ink, 760, 26)}
    ${text(840, 1282, 'The mockup makes the backend feel designed and credible while staying visually connected to the consumer site.', 16, C.ink2, 430, 48)}
    <rect x="0" y="1380" width="${w}" height="720" fill="${C.ink}"/>
    ${phoneFrame(170, 1425, 270, 584, 'Delivery handover')}
    ${text(550, 1530, 'Delivery handovers stay explicit', 46, C.white, 760, 28)}
    ${text(550, 1605, 'Pickup and delivery OTP are visible in the website narrative because they are central to customer confidence. The page never promises continuous live tracking.', 18, '#DDE0EA', 610, 60, 1.45)}
    ${['Pickup OTP','Partner return','Delivery OTP','Completed'].map((l,i)=>`${card(555+i*170, 1780, 138, 118, 18, '#121B24', '#303B4D')}${text(624+i*170, 1830, String(i+1), 26, C.teal, 800, 4, 1, 'middle')}${text(624+i*170, 1872, l, 13, '#DDE0EA', 650, 18, 1, 'middle')}`).join('')}
    ${text(pad, 2260, 'LNDRY website operations page mockup', 26, C.ink, 760, 40)}
    ${text(pad, 2310, 'Client-facing, investor-facing, and partner-facing without inventing claims outside the approved workflow.', 17, C.ink2, 720, 70)}
  `;
  await buildSvgPng('website-partner-operations-desktop-1440x2480.png', w, h, body, comps);
}

async function mobileHome() {
  const w = 390, h = 2680, pad = 22;
  const comps = [
    await img(A.hero, 70, 300, 260),
    await img(A.mobileHome, 84, 710, 220, { round: 28 }),
    await img(A.washFold, 44, 1345, 120),
    await img(A.dry, 222, 1345, 120),
    await img(A.pickup, 56, 1886, 120),
    await img(A.delivery, 214, 1886, 120),
  ];
  const body = `
    <rect x="0" y="0" width="${w}" height="650" fill="url(#heroGrad)"/>
    ${header(w, true)}
    ${pill(pad, 112, 196, 38, 'Multi-vendor care', C.white, C.border, C.violet)}
    ${text(pad, 210, ['Laundry care', 'with partner', 'clarity.'], 44, C.ink, 780, 14, 1.04)}
    ${text(pad, 372, 'Compare vendors, choose a pickup slot, pay online and follow OTP-verified delivery.', 16, C.ink2, 320, 34, 1.45)}
    ${btn(pad, 490, 160, 52, 'Book pickup')}
    ${phoneFrame(75, 682, 240, 520, 'Mobile web story')}
    ${text(pad, 1284, 'Services', 34, C.ink, 760, 16)}
    ${card(pad, 1320, 160, 222, 18)}${text(44, 1500, 'Wash & fold', 18, C.ink, 760, 14)}${text(44, 1530, 'By weight, nearby partners', 13, C.ink2, 500, 18)}
    ${card(208, 1320, 160, 222, 18)}${text(230, 1500, 'Dry cleaning', 18, C.ink, 760, 14)}${text(230, 1530, 'Eligible specialist care', 13, C.ink2, 500, 18)}
    ${card(pad, 1620, 346, 172, 20, C.ink)}
    ${text(48, 1682, 'Compare before booking', 25, C.white, 760, 18)}
    ${text(48, 1730, 'Rate basis, distance, slots and verified handover are shown together.', 14, '#DDE0EA', 280, 30, 1.4)}
    ${text(pad, 1845, 'Careline journey', 32, C.ink, 760, 18)}
    ${card(36, 2025, 140, 138, 18)}${text(58, 2108, 'Pickup slot', 17, C.ink, 750, 14)}
    ${card(214, 2025, 140, 138, 18)}${text(236, 2108, 'OTP delivery', 17, C.ink, 750, 14)}
    ${card(pad, 2250, 346, 250, 22, C.violet)}
    ${text(48, 2324, 'Quietly premium, practical, and true to the app.', 28, C.white, 780, 20, 1.16)}
    ${text(48, 2414, 'No fake live tracking. No subscription promise. Just the approved LNDRY marketplace explained beautifully.', 14, '#F0EEFF', 270, 30, 1.45)}
  `;
  await buildSvgPng('website-homepage-mobile-390x2680.png', w, h, body, comps);
}

async function tabletHome() {
  const w = 834, h = 2500, pad = 48;
  const comps = [
    await img(A.hero, 460, 210, 300),
    await img(A.mobileHome, 530, 560, 210, { round: 26 }),
    await img(A.bannerCare, 84, 750, 360, { round: 22 }),
    await img(A.washIron, 94, 1192, 150),
    await img(A.premium, 338, 1192, 150),
    await img(A.curtain, 582, 1192, 150),
    await img(A.admin, 76, 1800, 310, { round: 18 }),
    await img(A.vendor, 472, 1740, 220, { round: 24 }),
  ];
  const body = `
    <rect x="0" y="0" width="${w}" height="680" fill="url(#heroGrad)"/>
    ${header(w, true)}
    ${text(pad, 185, ['A calm website', 'for a serious', 'laundry marketplace.'], 52, C.ink, 780, 20, 1.06)}
    ${text(pad, 372, 'Tablet view keeps the same evidence-led story with wider partner comparison and larger service art.', 18, C.ink2, 390, 38, 1.44)}
    ${btn(pad, 495, 178, 54, 'Book pickup')}
    ${phoneFrame(515, 535, 240, 520, 'App proof')}
    ${card(64, 720, 410, 250, 24, C.white)}${text(96, 805, 'Marketplace clarity', 32, C.ink, 760, 22)}${text(96, 862, 'Distance, pricing basis, availability and verified handover stay visible before commitment.', 16, C.ink2, 300, 32, 1.4)}
    ${text(pad, 1110, 'Service universe', 38, C.ink, 760, 20)}
    ${[70,314,558].map((x,i)=>`${card(x, 1165, 206, 280, 20)}${text(x+28, 1370, ['Wash & iron','Premium care','Curtains'][i], 20, C.ink, 750, 16)}${text(x+28, 1405, ['Pressed finish','Delicate garments','Large-format care'][i], 13, C.ink2, 500, 20)}`).join('')}
    <rect x="0" y="1590" width="${w}" height="680" fill="${C.ink}"/>
    ${text(pad, 1692, 'The backend has a visual voice too', 38, C.white, 760, 24)}
    ${text(pad, 1754, 'Vendor and admin operations become proof of a credible marketplace, not hidden complexity.', 17, '#DDE0EA', 430, 38, 1.45)}
    ${laptopFrame(54, 1900, 350, 286, 'Admin')}
    ${phoneFrame(456, 1850, 250, 540, 'Vendor')}
  `;
  await buildSvgPng('website-homepage-tablet-834x2500.png', w, h, body, comps);
}

async function mobileBooking() {
  const w = 390, h = 2420, pad = 22;
  const comps = [
    await img(A.mobileReview, 70, 330, 250, { round: 28 }),
    await img(A.mobileTrack, 70, 1280, 250, { round: 28 }),
  ];
  const body = `
    <rect x="0" y="0" width="${w}" height="${h}" fill="${C.cool}"/>
    ${header(w)}
    ${text(pad, 158, 'Booking flow web mockup', 40, C.ink, 780, 16, 1.08)}
    ${text(pad, 245, 'Designed as a mobile website mockup, not a duplicate app screen.', 15, C.ink2, 300, 32, 1.45)}
    ${phoneFrame(62, 305, 266, 576, 'Review order')}
    ${card(pad, 965, 346, 286, 22, C.white)}
    ${text(48, 1032, 'Selected partner', 17, C.muted, 700, 12)}
    ${text(48, 1076, 'UrbanPress Studio', 29, C.ink, 780, 16)}
    ${text(48, 1128, 'Dry clean eligible · ₹ per item · 6-7 PM pickup', 15, C.ink2, 280, 30, 1.42)}
    ${btn(48, 1180, 190, 52, 'Continue booking')}
    ${phoneFrame(62, 1255, 266, 576, 'Track order')}
    ${card(pad, 1910, 346, 240, 22, C.ink)}
    ${text(48, 1980, 'Verified handover is the trust moment', 28, C.white, 780, 20, 1.14)}
    ${text(48, 2070, 'The page explains pickup and delivery OTP without inventing live rider tracking.', 14, '#DDE0EA', 275, 30, 1.45)}
    ${pill(48, 2168, 138, 42, 'OTP delivery', C.tealTint, 'transparent', C.teal)}
  `;
  await buildSvgPng('website-booking-mobile-390x2420.png', w, h, body, comps);
}

async function contactSheet() {
  const files = [
    ['Desktop homepage', 'website-homepage-desktop-1440x3930.png'],
    ['Services desktop', 'website-services-desktop-1440x2850.png'],
    ['Marketplace desktop', 'website-marketplace-desktop-1440x2600.png'],
    ['Booking desktop', 'website-booking-flow-desktop-1440x2650.png'],
    ['Partner ops desktop', 'website-partner-operations-desktop-1440x2480.png'],
    ['Tablet homepage', 'website-homepage-tablet-834x2500.png'],
    ['Mobile homepage', 'website-homepage-mobile-390x2680.png'],
    ['Mobile booking', 'website-booking-mobile-390x2420.png'],
  ];
  const w = 2400, h = 3300, pad = 90;
  const comps = [];
  const slots = [
    [90, 370, 650, 1120], [875, 370, 650, 1120], [1660, 370, 650, 1120],
    [90, 1710, 650, 1120], [875, 1710, 650, 1120], [1660, 1710, 300, 900],
    [1995, 1710, 210, 900], [1995, 2645, 210, 520],
  ];
  for (let i = 0; i < files.length; i++) {
    const [label, file] = files[i];
    const [x, y, sw, sh] = slots[i];
    const meta = await sharp(path.join(outDir, file)).metadata();
    const scale = Math.min(sw / meta.width, sh / meta.height);
    const ww = Math.round(meta.width * scale);
    const hh = Math.round(meta.height * scale);
    comps.push(await img(`assets/brand/v2/website/exports/${file}`, x, y + 50, ww, { round: i < 5 ? 18 : 28 }));
  }
  const labels = files.map(([label], i) => {
    const [x, y, sw] = slots[i];
    return `${text(x, y + 20, label, 22, C.ink, 760, 30)}${card(x - 18, y + 36, sw + 36, slots[i][3] + 88, 22, 'transparent', C.border)}`;
  }).join('');
  const body = `
    <rect width="${w}" height="${h}" fill="${C.lavender2}"/>
    ${text(pad, 125, 'LNDRY website mockup asset pack', 66, C.ink, 800, 36, 1.05)}
    ${text(pad, 215, 'Static image mockups only: desktop, tablet and mobile website visuals built from the approved LNDRY app asset pack and careline system.', 24, C.ink2, 1050, 92, 1.35)}
    ${pill(1770, 130, 250, 52, 'Responsive mockups', C.white, C.border, C.violet)}
    ${pill(2040, 130, 220, 52, 'Client ready', C.violet, C.violet, C.white)}
    ${labels}
    ${text(pad, 3220, 'Scope guard: no fake subscription, no live rider map, no random laundry clip art, no unrelated generated symbols.', 20, C.ink2, 1200, 90)}
  `;
  await buildSvgPng('website-mockup-contact-sheet-2400x3300.png', w, h, body, comps);
}

async function main() {
  await desktopHome();
  await desktopServices();
  await desktopMarketplace();
  await desktopBooking();
  await desktopPartners();
  await tabletHome();
  await mobileHome();
  await mobileBooking();
  await contactSheet();

  const manifest = `# LNDRY Website Mockup Asset Pack

Static mockup images generated for the LNDRY website concept. These are presentation/design assets only, not a coded website.

## Exports

- website-homepage-desktop-1440x3930.png
- website-services-desktop-1440x2850.png
- website-marketplace-desktop-1440x2600.png
- website-booking-flow-desktop-1440x2650.png
- website-partner-operations-desktop-1440x2480.png
- website-homepage-tablet-834x2500.png
- website-homepage-mobile-390x2680.png
- website-booking-mobile-390x2420.png
- website-mockup-contact-sheet-2400x3300.png

## Art direction

- Quietly premium violet LNDRY identity.
- Marketplace-first story: vendor comparison, services, slots, payment and OTP handover.
- Uses approved LNDRY app, vendor, rider, admin, service and journey assets.
- No unsupported subscription, loyalty, live rider map, surge pricing or fake guarantees.
- No generic bubbles, washing-machine clip art, zodiac/muscle/off-context imagery, or checkerboard backgrounds.
`;
  fs.writeFileSync(path.join(root, 'assets/brand/v2/website/WEBSITE_MOCKUP_MANIFEST.md'), manifest, 'utf8');
  console.log('Generated website mockups:', fs.readdirSync(outDir).filter(f => f.endsWith('.png')).length);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
