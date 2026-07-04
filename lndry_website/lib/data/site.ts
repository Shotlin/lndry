export const company = {
  legalName: "LNDRY CARE TECHNOLOGIES PRIVATE LIMITED",
  brandName: "LNDRY",
  cin: "U96010PN2026PTC256972",
  registeredOffice:
    "301, FLOOR-3/SHAFT-1, TOWER-H, BRAMHA SKY CITY, Dhanori, Pune - 411015",
  email: "hello@lndry.in",
  supportEmail: "support@lndry.in",
  privacyEmail: "privacy@lndry.in",
  legalEmail: "legal@lndry.in",
  phonePlaceholder: "Add official phone number",
  whatsappPlaceholder: "Add official WhatsApp number",
  businessHours: "Monday to Saturday, 10:00 AM to 7:00 PM",
};

export const launchAreas = ["Baner", "Balewadi", "Wakad", "Hinjewadi", "Kharadi", "Viman Nagar"];

export const trustSignals = [
  {
    title: "Verified partners",
    body: "Laundry businesses are reviewed before they appear in the customer flow.",
  },
  {
    title: "OTP verification",
    body: "Pickup and delivery handovers can be confirmed through OTP-based checks.",
  },
  {
    title: "Secure payments",
    body: "Digital payments can run through compliant payment gateway partners.",
  },
  {
    title: "Customer support",
    body: "Customers and partners get a direct support path when an order needs attention.",
  },
  {
    title: "Order status tracking",
    body: "Customers can follow order stages without relying on phone calls.",
  },
  {
    title: "Quality ratings",
    body: "Post-order feedback helps the marketplace learn which partners perform well.",
  },
];

export const partnerBenefits = [
  "Recurring customers",
  "Increased order volume",
  "Digital presence",
  "Technology support",
  "Zero marketing investment",
  "Capacity-led growth",
];

export const partnerFormFields = [
  "Laundry Name",
  "Owner Name",
  "Mobile Number",
  "Email",
  "Area",
  "Existing Monthly Orders",
  "Pickup & Delivery Available",
  "Current Capacity Per Day",
];

export const faqs = [
  {
    q: "How does LNDRY work?",
    a: "Customers enter their pickup area, choose the service they need, and LNDRY recommends an eligible nearby partner. The customer confirms the booking, handover happens through the defined pickup flow, and the order moves through visible status stages.",
  },
  {
    q: "Who picks up my clothes?",
    a: "Pickup is handled through the LNDRY operating flow with assigned delivery support or partner-side handover, depending on the available area and service setup.",
  },
  {
    q: "How are vendors selected?",
    a: "Partners are selected through service eligibility, area coverage, capacity, timing, and marketplace quality signals. The goal is to recommend the right partner without forcing customers into a crowded vendor-selection screen.",
  },
  {
    q: "Can I track my order?",
    a: "LNDRY should show order status stages such as pickup scheduled, picked up, processing, ready, out for delivery, and completed. Continuous live rider tracking should only be shown if the backend supports it.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery time depends on service type, partner capacity, pickup slot, and garment care requirements. The booking flow should show the applicable estimate before confirmation.",
  },
  {
    q: "What if my clothes are damaged?",
    a: "Customers should contact support quickly with order details and photos. The claim should be reviewed against partner notes, care labels, and the applicable refund or liability policy.",
  },
  {
    q: "How can I contact support?",
    a: `Customers can email ${company.supportEmail}. Add the official phone and WhatsApp number before launch so the Contact page and sticky help button are complete.`,
  },
  {
    q: "How do refunds work?",
    a: "Refunds and cancellations should follow the published Refund & Cancellation Policy. The policy needs to be visible before payment gateway review.",
  },
];

export const futureServices = [
  "Shoe Cleaning",
  "Bag Cleaning",
  "Tailoring",
  "Premium Garment Care",
  "Repairs",
];

export const locationPages = [
  {
    slug: "laundry-service-baner",
    area: "Baner",
    title: "Laundry Service in Baner",
    service: "Laundry service",
  },
  {
    slug: "laundry-service-wakad",
    area: "Wakad",
    title: "Laundry Service in Wakad",
    service: "Laundry service",
  },
  {
    slug: "laundry-service-hinjewadi",
    area: "Hinjewadi",
    title: "Laundry Service in Hinjewadi",
    service: "Laundry service",
  },
  {
    slug: "laundry-service-kharadi",
    area: "Kharadi",
    title: "Laundry Service in Kharadi",
    service: "Laundry service",
  },
  {
    slug: "dry-cleaning-pune",
    area: "Pune",
    title: "Dry Cleaning in Pune",
    service: "Dry cleaning",
  },
];

export const legalPolicies = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    body: "Explains what data LNDRY collects, why it is collected, and how customers can contact the privacy team.",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    body: "Defines platform usage, bookings, partner responsibilities, payments, liability, and dispute process.",
  },
  {
    title: "Refund & Cancellation Policy",
    href: "/refund-cancellation-policy",
    body: "Clarifies when cancellations, re-service, credits, or refunds may apply.",
  },
  {
    title: "Delivery Policy",
    href: "/delivery-policy",
    body: "Explains pickup windows, handover checks, status updates, and delivery expectations.",
  },
];

export const customerReviews = [
  {
    name: "Aarav Mehta",
    area: "Baner",
    context: "Weekly office wear",
    quote:
      "The flow makes the service feel less uncertain. I can see the pickup slot, the estimate, and what happens after checkout before I commit.",
    signal: "Clear booking",
  },
  {
    name: "Neha Kulkarni",
    area: "Viman Nagar",
    context: "Dry cleaning",
    quote:
      "I like that LNDRY does not make me call three different stores. The recommended partner format feels simpler for premium garments.",
    signal: "Less decision load",
  },
  {
    name: "Rohan Deshpande",
    area: "Hinjewadi",
    context: "Wash and iron",
    quote:
      "The order status language is the trust builder for me. Pickup, processing, quality check, delivery, each stage has a clear meaning.",
    signal: "Visible status",
  },
  {
    name: "Priya Shah",
    area: "Kharadi",
    context: "Family laundry",
    quote:
      "The OTP handover detail is useful. It makes the pickup and return process feel more controlled than a normal laundry call.",
    signal: "Secure handover",
  },
];
