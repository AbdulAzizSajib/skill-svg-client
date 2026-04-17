export default function Loading() {
    return (
        <section className="space-y-6 max-w-6xl mx-auto py-8">
            <header className="flex flex-col gap-3 text-center">
                <div className="h-9 w-3/4 max-w-xl rounded-md bg-muted mx-auto animate-pulse" />
                <div className="h-5 w-11/12 max-w-3xl rounded-md bg-muted mx-auto animate-pulse" />
            </header>

            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />

            <div className="flex flex-wrap gap-4 justify-center items-center sm:justify-start">
                {Array.from({ length: 180 }).map((_, i) => (
                    <div
                        key={i}
                        className="size-14 rounded-lg border border-border/70 bg-muted/50 animate-pulse"
                    />
                ))}
            </div>
        </section>
    );
}
