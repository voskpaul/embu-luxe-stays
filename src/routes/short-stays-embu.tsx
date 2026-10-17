import { createFileRoute } from "@tanstack/react-router";
import apartment from "@/assets/apartment.jpg";
import { CtaBand, PageHero, seo } from "@/components/site/Shared";
import { PropertyListing } from "@/components/site/PropertyListing";

export const Route = createFileRoute("/short-stays-embu")({
  head: () => seo("Premium Short Stays in Embu | Serviced Apartments & Cottages", "Premium short stays in Embu — serviced apartments and private cottages for business travel and weekend escapes.", "/short-stays-embu"),
  component: () => (
    <>
      <PageHero eyebrow="Short stays" title="Premium short stays in Embu" image={apartment}
        intro="Serviced apartments and private cottages with hotel-grade comfort — for a night, a week or a month." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><h2 className="sr-only">Short stay properties</h2><PropertyListing initial={{ maxPrice: 15000 }} /></section>
      <CtaBand />
    </>
  ),
});
