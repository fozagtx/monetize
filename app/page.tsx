import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute right-[-18%] top-1/4 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.28),transparent_70%)] blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
      </div>

      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 md:px-8">
        <nav className="relative flex items-center justify-between text-sm font-medium">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-semibold tracking-tight">
              ●
            </span>
            <span className="sr-only">Back to home</span>
          </Link>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-sm font-medium text-white/60 md:flex">
            <Link href="#features" className="transition-colors hover:text-white">
              Features
            </Link>
            <Link href="#docs" className="transition-colors hover:text-white">
              Docs
            </Link>
            <Link href="#company" className="transition-colors hover:text-white">
              Company
            </Link>
          </div>
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Log In
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-10 text-center md:px-8">
        <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/50">
          Built for Developers
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          Monetize your software
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-white/60 sm:text-xl">
          Turn your software into a business with 6 lines of code. Confident infrastructure, instant payments, and tooling that lets you ship without friction.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-[#030712] shadow-[0_25px_50px_-25px_rgba(255,255,255,0.85)] transition hover:bg-white/90"
          >
            <Link href="/create">
              Get Started
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
          >
            <Link href="#why">Why Base Monetize</Link>
          </Button>
        </div>
      </main>

      <div id="features" className="sr-only" aria-hidden="true" />
      <div id="docs" className="sr-only" aria-hidden="true" />
      <div id="company" className="sr-only" aria-hidden="true" />
      <div id="why" className="sr-only" aria-hidden="true" />
    </div>
  );
}
