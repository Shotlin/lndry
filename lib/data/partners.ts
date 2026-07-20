export interface Partner {
  id: string;
  name: string;
  distanceKm: number;
  ratePerKg: number;
  slot: string;
  availability: "Available" | "Tomorrow";
  services: string[];
}

export const PARTNERS: Partner[] = [
  {
    id: "brightfold",
    name: "BrightFold Care",
    distanceKm: 1.1,
    ratePerKg: 99,
    slot: "5-6 PM",
    availability: "Available",
    services: ["Wash & fold"],
  },
  {
    id: "urbanpress",
    name: "UrbanPress Studio",
    distanceKm: 1.5,
    ratePerKg: 99,
    slot: "6-7 PM",
    availability: "Available",
    services: ["Dry cleaning", "Steam press"],
  },
  {
    id: "careloop",
    name: "CareLoop Laundry",
    distanceKm: 1.9,
    ratePerKg: 99,
    slot: "5-6 PM",
    availability: "Available",
    services: ["Wash & fold", "Wash & iron"],
  },
  {
    id: "spotless",
    name: "Spotless Partner",
    distanceKm: 2.3,
    ratePerKg: 99,
    slot: "6-7 PM",
    availability: "Tomorrow",
    services: ["Dry cleaning"],
  },
  {
    id: "lavenderpress",
    name: "Lavender Press",
    distanceKm: 2.7,
    ratePerKg: 99,
    slot: "5-6 PM",
    availability: "Tomorrow",
    services: ["Wash & fold", "Dry cleaning"],
  },
];

export const SLOTS = ["4-5 PM", "5-6 PM", "6-7 PM", "7-8 PM", "Tomorrow"];

export const SERVICE_FILTERS = ["Wash & fold", "Dry cleaning"];
