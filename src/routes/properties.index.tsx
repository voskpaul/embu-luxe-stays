import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import villa from "@/assets/villa-interior.jpg";
import { CtaBand, PageHero, seo } from "@/components/site/Shared";
import { PropertyListing } from "@/components/site/PropertyListing";

export const Route = createFileRoute("/properties/")({
  validateSearch: z.object({ type: z.string().optional(), guests: z.number().optional() }),
  head: () => seo(
    "Luxury Properties in Embu | Villas, Apartments & Lodges — LuxeLink EMBU",
    "Browse verified high-end villas, serviced apartments and boutique lodges in Embu, Kenya. Filter by price, bedrooms and amenities.",
    "/properties",
  ),
  component: PropertiesPage,
});

function PropertiesPage() {
  const s = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Properties" title="Luxury properties in Embu & Mount Kenya" image={villa}
        intro="Every stay in our collection is personally inspected for quality, comfort and service." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="sr-only">Available properties</h2>
        <PropertyListing key={`${s.type}-${s.guests}`} initial={{ type: s.type, guests: s.guests }} />
      </section>
      <CtaBand title="Can't find the perfect fit?">We have off-market properties. Speak to our team.</CtaBand>
    </>
  );
}
