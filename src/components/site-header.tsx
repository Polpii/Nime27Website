"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { conference, nav } from "@/content/site";

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="group flex items-baseline gap-2"
      aria-label={`${conference.name} home`}
    >
      <span className="font-display text-xl leading-none font-bold tracking-tight text-craie">
        NIME
      </span>
      <span className="font-display text-xl leading-none italic text-neon-or">2027</span>
      <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-neon-teal sm:inline">
        Paris
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open the page behind it must not scroll — otherwise
  // a swipe moves the page under a menu that stays put, which reads as broken.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-nuit/90 backdrop-blur-md" : "border-transparent bg-nuit"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 lg:px-8">
        <Wordmark onNavigate={close} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.09em] transition-colors ${
                  isActive(item.href) ? "text-neon-teal" : "text-brume hover:text-craie"
                }`}
              >
                {item.label}
                {item.children && (
                  <svg viewBox="0 0 10 6" className="h-[5px] w-[9px] opacity-60" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full w-60 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul className="mt-1 border border-white/10 bg-nuit-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]">
                    {item.children.map((child) => (
                      <li key={child.href} className="border-b border-white/5 last:border-0">
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-[13px] text-brume transition-colors hover:bg-white/5 hover:text-neon-teal"
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-craie lg:hidden"
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

      {/* The drawer scrolls inside itself rather than growing the document:
          every sub-item is listed, which is taller than a phone screen. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-nuit shadow-[0_24px_40px_-20px_rgba(0,0,0,0.9)] lg:hidden"
      >
        <nav className="mx-auto max-w-5xl px-5 py-2" aria-label="Main (mobile)">
          <ul className="divide-y divide-white/10">
            {nav.map((item) => (
              <li key={item.href} className="py-0.5">
                <Link
                  href={item.href}
                  onClick={close}
                  className={`block py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] ${
                    isActive(item.href) ? "text-neon-teal" : "text-craie"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-white/10 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          className="block py-1.5 text-[12px] text-brume"
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
