import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BedDouble, Check, MapPin, Users, CalendarDays } from "lucide-react";
import { useState } from "react";
import { formatKES, getProperty, PROPERTIES } from "@/data/properties";
import { EnquiryForm } from "@/components/site/Forms";
import { PropertyCard, jsonLd, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const p = getProperty(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p, params }) => {
    if (!p) return { meta: [{ title: "Property unavailable — LuxeLink EMBU" }, { name: "robots", content: "noindex" }] };
    const base = seo(`${p.name} — ${p.type} in ${p.location} | LuxeLink EMBU`, `${p.summary} ${p.bedrooms} bedrooms, sleeps ${p.guests}. From ${formatKES(p.pricePerNight)}/night.`, `/properties/${params.slug}`, "article");
    return {
      ...base,
      scripts: [jsonLd({
        "@context": "https://schema.org", "@type": "LodgingBusiness", name: p.name, description: p.description,
        address: { "@type": "PostalAddress", addressLocality: p.location, addressCountry: "KE" },
        geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
        amenityFeature: p.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
        priceRange: `${formatKES(p.pricePerNight)} per night`,
      })],
    };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const p = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const others = PROPERTIES.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-navy">Home</Link> / <Link to="/properties" className="hover:text-navy">Properties</Link> / <span className="text-foreground">{p.name}</span>
        </nav>
        <p className="eyebrow mt-6">{p.type}</p>
        <h1 className="mt-2 text-4xl font-extrabold text-navy md:text-5xl">{p.name}</h1>
        <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{p.location}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-[3fr_1fr]">
          <img src={p.images[active]} alt={`${p.name} photo ${active + 1}`} width={1200} height={800} className="aspect-[3/2] w-full rounded-2xl object-cover" />
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-pressed={i === active}
                className={`overflow-hidden rounded-xl ring-2 ${i === active ? "ring-gold" : "ring-transparent"}`}>
                <img src={img} alt="" loading="lazy" width={400} height={267} className="aspect-[3/2] h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <section>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-gold" />{p.bedrooms} bedrooms</span>
              <span className="flex items-center gap-2"><Users className="h-5 w-5 text-gold" />Sleeps {p.guests}</span>
              <span className="font-bold text-navy">{formatKES(p.pricePerNight)} / night</span>
            </div>
            <h2 className="mt-8 text-2xl font-bold text-navy">About this stay</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{p.description}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">Key amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.amenities.map((a) => <li key={a} className="flex items-center gap-2"><Check className="h-5 w-5 text-gold" />{a}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">Location</h2>
            <iframe title={`Map of ${p.location}`} loading="lazy" className="mt-4 h-80 w-full rounded-2xl border"
              src={`https://www.google.com/maps?q=${p.lat},${p.lng}&z=13&output=embed`} />
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">Availability</h2>
            {/* Placeholder: connect booking engine / iCal / IDX feed here. */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-muted-foreground">
              <CalendarDays className="h-10 w-10 text-gold" />
              <p>Live availability calendar coming soon. Send an enquiry and we'll confirm your dates within hours.</p>
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-card p-6 shadow-lux lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-navy">Enquire about this property</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">No booking fees. Our team replies fast.</p>
          <EnquiryForm property={p.name} />
        </aside>
      </div>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold text-navy">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{others.map((o) => <PropertyCard key={o.slug} p={o} />)}</div>
        </div>
      </section>
    </>
  );
}
