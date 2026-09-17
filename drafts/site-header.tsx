"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { conference, nav } from "@/content/site";

function Wordmark() {
  return (
    <Link href="/" className="group flex items-baseline gap-2" aria-label={`${conference.edition} home`}>
      <span className="font-display text-2xl leading-none font-bold tracking-tight text-encre">
        NIME
      </span>
      <span className="font-display text-2xl leading-none font-normal text-rouge italic">2027</span>
      <span className="hidden sm:inline-block plaque ml-1 rounded-[3px] px-2 py-[3px] text-[9px] font-semibold uppercase">
        Paris
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-pierre bg-craie/90 backdrop-blur-md"
          : "border-transparent bg-craie"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Wordmark />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.09em] transition-colors ${
                  isActive(item.href) ? "text-rouge" : "text-encre/75 hover:text-plaque"
                }`}
              >
                {item.label}
                {item.children && (
                  <svg viewBox="0 0 10 6" className="h-[5px] w-[9px] opacity-50" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full w-60 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul className="mt-1 border border-pierre bg-craie shadow-[0_18px_40px_-24px_rgba(14,22,38,0.55)]">
                    {item.children.map((child) => (
                      <li key={child.href} className="border-b border-pierre/60 last:border-0">
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-[13px] text-encre/80 transition-colors hover:bg-craie-2 hover:text-plaque"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center text-encre"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 22 16" className="h-4 w-5" aria-hidden="true">
            {open ? (
              <g stroke="currentColor" strokeWidth="1.6">
                <path d="M2 2l18 12M20 2L2 14" />
              </g>
            ) : (
              <g stroke="currentColor" strokeWidth="1.6">
                <path d="M0 2h22M0 8h22M0 14h22" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-pierre bg-craie lg:hidden"
      >
        <nav className="mx-auto max-w-6xl px-5 py-3" aria-label="Main (mobile)">
          <ul className="divide-y divide-pierre/70">
            {nav.map((item) => (
              <li key={item.href} className="py-1">
                <Link
                  href={item.href}
                  onClick={close}
                  className={`block py-2.5 text-sm font-semibold uppercase tracking-[0.08em] ${
                    isActive(item.href) ? "text-rouge" : "text-encre"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-pierre pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="block py-1.5 text-[13px] text-encre/70"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
