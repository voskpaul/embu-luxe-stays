import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/Forms";
import { PageHero, seo } from "@/components/site/Shared";
import { SITE, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact LuxeLink EMBU | Enquire About Luxury Stays in Embu", "Speak to our Embu team by WhatsApp, phone or email. Enquire about luxury villas, apartments and lodges.", "/contact"),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: MessageCircle, label: "WhatsApp", value: "0740 779 094", href: whatsappLink() },
    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Office", value: SITE.address },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Speak to our team" intro="Tell us about your ideal stay — we'll reply within hours." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <section>
          <h2 className="text-2xl font-bold text-navy">Get in touch</h2>
          <ul className="mt-6 space-y-4">
            {items.map(({ icon: I, label, value, href }) => {
              const body = (<><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-soft"><I className="h-5 w-5 text-navy" /></span><span><span className="block text-sm text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></span></>);
              return <li key={label}>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl p-2 hover:bg-secondary">{body}</a> : <div className="flex items-center gap-4 p-2">{body}</div>}</li>;
            })}
          </ul>
          <iframe title="Map of Embu, Kenya" loading="lazy" className="mt-8 h-72 w-full rounded-2xl border" src="https://www.google.com/maps?q=Embu,Kenya&z=13&output=embed" />
        </section>
        <section className="h-fit rounded-2xl bg-card p-6 shadow-lux md:p-8">
          <h2 className="text-2xl font-bold text-navy">Send an enquiry</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">No fees, no obligation.</p>
          <EnquiryForm />
        </section>
      </div>
    </>
  );
}
