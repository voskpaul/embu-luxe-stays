import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, PageHero, Section, jsonLd, seo } from "@/components/site/Shared";

const FAQ = [
  { q: "Do guests pay a fee to use LuxeLink EMBU?", a: "No. Our linking service is free for guests — you pay only the agreed property rate." },
  { q: "Are the properties verified?", a: "Yes. Every property is inspected in person by our Embu team before listing." },
  { q: "How quickly will I hear back?", a: "Most enquiries receive a reply within a few hours, and instantly on WhatsApp during business hours." },
  { q: "Can I list my property?", a: "Yes — submit your details and we'll arrange a viewing. We accept high-quality villas, apartments, cottages and lodges." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    ...seo("How It Works | Book Luxury Stays or List Your Property in Embu", "A simple process: tell us what you need, receive curated matches, confirm and enjoy. Property owners can list in four easy steps.", "/how-it-works"),
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })],
  }),
  component: HowItWorks,
});

function Steps({ steps }: { steps: [string, string][] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map(([t, d], i) => (
        <li key={t} className="rounded-2xl bg-card p-6 shadow-soft">
          <span className="font-display text-4xl font-extrabold text-gold">0{i + 1}</span>
          <h3 className="mt-3 text-lg font-bold text-navy">{t}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{d}</p>
        </li>
      ))}
    </ol>
  );
}

function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="How it works" title="Simple, personal, exceptional" intro="Whether you're travelling or hosting, we make luxury hospitality effortless." />
      <Section eyebrow="For guests" title="Your perfect stay in four steps">
        <Steps steps={[["Tell us your needs", "Dates, guests, budget and style — via form or WhatsApp."], ["Receive curated matches", "We send 2–3 verified properties that fit."], ["Confirm with confidence", "We secure your booking directly with the host."], ["Enjoy & relax", "Concierge support throughout your stay."]]} />
        <Link to="/contact" className="btn-gold mt-10">Enquire Now</Link>
      </Section>
      <Section muted eyebrow="For property owners" title="List your property with LuxeLink">
        <Steps steps={[["Submit your property", "Share details and photos in minutes."], ["Inspection visit", "Our curator visits to verify quality."], ["Professional listing", "We present your property to qualified guests."], ["Welcome guests", "Receive vetted bookings and dedicated support."]]} />
        <Link to="/list-your-property" className="btn-navy mt-10">List Your Property</Link>
      </Section>
      <Section eyebrow="FAQ" title="Frequently asked questions">
        <div className="max-w-3xl divide-y rounded-2xl border">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-navy">{f.q}</summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
