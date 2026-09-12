export type StoreCategoryId = "laundry" | "mens" | "womens" | "household" | "accessories";

export type StoreService = {
  id: string;
  categoryId: StoreCategoryId;
  title: string;
  description: string;
  price: string;
  icon: string;
  illustration: string;
  featuredImage?: string;
  tag: { label: string; tone: "teal" | "violet" };
  delivery?: string;
};

export type StoreCategory = {
  id: StoreCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  iconArtwork?: string;
  artwork: string;
};

export type Storefront = {
  id: string;
  name: string;
  kind: "in-house" | "partner";
  official: boolean;
  heroImage: string;
  heroAlt: string;
  shortDescription: string;
  serviceNote: string;
  bookingHref: string;
  categories: StoreCategory[];
  services: StoreService[];
  subscriptions: { name: string; price: string; discount: string }[];
  socials?: { instagram?: string };
};

const icons = {
  laundry: "/brand/icons/wash-iron.svg",
  mens: "/brand/icons/premium-garment-care.svg",
  womens: "/brand/icons/dry-cleaning.svg",
  household: "/brand/icons/blanket-cleaning.svg",
  accessories: "/brand/icons/bag-care.svg",
} as const;

const illustrations = {
  laundry: "/brand/store/categories/laundry-v1.webp",
  mens: "/brand/store/categories/mens-care-v1.webp",
  womens: "/brand/store/categories/womens-care-v1.webp",
  household: "/brand/store/categories/home-care-v1.webp",
  accessories: "/brand/store/categories/accessories-care-v1.webp",
} as const;

const categoryIconArtwork = {
  laundry: "/brand/store/category-icons/laundry-3d-v1.webp",
  mens: "/brand/store/category-icons/mens-3d-v1.webp",
  womens: "/brand/store/category-icons/womens-3d-v1.webp",
  household: "/brand/store/category-icons/household-3d-v1.webp",
  accessories: "/brand/store/category-icons/accessories-3d-v1.webp",
} as const;

const featuredImages: Record<string, string> = {
  "wash-fold": "/brand/store/popular-wash-fold-v2.webp",
  "wash-steam-iron": "/brand/store/popular-wash-steam-v2.webp",
  "shirt-tshirt": "/brand/store/popular-shirt-v2.webp",
  "saree-plain": "/brand/store/popular-saree-v2.webp",
};

function pricedService(
  categoryId: StoreCategoryId,
  id: string,
  title: string,
  price: string,
  description: string,
  tag: "Popular" | "Specialist" = "Specialist"
): StoreService {
  return {
    id,
    categoryId,
    title,
    price,
    description,
    icon: icons[categoryId],
    illustration: illustrations[categoryId],
    featuredImage: featuredImages[id],
    tag: { label: tag, tone: tag === "Popular" ? "teal" : "violet" },
  };
}

/**
 * First-party storefront data is intentionally independent from its UI. New
 * in-house or marketplace stores can supply their own catalog and socials
 * without duplicating page logic. Rates below are transcribed from LNDRY's
 * supplied price list (August 2026).
 */
export const LNDRY_STORE: Storefront = {
  id: "lndry",
  name: "LNDRY",
  kind: "in-house",
  official: true,
  heroImage: "/brand/store/lndry-flagship-campaign-v2.webp",
  heroAlt: "LNDRY garment-care campaign collection with pressed shirts, kurta, blazer, and folded textiles",
  shortDescription: "The official LNDRY edit of everyday laundry, dry cleaning, and specialist garment care.",
  serviceNote: "Rates shown are from the official LNDRY price list. Review the selected items before booking.",
  bookingHref: "/#early-access",
  socials: { instagram: "https://www.instagram.com/lndry.in?stkn=MWowZDJ3eWYyZHNsNQ==" },
  categories: [
    { id: "laundry", label: "Laundry & steam", shortLabel: "Laundry", description: "Everyday wash, fold, and finishing by the stated unit.", icon: icons.laundry, iconArtwork: categoryIconArtwork.laundry, artwork: illustrations.laundry },
    { id: "mens", label: "Men’s dry cleaning", shortLabel: "Men’s", description: "Item-level dry-cleaning rates for men’s garments.", icon: icons.mens, iconArtwork: categoryIconArtwork.mens, artwork: illustrations.mens },
    { id: "womens", label: "Women’s dry cleaning", shortLabel: "Women’s", description: "Item-level dry-cleaning rates for women’s garments.", icon: icons.womens, iconArtwork: categoryIconArtwork.womens, artwork: illustrations.womens },
    { id: "household", label: "Household care", shortLabel: "Home", description: "Home linen, curtains, carpets, blankets, and quilts.", icon: icons.household, iconArtwork: categoryIconArtwork.household, artwork: illustrations.household },
    { id: "accessories", label: "Accessories & toys", shortLabel: "Accessories", description: "Shoes, bags, and soft toys with item-level rates.", icon: icons.accessories, iconArtwork: categoryIconArtwork.accessories, artwork: illustrations.accessories },
  ],
  services: [
    pricedService("laundry", "wash-fold", "Wash & fold", "₹80/kg", "Everyday laundry by weight.", "Popular"),
    pricedService("laundry", "wash-steam-iron", "Wash & steam iron", "₹120/kg", "Wash and steam finishing by weight.", "Popular"),
    pricedService("laundry", "steam-iron", "Steam iron", "From ₹16", "Press-only garment finishing.", "Popular"),
    pricedService("laundry", "household-wash-steam", "Household wash & steam iron", "₹189/kg", "For bedsheets, towels, and pillow covers."),
    pricedService("mens", "shirt-tshirt", "Shirt / T-shirt", "₹99", "Men’s wear dry cleaning.", "Popular"),
    pricedService("mens", "trouser-pant", "Trouser / pant", "₹99", "Men’s wear dry cleaning."),
    pricedService("mens", "jeans", "Jeans", "₹119", "Men’s wear dry cleaning."),
    pricedService("mens", "kurta-plain", "Kurta (plain)", "₹129", "Men’s wear dry cleaning."),
    pricedService("mens", "pyjama", "Pyjama", "₹119", "Men’s wear dry cleaning."),
    pricedService("mens", "blazer", "Blazer", "₹299", "Men’s wear dry cleaning."),
    pricedService("mens", "coat", "Coat", "₹369", "Men’s wear dry cleaning."),
    pricedService("mens", "jacket-short", "Jacket (short)", "₹299", "Men’s wear dry cleaning."),
    pricedService("mens", "jacket-long-winter", "Jacket (long / winter)", "₹449", "Men’s wear dry cleaning."),
    pricedService("mens", "safari-suit", "Safari suit", "₹300", "Men’s wear dry cleaning."),
    pricedService("mens", "hoodie", "Hoodie (jacket hood)", "₹299", "Men’s wear dry cleaning."),
    pricedService("mens", "dhoti", "Dhoti", "₹110", "Men’s wear dry cleaning."),
    pricedService("mens", "sweater-half", "Sweater (half)", "₹249", "Men’s wear dry cleaning."),
    pricedService("mens", "sweater-full", "Sweater (full)", "₹399", "Men’s wear dry cleaning."),
    pricedService("mens", "cap", "Cap", "₹130", "Men’s wear dry cleaning."),
    pricedService("mens", "suit-2-piece", "Suit (2 piece)", "₹599", "Men’s wear dry cleaning."),
    pricedService("mens", "suit-3-piece", "Suit (3 piece)", "₹749", "Men’s wear dry cleaning."),
    pricedService("womens", "top-plain", "Top (plain)", "₹90", "Women’s wear dry cleaning.", "Popular"),
    pricedService("womens", "blouse-plain", "Blouse (plain)", "₹90", "Women’s wear dry cleaning."),
    pricedService("womens", "kurti", "Kurti", "₹129", "Women’s wear dry cleaning."),
    pricedService("womens", "salwar-plain", "Salwar (plain)", "₹119", "Women’s wear dry cleaning."),
    pricedService("womens", "petticoat", "Petticoat", "₹80", "Women’s wear dry cleaning."),
    pricedService("womens", "dupatta", "Dupatta", "₹99", "Women’s wear dry cleaning."),
    pricedService("womens", "saree-plain", "Saree (plain)", "₹180", "Women’s wear dry cleaning.", "Popular"),
    pricedService("womens", "silk-saree", "Silk saree", "₹299", "Women’s wear dry cleaning."),
    pricedService("womens", "designer-saree", "Designer saree", "₹399", "Women’s wear dry cleaning."),
    pricedService("womens", "lehenga-plain", "Lehenga (plain)", "₹360", "Women’s wear dry cleaning."),
    pricedService("womens", "gown", "Gown", "₹399", "Women’s wear dry cleaning."),
    pricedService("womens", "short-skirt", "Short skirt", "₹120", "Women’s wear dry cleaning."),
    pricedService("womens", "dress-plain", "Dress (plain)", "₹249", "Women’s wear dry cleaning."),
    pricedService("womens", "bridal-lehenga", "Bridal lehenga", "From ₹999", "Women’s wear dry cleaning."),
    pricedService("household", "bedsheet-single", "Bed sheet (single)", "₹165", "Household dry cleaning."),
    pricedService("household", "bedsheet-double", "Bed sheet (double)", "₹215", "Household dry cleaning."),
    pricedService("household", "pillow-covers", "Pillow covers", "₹75", "Household dry cleaning."),
    pricedService("household", "towel", "Towel", "₹89", "Household dry cleaning."),
    pricedService("household", "blanket-single", "Blanket (single)", "₹320", "Household dry cleaning."),
    pricedService("household", "blanket-double", "Blanket (double)", "₹420", "Household dry cleaning."),
    pricedService("household", "quilt-single", "Quilt (single)", "₹350", "Household dry cleaning."),
    pricedService("household", "quilt-double", "Quilt (double)", "₹500", "Household dry cleaning."),
    pricedService("household", "carpet", "Carpet", "₹40/sq.ft", "Household dry cleaning."),
    pricedService("household", "curtain", "Curtain", "₹40/sq.ft", "Household dry cleaning."),
    pricedService("accessories", "sports-shoes", "Sports shoes", "₹329", "Accessories dry cleaning."),
    pricedService("accessories", "leather-shoes", "Leather shoes", "₹429", "Accessories dry cleaning."),
    pricedService("accessories", "school-bag", "School bag", "₹249", "Accessories dry cleaning."),
    pricedService("accessories", "office-bag", "Office bag", "₹399", "Accessories dry cleaning."),
    pricedService("accessories", "travel-bag", "Travel bag", "₹499", "Accessories dry cleaning."),
    pricedService("accessories", "soft-toy-small", "Soft toy (small)", "₹175", "Accessories dry cleaning."),
    pricedService("accessories", "soft-toy-large", "Soft toy (large)", "₹250", "Accessories dry cleaning."),
  ],
  subscriptions: [
    { name: "Pro", price: "₹1,500", discount: "10% discount" },
    { name: "Deluxe", price: "₹2,500", discount: "20% discount" },
    { name: "Premium", price: "₹3,500", discount: "30% discount" },
  ],
};

export const STORES: Storefront[] = [LNDRY_STORE];
