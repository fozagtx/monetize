import Link from "next/link";
import { ArrowRight, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 md:px-8">
        <nav className="relative flex items-center justify-between text-sm font-medium">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl text-gray-900"
          >
            <h1 className="flex size-1.5  items-center justify-center  bg-white text-base font-semibold tracking-tight">
              Monetize
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              Login
            </Link>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-black text-white hover:bg-gray-800"
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-10 text-center md:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute -left-64 -top-32 w-64 h-64 bg-pink-200/50 rounded-full blur-3xl" />
          <div className="absolute -right-64 -top-32 w-64 h-64 bg-blue-200/50 rounded-full blur-3xl" />
        </div>
        <div className="mb-4">
          <span className="inline-block rounded-full bg-gray-200/70 px-3 py-1 text-xs font-medium text-gray-600">
            Built on & Powered by Base
          </span>
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Monetize your skills on Base
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-gray-600 sm:text-xl">
          Upload any materials to generate a personalized course!
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 w-full">
          <div className="relative w-full rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 p-8 text-center backdrop-blur-sm">
            <iframe
              className="w-full h-96 rounded-lg"
              src="https://www.youtube.com/embed/ZLRhdTNBFPU?si=LfHzVG98JrrLDyAH&controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 md:px-8">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>Powered by together.ai</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-900">
              X
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Github
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
