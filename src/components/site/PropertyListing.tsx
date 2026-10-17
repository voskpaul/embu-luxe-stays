import { useMemo, useState } from "react";
import { ALL_AMENITIES, PROPERTIES, PROPERTY_TYPES, filterProperties, type PropertyFilters } from "@/data/properties";
import { PropertyCard } from "./Shared";

export function PropertyListing({ initial = {}, lockType }: { initial?: PropertyFilters; lockType?: boolean }) {
  const [f, setF] = useState<PropertyFilters>(initial);
  const results = useMemo(() => filterProperties(PROPERTIES, f), [f]);
  const toggle = (a: string) =>
    setF((s) => ({ ...s, amenities: s.amenities?.includes(a) ? s.amenities.filter((x) => x !== a) : [...(s.amenities ?? []), a] }));

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside aria-label="Filter properties" className="h-fit space-y-5 rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
        {!lockType && (
          <div>
            <label htmlFor="ft" className="mb-1.5 block text-sm font-semibold">Property type</label>
            <select id="ft" className="field" value={f.type ?? ""} onChange={(e) => setF({ ...f, type: e.target.value || undefined })}>
              <option value="">All types</option>
              {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="fp" className="mb-1.5 block text-sm font-semibold">Max price / night</label>
          <select id="fp" className="field" value={f.maxPrice ?? ""} onChange={(e) => setF({ ...f, maxPrice: Number(e.target.value) || undefined })}>
            <option value="">Any price</option>
            {[10000, 15000, 25000, 40000].map((v) => <option key={v} value={v}>Up to KES {v.toLocaleString()}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fb" className="mb-1.5 block text-sm font-semibold">Bedrooms</label>
          <select id="fb" className="field" value={f.minBedrooms ?? ""} onChange={(e) => setF({ ...f, minBedrooms: Number(e.target.value) || undefined })}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((v) => <option key={v} value={v}>{v}+ bedrooms</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Amenities</legend>
          <div className="flex flex-wrap gap-2">
            {ALL_AMENITIES.map((a) => {
              const on = f.amenities?.includes(a);
              return (
                <button key={a} type="button" aria-pressed={on} onClick={() => toggle(a)}
                  className={`min-h-10 rounded-full border px-3 text-xs font-semibold ${on ? "border-navy bg-navy text-on-navy" : "hover:border-gold"}`}>
                  {a}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button type="button" className="text-sm font-semibold text-navy underline" onClick={() => setF(lockType ? { type: initial.type } : {})}>Reset filters</button>
      </aside>
      <div>
        <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "property" : "properties"} available</p>
        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{results.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
        ) : (
          <p className="rounded-2xl bg-secondary p-10 text-center">No properties match — try fewer filters, or ask our team for off-market options.</p>
        )}
      </div>
    </div>
  );
}
