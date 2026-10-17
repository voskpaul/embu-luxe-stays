import { createFileRoute } from "@tanstack/react-router";
import villa from "@/assets/villa-interior.jpg";
import { ListPropertyForm } from "@/components/site/Forms";
import { PageHero, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/list-your-property")({
  head: () => seo("List Your Luxury Property in Embu | LuxeLink EMBU", "Own a high-end villa, apartment or lodge in Embu? List with LuxeLink EMBU and reach discerning guests.", "/list-your-property"),
  component: () => (
    <>
      <PageHero eyebrow="For owners" title="List your luxury property in Embu" image={villa} intro="Reach discerning guests and enjoy professional, personal support." />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy">Tell us about your property</h2>
        <div className="mt-6 rounded-2xl bg-card p-6 shadow-lux"><ListPropertyForm /></div>
      </section>
    </>
  ),
});
