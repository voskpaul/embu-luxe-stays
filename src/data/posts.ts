import hero from "@/assets/hero.jpg";
import lodge from "@/assets/lodge.jpg";
import villa from "@/assets/villa-interior.jpg";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  sections: { heading: string; body: string }[];
}

export const POSTS: Post[] = [
  {
    slug: "best-luxury-stays-in-embu",
    title: "The Best Luxury Stays in Embu (2026 Guide)",
    excerpt: "From hillside villas to forest lodges, our curated list of the finest luxury accommodation in Embu.",
    date: "2026-09-12", image: hero,
    sections: [
      { heading: "Why Embu is Kenya's quiet luxury secret", body: "Embu sits on the south-eastern slopes of Mount Kenya, just over two hours from Nairobi. Cool climate, tea and coffee country and dramatic mountain views make it an ideal base for refined, unhurried travel." },
      { heading: "Hillside villas with Mount Kenya views", body: "Villas on the Kirimiri ridge and in Njukiri offer private pools, chefs and space for families or groups seeking privacy." },
      { heading: "Boutique lodges near Mount Kenya", body: "For a closer connection to nature, forest lodges near Castle Forest combine thatched cottages with guided hikes and birding." },
    ],
  },
  {
    slug: "weekend-escapes-near-embu",
    title: "Weekend Escapes Near Embu: 5 Ideas for a Restorative Break",
    excerpt: "Waterfalls, forest walks and riverside cottages — how to spend a perfect premium weekend near Embu.",
    date: "2026-08-28", image: lodge,
    sections: [
      { heading: "Chase waterfalls", body: "Day trips to nearby falls pair beautifully with a riverside cottage stay along the Rupingazi." },
      { heading: "Walk the Njukiri forest", body: "Early-morning walks through indigenous forest are a calm way to start a slow weekend." },
      { heading: "Book a private chef", body: "Many LuxeLink villas offer private chefs serving local produce — ask our team when you enquire." },
    ],
  },
  {
    slug: "what-makes-a-high-end-short-term-rental",
    title: "What Makes a High-End Short-Term Rental?",
    excerpt: "The standards we verify before any property joins the LuxeLink EMBU collection.",
    date: "2026-07-15", image: villa,
    sections: [
      { heading: "Verified quality, not just photos", body: "Every property is visited in person. We check linens, water pressure, backup power, security and Wi-Fi speed." },
      { heading: "Hospitality-grade service", body: "Responsive hosts, clear check-in and on-call support separate a premium short stay from an ordinary rental." },
      { heading: "Location and privacy", body: "Great stays balance seclusion with access — near town, but far from noise." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
