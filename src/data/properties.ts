import hero from "@/assets/hero.jpg";
import villa from "@/assets/villa-interior.jpg";
import lodge from "@/assets/lodge.jpg";
import apartment from "@/assets/apartment.jpg";

export type PropertyType = "Villa" | "Apartment" | "Boutique Lodge" | "Cottage";

export interface Property {
  slug: string;
  name: string;
  type: PropertyType;
  location: string;
  pricePerNight: number; // KES
  bedrooms: number;
  guests: number;
  amenities: string[];
  images: string[];
  summary: string;
  description: string;
  lat: number;
  lng: number;
  featured?: boolean;
}

// Static sample data. Replace with a CMS / booking API without changing consumers.
export const PROPERTIES: Property[] = [
  {
    slug: "kirimiri-ridge-villa", name: "Kirimiri Ridge Villa", type: "Villa", location: "Kirimiri Hills, Embu",
    pricePerNight: 38000, bedrooms: 5, guests: 10, featured: true,
    amenities: ["Infinity pool", "Mount Kenya views", "Private chef", "Wi-Fi", "Parking", "Fireplace"],
    images: [hero, villa, apartment], lat: -0.52, lng: 37.45,
    summary: "A hillside sanctuary with an infinity pool facing Mount Kenya.",
    description: "Perched on the Kirimiri ridge, this five-bedroom villa pairs stone-and-glass architecture with sweeping views of Mount Kenya. Expect a heated infinity pool, a private chef on request and evenings by the fire.",
  },
  {
    slug: "izaak-walton-suites", name: "Izaak Walton Penthouse Suites", type: "Apartment", location: "Embu Town",
    pricePerNight: 14500, bedrooms: 2, guests: 4, featured: true,
    amenities: ["Balcony", "Wi-Fi", "Workspace", "Parking", "Housekeeping"],
    images: [apartment, villa, hero], lat: -0.535, lng: 37.457,
    summary: "Serviced penthouse living in the heart of Embu Town.",
    description: "Hotel-grade linens, a private balcony and daily housekeeping make these penthouse suites ideal for executives and couples seeking comfort close to town.",
  },
  {
    slug: "mount-kenya-forest-lodge", name: "Mount Kenya Forest Lodge", type: "Boutique Lodge", location: "Castle Forest, near Embu",
    pricePerNight: 26000, bedrooms: 6, guests: 12, featured: true,
    amenities: ["Forest trails", "Mount Kenya views", "Restaurant", "Fireplace", "Wi-Fi"],
    images: [lodge, hero, villa], lat: -0.42, lng: 37.33,
    summary: "Thatched forest cottages on the slopes of Mount Kenya.",
    description: "Lantern-lit pathways connect six thatched cottages set in indigenous forest. Guided hikes, birding and dinners under the stars are all part of the stay.",
  },
  {
    slug: "rupingazi-river-cottage", name: "Rupingazi River Cottage", type: "Cottage", location: "Rupingazi, Embu",
    pricePerNight: 11000, bedrooms: 2, guests: 4,
    amenities: ["Garden", "Wi-Fi", "Parking", "Fireplace"],
    images: [villa, lodge, apartment], lat: -0.55, lng: 37.47,
    summary: "A riverside hideaway for quiet weekend escapes.",
    description: "Wake to the sound of the Rupingazi river in this private two-bedroom cottage surrounded by gardens — a perfect weekend escape from Nairobi.",
  },
  {
    slug: "njukiri-garden-villa", name: "Njukiri Garden Villa", type: "Villa", location: "Njukiri, Embu",
    pricePerNight: 22000, bedrooms: 4, guests: 8,
    amenities: ["Pool", "Garden", "Wi-Fi", "Parking", "Private chef"],
    images: [villa, hero, apartment], lat: -0.51, lng: 37.48,
    summary: "Family-friendly villa beside Njukiri forest.",
    description: "Spacious lawns, a pool and a fully equipped kitchen make this four-bedroom villa a favourite for family gatherings and celebrations.",
  },
  {
    slug: "embu-executive-residence", name: "Embu Executive Residence", type: "Apartment", location: "Blue Valley, Embu",
    pricePerNight: 9500, bedrooms: 1, guests: 2,
    amenities: ["Workspace", "Wi-Fi", "Gym", "Parking", "Housekeeping"],
    images: [apartment, villa, lodge], lat: -0.53, lng: 37.46,
    summary: "Refined one-bedroom residence for business travellers.",
    description: "A quiet, design-led apartment with a dedicated workspace and gym access — minutes from Embu's business district.",
  },
];

export const ALL_AMENITIES = Array.from(new Set(PROPERTIES.flatMap((p) => p.amenities))).sort();
export const PROPERTY_TYPES: PropertyType[] = ["Villa", "Apartment", "Boutique Lodge", "Cottage"];
export const getProperty = (slug: string) => PROPERTIES.find((p) => p.slug === slug);
export const formatKES = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

export interface PropertyFilters {
  type?: string | undefined;
  maxPrice?: number | undefined;
  minBedrooms?: number | undefined;
  guests?: number | undefined;
  amenities?: string[] | undefined;
}

export function filterProperties(list: Property[], f: PropertyFilters) {
  return list.filter(
    (p) =>
      (!f.type || p.type === f.type) &&
      (!f.maxPrice || p.pricePerNight <= f.maxPrice) &&
      (!f.minBedrooms || p.bedrooms >= f.minBedrooms) &&
      (!f.guests || p.guests >= f.guests) &&
      (!f.amenities?.length || f.amenities.every((a) => p.amenities.includes(a))),
  );
}
