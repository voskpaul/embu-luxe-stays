import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/posts";
import { CtaBand, jsonLd, seo } from "@/components/site/Shared";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p, params }) => {
    if (!p) return { meta: [{ title: "Article unavailable — LuxeLink EMBU" }, { name: "robots", content: "noindex" }] };
    return {
      ...seo(`${p.title} | LuxeLink EMBU`, p.excerpt, `/blog/${params.slug}`, "article"),
      scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, author: { "@type": "Organization", name: "LuxeLink EMBU" } })],
    };
  },
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData();
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Link to="/blog" className="text-sm font-semibold text-navy hover:text-gold">← All insights</Link>
        <time dateTime={p.date} className="eyebrow mt-6 block">{new Date(p.date).toLocaleDateString("en-KE", { dateStyle: "long" })}</time>
        <h1 className="mt-3 text-4xl font-extrabold text-navy md:text-5xl">{p.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{p.excerpt}</p>
        <img src={p.image} alt={p.title} width={1200} height={800} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
        {p.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-2xl font-bold text-navy">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{s.body}</p>
          </section>
        ))}
        <Link to="/properties" className="btn-gold mt-12">View Available Properties</Link>
      </article>
      <CtaBand />
    </>
  );
}
