<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (properties, posts, business details) lives in `src/data/*`; pages read only from there so a CMS/API can replace it later.
- Lead forms validate with zod in `src/components/site/Forms.tsx` and hand off to WhatsApp; replace `submitLead` with a server function when a backend exists.
- Route SEO uses the `seo()` / `jsonLd()` helpers in `src/components/site/Shared.tsx` for consistent meta tags.
