import Link from "next/link";
import { conference } from "@/content/site";
import { EiffelTower } from "@/components/paris";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <EiffelTower className="h-24 w-auto text-toit" />
      <p className="mt-8 font-display text-4xl font-bold">404</p>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-brume">
        There is only one page here for now.
      </p>
      <Link
        href="/"
        className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-teal transition-opacity hover:opacity-70"
      >
        {conference.name} — {conference.dates}
      </Link>
    </main>
  );
}
