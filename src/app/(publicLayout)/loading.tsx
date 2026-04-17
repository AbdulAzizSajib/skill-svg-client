import { SvgCardSkeleton } from "./_components/SvgCardSkeleton";

export default function Loading() {
    return (
        <section className="space-y-6 max-w-6xl mx-auto py-8">
            <header className="flex flex-col gap-3 text-center">
                <div className="h-9 w-3/4 max-w-xl rounded-md bg-muted mx-auto animate-pulse" />
                <div className="h-5 w-11/12 max-w-3xl rounded-md bg-muted mx-auto animate-pulse" />
            </header>

            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12">
                {Array.from({ length: 48 }).map((_, i) => (
                    <SvgCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
