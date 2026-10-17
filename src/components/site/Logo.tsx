export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 4 4 20v24h40V20L24 4Z" className="fill-navy" />
      <circle cx="24" cy="26" r="5" className="fill-none stroke-gold" strokeWidth="2.5" />
      <path d="M24 31v9m0-4h4m-4 3h3" className="stroke-gold" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 13c-1.5 2-1.5 3.5 0 5 1.5-1.5 1.5-3 0-5Zm-3 3c0 1.5 1 2.5 3 2.5m3-2.5c0 1.5-1 2.5-3 2.5" className="fill-gold stroke-gold" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-wide ${light ? "text-on-navy" : "text-navy"}`}>
          LuxeLink <span className="text-gold">EMBU</span>
        </span>
        <span className={`hidden text-[9px] tracking-[0.18em] sm:block ${light ? "text-on-navy/70" : "text-muted-foreground"}`}>
          HIGH-END HOSPITALITY
        </span>
      </span>
    </span>
  );
}
