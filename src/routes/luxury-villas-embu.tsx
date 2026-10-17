import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { CtaBand, PageHero, seo } from "@/components/site/Shared";
import { PropertyListing } from "@/components/site/PropertyListing";

export const Route = createFileRoute("/luxury-villas-embu")({
  head: () => seo("High-End Villas in Embu, Kenya | Private Pools & Mountain Views", "Book private luxury villas in Embu, Kenya with pools, chefs and Mount Kenya views. Personally verified by LuxeLink EMBU.", "/luxury-villas-embu"),
  component: () => (
    <>
      <PageHero eyebrow="Luxury villas" title="High-end villas in Embu, Kenya" image={hero}
        intro="Private pools, chefs on request and sweeping Mount Kenya views — ideal for families, celebrations and retreats." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><h2 className="sr-only">Available villas</h2><PropertyListing initial={{ type: "Villa" }} lockType /></section>
      <CtaBand title="Planning a group stay or celebration?" />
    </>
  ),
});
