// Central business details — swap for CMS values later.
export const SITE = {
  name: "LuxeLink EMBU",
  tagline: "High-End Hospitality & Accommodation Linking Service",
  phone: "+254 700 000 000",
  phoneHref: "tel:+254700000000",
  whatsapp: "254700000000",
  email: "hello@luxelinkembu.co.ke",
  address: "Embu Town, Embu County, Kenya",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    x: "https://x.com/",
  },
};

export const whatsappLink = (msg = "Hello LuxeLink EMBU, I'd like to enquire about a luxury stay.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: "Luxury accommodation linking service in Embu, Kenya — villas, apartments and boutique lodges near Mount Kenya.",
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: "Embu", addressRegion: "Embu County", addressCountry: "KE" },
  geo: { "@type": "GeoCoordinates", latitude: -0.5389, longitude: 37.4596 },
  areaServed: ["Embu", "Mount Kenya region", "Kirinyaga", "Meru"],
};
