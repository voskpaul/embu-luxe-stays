import { Link } from "@tanstack/react-router";
import { BedDouble, MapPin, MessageCircle, Users } from "lucide-react";
import type { ReactNode } from "react";
import { formatKES, type Property } from "@/data/properties";
import { whatsappLink } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-on-navy shadow-lux transition-transform hover:scale-105">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-on-navy">
      {image && <img src={image} alt="" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-on-navy/85">{intro}</p>}
      </div>
    </section>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow hover:shadow-lux">
      <Link to="/properties/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={p.images[0]} alt={`${p.name} — ${p.type.toLowerCase()} in ${p.location}`} loading="lazy" width={1200} height={800}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-navy">{p.type}</span>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-navy">{p.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{p.location}</p>
          <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
            <span className="flex gap-4 text-muted-foreground">
              <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{p.bedrooms}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{p.guests}</span>
            </span>
            <span><strong className="text-navy">{formatKES(p.pricePerNight)}</strong><span className="text-muted-foreground"> /night</span></span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CtaBand({ title = "Ready for an exceptional stay?", children }: { title?: string; children?: ReactNode }) {
  return (
    <section className="bg-navy text-on-navy">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
          <p className="mt-2 text-on-navy/75">{children ?? "Tell us what you need — we'll link you to the perfect property within hours."}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-gold">Speak to Our Team</Link>
          <Link to="/properties" className="btn-outline">View Available Properties</Link>
        </div>
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, intro, children, muted }: { eyebrow?: string; title: string; intro?: string; children: ReactNode; muted?: boolean }) {
  return (
    <section className={muted ? "bg-secondary" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 max-w-3xl text-3xl font-extrabold text-navy md:text-4xl">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export const seo = (title: string, description: string, path: string, type = "website") => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: [{ rel: "canonical", href: path }],
});

export const jsonLd = (data: object) => ({ type: "application/ld+json", children: JSON.stringify(data) });
