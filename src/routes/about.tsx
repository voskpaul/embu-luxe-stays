import { createFileRoute } from "@tanstack/react-router";
import villa from "@/assets/villa-interior.jpg";
import lodge from "@/assets/lodge.jpg";
import { CtaBand, PageHero, Section, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/about")({
  head: () => seo("About LuxeLink EMBU | Local Luxury Hospitality Experts in Embu", "Meet the Embu-based team linking guests to exceptional luxury stays across Embu and the Mount Kenya region.", "/about"),
  component: About,
});

const TEAM = [
  { n: "Grace Wanjiku", r: "Founder & Director", d: "Fifteen years in Kenyan luxury hospitality." },
  { n: "Brian Njiru", r: "Property Curator", d: "Inspects and onboards every LuxeLink property." },
  { n: "Mercy Karimi", r: "Guest Concierge", d: "Your contact for chefs, transfers and tours." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Exceptional stays, linked with local care" image={lodge} />
      <Section eyebrow="Our story" title="Born in Embu, built on hospitality">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4 text-foreground/85">
            <p>LuxeLink EMBU began with a simple observation: Embu has remarkable properties, but discerning guests struggled to find and trust them.</p>
            <p>We set out to change that — personally visiting every villa, apartment and lodge, and connecting guests with the stays that truly match their expectations.</p>
            <h3 className="pt-4 text-xl font-bold text-navy">Our mission</h3>
            <p>To link every guest to an exceptional stay, and every quality property owner to the guests who will cherish it.</p>
          </div>
          <img src={villa} alt="Elegant villa living room curated by LuxeLink EMBU" loading="lazy" width={1200} height={800} className="rounded-2xl shadow-lux" />
        </div>
      </Section>
      <Section muted eyebrow="Our team" title="Local expertise you can trust">
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((t) => (
            <div key={t.n} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-navy font-display text-xl font-bold text-gold" aria-hidden="true">{t.n.split(" ").map((x) => x[0]).join("")}</div>
              <h3 className="mt-4 text-lg font-bold text-navy">{t.n}</h3>
              <p className="text-sm font-semibold text-gold">{t.r}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
