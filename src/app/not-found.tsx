import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-0px)] bg-background text-foreground flex items-center justify-center px-4 py-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 rounded-3xl border border-border/70 bg-card/70 p-6 shadow-lg backdrop-blur md:flex-row md:p-10">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            The page you are looking for does not exist, was moved, or the link is broken.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Back to home
            </Link>
            <Link
              href="/admin"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border/70 bg-background px-5 text-sm font-medium transition hover:bg-muted"
            >
              Go to dashboard
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-3 shadow-sm">
            <Image
              src="/not-found.svg"
              alt="404 illustration"
              width={720}
              height={520}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
