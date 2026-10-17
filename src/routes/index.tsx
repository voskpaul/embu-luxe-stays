import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { KeyRound, ShieldCheck, Sparkles, Star, MapPinned } from "lucide-react";
import hero from "@/assets/hero.jpg";
import lodge from "@/assets/lodge.jpg";
import villa from "@/assets/villa-interior.jpg";
import { PROPERTIES, PROPERTY_TYPES } from "@/data/properties";
import { CtaBand, PropertyCard, Section, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/")({
  head: () => seo(
    "Luxury Accommodation Embu | Villas, Lodges & Short Stays — LuxeLink EMBU",
    "LuxeLink EMBU links discerning guests with high-end villas, premium short stays and boutique lodges near Mount Kenya. Verified luxury accommodation in Embu, Kenya.",
    "/",
  ),
  component: Home,
});

function SearchBar() {
  const navigate = useNavigate();
  return (
    <form role="search" aria-label="Find a property"
      onSubmit={(e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        navigate({ to: "/properties", search: { type: d.type || undefined, guests: Number(d.guests) || undefined } });
      }}
      className="mt-10 grid gap-3 rounded-2xl bg-background p-4 text-foreground shadow-lux sm:grid-cols-2 lg:grid-cols-5">
      <div><label htmlFor="s-loc" className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</label>
        <select id="s-loc" name="location" className="field"><option>Embu & surrounds</option><option>Embu Town</option><option>Mount Kenya slopes</option></select></div>
      <div><label htmlFor="s-in" className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Check-in</label>
        <input id="s-in" name="checkin" type="date" className="field" /></div>
      <div><label htmlFor="s-g" className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Guests</label>
        <select id="s-g" name="guests" className="field">{[1, 2, 4, 6, 8, 10].map((g) => <option key={g} value={g}>{g}+ guests</option>)}</select></div>
      <div><label htmlFor="s-t" className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Property type</label>
        <select id="s-t" name="type" className="field"><option value="">Any</option>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
      <button className="btn-gold self-end sm:col-span-2 lg:col-span-1">Search Stays</button>
    </form>
  );
}

const WHY = [
  { icon: ShieldCheck, t: "Personally verified", d: "Every property is inspected in person by our Embu team." },
  { icon: KeyRound, t: "Seamless linking", d: "One enquiry — we match, negotiate and confirm your stay." },
  { icon: Sparkles, t: "Concierge extras", d: "Private chefs, transfers and tours arranged on request." },
  { icon: MapPinned, t: "Local expertise", d: "Born-and-raised knowledge of Embu and Mount Kenya." },
];

const TESTIMONIALS = [
  { q: "The villa was beyond our expectations. LuxeLink handled everything — even a birthday dinner under the stars.", n: "Wanjiru K.", r: "Nairobi" },
  { q: "As a business traveller I need reliability. Fast Wi-Fi, a quiet space and a team that answers instantly.", n: "David O.", r: "Kampala" },
  { q: "The forest lodge near Mount Kenya was magical. We're already planning our return.", n: "Sarah & Tom", r: "London" },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-on-navy">
        <img src={hero} alt="Luxury villa with infinity pool overlooking Mount Kenya near Embu" width={1600} height={912}
          fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-36">
          <p className="eyebrow">High-end hospitality & accommodation linking service</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-7xl">
            Luxury accommodation in Embu, <span className="text-gold">curated for you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-on-navy/85">
            Private villas, refined apartments and boutique lodges on the slopes of Mount Kenya — personally verified and linked to you in hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties" className="btn-gold">View Available Properties</Link>
            <Link to="/contact" className="btn-outline">Enquire Now</Link>
          </div>
          <SearchBar />
        </div>
      </section>

      <Section eyebrow="Featured" title="Featured luxury properties in Embu" intro="A handpicked selection of our most requested stays.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.filter((p) => p.featured).map((p) => <PropertyCard key={p.slug} p={p} />)}
        </div>
        <Link to="/properties" className="btn-navy mt-10">View All Properties</Link>
      </Section>

      <Section muted eyebrow="Why LuxeLink" title="Exclusive stays, without the guesswork">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl bg-card p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-soft"><I className="h-6 w-6 text-navy" /></span>
              <h3 className="mt-4 text-lg font-bold text-navy">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Destinations" title="Discover Embu & the Mount Kenya region">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { img: villa, t: "Embu Town & Kirimiri Hills", d: "Elegant villas and penthouses close to town, with cool highland air and tea-country views.", to: "/luxury-villas-embu" as const },
            { img: lodge, t: "Mount Kenya Slopes", d: "Boutique forest lodges, guided hikes and starlit evenings near Castle Forest.", to: "/boutique-lodges-mount-kenya" as const },
          ].map((x) => (
            <Link key={x.t} to={x.to} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl">
              <img src={x.img} alt={x.t} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="hero-overlay absolute inset-0" />
              <div className="absolute bottom-0 p-6 text-on-navy">
                <h3 className="text-2xl font-bold">{x.t}</h3>
                <p className="mt-1 max-w-md text-sm text-on-navy/85">{x.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Testimonials" title="Loved by discerning guests">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.n} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 text-foreground/90">“{t.q}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-navy">{t.n} <span className="font-normal text-muted-foreground">· {t.r}</span></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
