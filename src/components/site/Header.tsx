import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3">Skip to content</a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" aria-label="LuxeLink EMBU home"><Logo /></Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} activeOptions={{ exact: n.to === "/" }}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-navy"
                  activeProps={{ className: "text-navy bg-gold-soft" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-gold hidden text-sm sm:inline-flex">Enquire Now</Link>
          <button className="grid h-12 w-12 place-items-center rounded-full lg:hidden" aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-base font-semibold"
                  activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "bg-gold-soft text-navy" }}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2"><Link to="/contact" onClick={() => setOpen(false)} className="btn-gold w-full">Enquire Now</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
