import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/data/posts";
import { CtaBand, PageHero, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Insights & Travel Guides | Luxury Stays in Embu — LuxeLink Blog", "Guides to the best luxury stays in Embu, weekend escapes near Mount Kenya and what makes a high-end short-term rental.", "/blog"),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Luxury travel insights for Embu & Mount Kenya" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="sr-only">Latest articles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-lux">
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                <img src={p.image} alt="" loading="lazy" width={1200} height={800} className="aspect-[16/10] w-full object-cover" />
                <div className="p-6">
                  <time dateTime={p.date} className="text-xs font-semibold uppercase tracking-wider text-gold">{new Date(p.date).toLocaleDateString("en-KE", { dateStyle: "long" })}</time>
                  <h3 className="mt-2 text-xl font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
