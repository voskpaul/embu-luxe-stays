import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { SITE } from "@/data/site";
import { Logo } from "./Logo";
import { NAV } from "./Header";
import { NewsletterForm } from "./Forms";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-on-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-on-navy/70">{SITE.tagline}. Curated luxury stays in Embu and the Mount Kenya region.</p>
          <div className="mt-5 flex gap-2">
            {[[SITE.socials.instagram, Instagram, "Instagram"], [SITE.socials.facebook, Facebook, "Facebook"], [SITE.socials.x, Twitter, "X"]].map(([href, Icon, label]) => {
              const I = Icon as typeof Instagram;
              return (
                <a key={label as string} href={href as string} aria-label={label as string} target="_blank" rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-on-navy/20 hover:border-gold hover:text-gold"><I className="h-4 w-4" /></a>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="eyebrow">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-on-navy/80 hover:text-gold">{n.label}</Link></li>)}
            <li><Link to="/list-your-property" className="text-on-navy/80 hover:text-gold">List Your Property</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/luxury-villas-embu" className="text-on-navy/80 hover:text-gold">Luxury Villas in Embu</Link></li>
            <li><Link to="/short-stays-embu" className="text-on-navy/80 hover:text-gold">Premium Short Stays</Link></li>
            <li><Link to="/boutique-lodges-mount-kenya" className="text-on-navy/80 hover:text-gold">Boutique Lodges near Mount Kenya</Link></li>
          </ul>
          <h2 className="eyebrow mt-8">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-on-navy/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{SITE.address}</li>
            <li><a href={SITE.phoneHref} className="flex gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex gap-2 hover:text-gold"><Mail className="h-4 w-4 text-gold" />{SITE.email}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">Newsletter</h2>
          <p className="mt-4 text-sm text-on-navy/70">New properties and exclusive offers, once a month.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-on-navy/10 py-6 text-center text-xs text-on-navy/60">
        © {new Date().getFullYear()} LuxeLink EMBU · Embu, Kenya
      </div>
    </footer>
  );
}
