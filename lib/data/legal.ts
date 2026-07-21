import { company } from "./site";

export type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export const privacySections: LegalSection[] = [
  {
    title: "Information we collect",
    body: [
      "When customers, partners, or visitors use LNDRY services, the website, or future app surfaces, LNDRY may collect information needed to provide and improve the marketplace experience.",
    ],
    bullets: [
      "Account information such as name, email address, mobile number, and profile details.",
      "Pickup and delivery address information, plus approximate location when permission is granted.",
      "Order and service details such as garment type, service selection, special instructions, preferences, and order history.",
      "Payment transaction metadata. Raw card data should be handled by compliant payment gateway providers, not stored by LNDRY.",
      "Device, browser, usage, support, rating, and communication data.",
    ],
  },
  {
    title: "How we use information",
    bullets: [
      "To process bookings, coordinate pickups, assign eligible partners, and support delivery handovers.",
      "To send order updates, receipts, service notices, and support responses.",
      "To improve service quality, partner matching, fraud prevention, product reliability, and customer experience.",
      "To comply with applicable Indian laws including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.",
      "To send marketing communication only where permitted by consent and applicable law.",
    ],
  },
  {
    title: "Sharing and disclosure",
    body: ["LNDRY does not sell personal data. Information is shared only where necessary for service delivery, compliance, or platform safety."],
    bullets: [
      "Assigned partner businesses receive the customer details needed to fulfil the order.",
      "Payment processors receive transaction information needed to process payment securely.",
      "Technology vendors may process data for hosting, analytics, communication, and support operations under suitable safeguards.",
      "Information may be shared when required by law, court order, regulator request, or to protect users and the platform.",
    ],
  },
  {
    title: "Data storage and security",
    bullets: [
      "Use access controls, encryption in transit, secure storage, and administrative safeguards appropriate to the sensitivity of the data.",
      "Retain personal data only as long as required for service, legal, accounting, dispute, or security purposes.",
      "Allow users to request correction, access, deletion, withdrawal of consent, and grievance redressal where applicable.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "LNDRY may use essential cookies for site functionality and optional analytics cookies to understand page usage. Users can manage cookies through browser settings.",
    ],
  },
  {
    title: "Children and minors",
    body: [
      "LNDRY services are intended for adults or users acting with appropriate consent and supervision. If a parent or guardian believes a minor has shared personal information without consent, they can contact the privacy team for review.",
    ],
  },
  {
    title: "User rights and grievance requests",
    bullets: [
      "Users can request access, correction, deletion, withdrawal of consent, or grievance support where applicable under Indian law.",
      "LNDRY may need to verify the requester before acting on privacy or account-related requests.",
      "Some records may be retained where required for tax, accounting, fraud prevention, dispute handling, or legal compliance.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Privacy requests can be sent to ${company.privacyEmail}. General enquiries can be sent to ${company.email}.`,
      `${company.legalName}, CIN ${company.cin}, Registered Office: ${company.registeredOffice}.`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Acceptance of terms",
    body: [
      `These Terms govern use of the LNDRY website, future app surfaces, and related services operated by ${company.legalName}. By using the platform or placing a booking, the user agrees to these Terms and the Privacy Policy.`,
    ],
  },
  {
    title: "Platform and services",
    bullets: [
      "LNDRY is a technology marketplace that connects customers with eligible local garment-care partners.",
      "Garment care services such as washing, dry cleaning, ironing, and related services are fulfilled by partner businesses unless otherwise stated.",
      "LNDRY may support booking, recommended partner assignment, online payment, order status updates, support, and dispute handling.",
      "Service availability depends on area, partner coverage, capacity, and operational readiness.",
    ],
  },
  {
    title: "User eligibility and accounts",
    bullets: [
      "Users should be at least 18 years old or use the service with appropriate consent and supervision.",
      "Account and booking information must be accurate, current, and complete.",
      "Users are responsible for activity under their account and must report suspected unauthorised access.",
      "LNDRY may suspend accounts connected with fraud, abuse, policy violations, or platform risk.",
    ],
  },
  {
    title: "Bookings, pricing, and payments",
    bullets: [
      "Prices and service details should be displayed before confirmation where available.",
      "A booking is confirmed only after official confirmation through the platform, SMS, email, or another approved channel.",
      "Payments may be processed through third-party payment gateways.",
      "Taxes, fees, discounts, and partner terms may apply as shown at the time of booking.",
    ],
  },
  {
    title: "Garment care and liability",
    bullets: [
      "Customers should disclose delicate, high-value, damaged, or special-care garments before pickup.",
      "Partners should follow visible care labels and record pre-existing damage where applicable.",
      "Claims should be raised promptly with order details and photographic evidence.",
      "Liability, re-service, refund, or credit decisions should follow the published Refund & Cancellation Policy and final partner investigation.",
    ],
  },
  {
    title: "Partner terms",
    bullets: [
      "Partner businesses must provide accurate business, capacity, service, and compliance information.",
      "Partners must meet LNDRY quality, handover, timing, and customer support standards.",
      "LNDRY may remove, pause, or review a partner profile for repeated complaints, unsafe conduct, or policy violations.",
    ],
  },
  {
    title: "Prohibited conduct",
    bullets: [
      "Providing false information, abusing promotions, manipulating ratings, or attempting direct circumvention of the marketplace.",
      "Harassing customers, partners, delivery support, or LNDRY staff.",
      "Submitting hazardous, illegal, contaminated, or undisclosed items.",
      "Scraping, reverse engineering, or disrupting the platform.",
    ],
  },
  {
    title: "Communications and support",
    bullets: [
      "Users may receive booking confirmations, status messages, receipts, support replies, and important service notices.",
      "Promotional communication should follow user consent and applicable communication rules.",
      "Support outcomes depend on order evidence, partner notes, garment condition, care labels, and the applicable policy.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The LNDRY name, logo, website design, copy, visual assets, and platform materials belong to LNDRY or its licensors. Users and partners may not copy or reuse them without permission.",
    ],
  },
  {
    title: "Changes to the platform and terms",
    body: [
      "LNDRY may update services, coverage, pricing, policies, or these Terms as the marketplace develops. Material updates should be reflected on the website or communicated through appropriate channels.",
    ],
  },
  {
    title: "Governing law and grievances",
    body: [
      `These Terms are governed by the laws of India. Legal and grievance requests can be sent to ${company.legalEmail} or ${company.supportEmail}.`,
    ],
  },
];

export const refundSections: LegalSection[] = [
  {
    title: "Cancellation before pickup",
    body: [
      "If a customer cancels before pickup and before partner processing begins, LNDRY may issue a refund, credit, or cancellation confirmation based on the timing and service status.",
    ],
  },
  {
    title: "Cancellation after pickup",
    body: [
      "Once garments are collected or processing has started, cancellation may not be possible. Customers can still contact support if service quality or delivery expectations are affected.",
    ],
  },
  {
    title: "Refund eligibility",
    bullets: [
      "Duplicate payment, failed order confirmation, or cancellation by LNDRY or the assigned partner.",
      "Verified service issue where re-service is not suitable or available.",
      "Missing item, damage claim, or delay claim after review of handover notes, photos, partner response, and care instructions.",
    ],
  },
  {
    title: "Refund method and timeline",
    body: [
      "Approved refunds should be returned to the original payment method or issued as service credit where permitted. Bank and gateway timelines may vary.",
    ],
  },
  {
    title: "How to raise a request",
    body: [
      `Email ${company.supportEmail} with order ID, registered mobile number, issue summary, and photos where applicable.`,
    ],
  },
];

export const deliverySections: LegalSection[] = [
  {
    title: "Pickup windows",
    body: [
      "Customers should select an available pickup slot during booking. Slot availability depends on area, partner capacity, delivery support, and operational readiness.",
    ],
  },
  {
    title: "Handover verification",
    bullets: [
      "Customers should confirm garment count and special instructions at pickup.",
      "OTP or another verification method may be used at pickup and delivery where supported.",
      "Partners or delivery support may note visible garment condition before processing.",
    ],
  },
  {
    title: "Order status updates",
    body: [
      "LNDRY keeps the available order stages visible, including pickup scheduled, picked up, processing, ready, out for delivery, and completed. If live rider tracking is available for an order, it is shown in the relevant order experience.",
    ],
  },
  {
    title: "Delivery attempts",
    body: [
      "If a customer is unavailable, LNDRY or the assigned partner may attempt to contact the customer and reschedule delivery based on operational feasibility.",
    ],
  },
  {
    title: "Service areas",
    body: [
      "LNDRY is preparing launch coverage for selected Pune areas. Service availability must be confirmed before accepting live orders.",
    ],
  },
];
