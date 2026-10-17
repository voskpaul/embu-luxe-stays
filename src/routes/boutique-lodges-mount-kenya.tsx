import { createFileRoute } from "@tanstack/react-router";
import lodge from "@/assets/lodge.jpg";
import { CtaBand, PageHero, seo } from "@/components/site/Shared";
import { PropertyListing } from "@/components/site/PropertyListing";

export const Route = createFileRoute("/boutique-lodges-mount-kenya")({
  head: () => seo("Boutique Lodges near Mount Kenya | Forest Retreats from Embu", "Discover boutique lodges near Mount Kenya — thatched forest cottages, guided hikes and starlit dinners, a short drive from Embu.", "/boutique-lodges-mount-kenya"),
  component: () => (
    <>
      <PageHero eyebrow="Boutique lodges" title="Boutique lodges near Mount Kenya" image={lodge}
        intro="Forest cottages, mountain air and intimate service on the slopes of Africa's second-highest peak." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><h2 className="sr-only">Available lodges</h2><PropertyListing initial={{ type: "Boutique Lodge" }} lockType /></section>
      <CtaBand />
    </>
  ),
});
