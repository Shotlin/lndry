export interface ServiceEntry {
  title: string;
  description: string;
  icon: string;
  illustration: string;
  tag: { label: string; tone: "teal" | "violet" };
  bestFor?: string;
  price?: string;
  delivery?: string;
}

export const SERVICES: ServiceEntry[] = [
  {
    title: "Wash & fold",
    description: "Daily laundry by weight",
    icon: "/brand/icons/wash-fold.svg",
    illustration: "/brand/illustrations/service-wash-fold-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Daily wear",
    price: "Starting ₹99/kg",
    delivery: "24 hours",
  },
  {
    title: "Wash & iron",
    description: "Cleaned and pressed garments",
    icon: "/brand/icons/wash-iron.svg",
    illustration: "/brand/illustrations/service-wash-iron-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Office wear",
    price: "Starting ₹99/kg",
    delivery: "24 hours",
  },
  {
    title: "Dry cleaning",
    description: "Eligible specialist partners",
    icon: "/brand/icons/dry-cleaning.svg",
    illustration: "/brand/illustrations/service-dry-cleaning-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Premium garments",
    price: "Starting ₹99/item",
    delivery: "48 hours",
  },
  {
    title: "Steam press",
    description: "Crisp finish and folds",
    icon: "/brand/icons/steam-press.svg",
    illustration: "/brand/illustrations/service-steam-press-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Crisp finishing",
    price: "Starting ₹99/item",
    delivery: "24 hours",
  },
  {
    title: "Shoe care",
    description: "Brush, clean and finish",
    icon: "/brand/icons/shoe-care.svg",
    illustration: "/brand/illustrations/service-shoe-care-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Footwear refresh",
    price: "Starting ₹99/pair",
    delivery: "48 hours",
  },
  {
    title: "Bag care",
    description: "Gentle accessory handling",
    icon: "/brand/icons/bag-care.svg",
    illustration: "/brand/illustrations/service-bag-care-v1.png",
    tag: { label: "Popular", tone: "teal" },
    bestFor: "Everyday accessories",
    price: "Starting ₹99/item",
    delivery: "48 hours",
  },
  {
    title: "Premium garment",
    description: "Care for delicate items",
    icon: "/brand/icons/premium-garment-care.svg",
    illustration: "/brand/illustrations/service-premium-garment-care-v1.png",
    tag: { label: "Specialist", tone: "violet" },
    bestFor: "Delicate garments",
    price: "Starting ₹99/item",
    delivery: "48 hours",
  },
  {
    title: "Tailoring",
    description: "Alteration-ready partner flow",
    icon: "/brand/icons/tailoring.svg",
    illustration: "/brand/illustrations/service-tailoring-v1.png",
    tag: { label: "Specialist", tone: "violet" },
    bestFor: "Alterations",
    price: "Starting ₹99/item",
    delivery: "Partner-led timing",
  },
  {
    title: "Curtains",
    description: "Large-format cleaning",
    icon: "/brand/icons/curtain-cleaning.svg",
    illustration: "/brand/illustrations/service-curtain-cleaning-v1.png",
    tag: { label: "Specialist", tone: "violet" },
    bestFor: "Home textiles",
    price: "Starting ₹99/panel",
    delivery: "48 hours",
  },
  {
    title: "Carpets",
    description: "Roll pickup and care",
    icon: "/brand/icons/carpet-cleaning.svg",
    illustration: "/brand/illustrations/service-carpet-cleaning-v1.png",
    tag: { label: "Specialist", tone: "violet" },
    bestFor: "Large-format care",
    price: "Starting ₹99/item",
    delivery: "Partner-led timing",
  },
  {
    title: "Blankets",
    description: "Bulky-care service",
    icon: "/brand/icons/blanket-cleaning.svg",
    illustration: "/brand/illustrations/service-blanket-cleaning-v1.png",
    tag: { label: "Specialist", tone: "violet" },
    bestFor: "Bulky seasonal care",
    price: "Starting ₹99/item",
    delivery: "48 hours",
  },
];

/** Homepage teaser — the 4 "Popular" services featured in the Act 2 interlude. */
export const FEATURED_SERVICES = SERVICES.slice(0, 4);
