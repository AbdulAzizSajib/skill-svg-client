"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useMarkRequestSvgAdded } from "@/hooks/useRequestSvg";
import { cn } from "@/lib/utils";
import type { IRequestSvg } from "@/types/request-svg.types";

function formatDate(iso: string) {
    try {
        return new Date(iso).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return iso;
    }
}

export function AdminRequestsRow({ request }: { request: IRequestSvg }) {
    const markAdded = useMarkRequestSvgAdded();

    const handleMarkAdded = () => {
        markAdded.mutate(request.id, {
            onSuccess: (res) => {
                if (res.success) {
                    toast.success(`Marked "${request.name}" as added`);
                } else {
                    toast.error(res.message);
                }
            },
            onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to mark as added"),
        });
    };

    const isAdded = request.status === "ADDED";

    return (
        <li className="grid grid-cols-[1fr_140px_100px_160px_160px] items-center gap-4 px-4 py-3">
            <div className="min-w-0">
                <p className="truncate font-medium">{request.name}</p>
                <p className="truncate text-xs text-muted-foreground">{request.id}</p>
            </div>

            <span className="truncate font-mono text-xs text-muted-foreground">
                {request.ip || "—"}
            </span>

            <span className="text-sm text-muted-foreground">{request.country || "—"}</span>

            <span className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</span>

            <div className="flex items-center justify-end gap-2">
                <span
                    className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.14em]",
                        isAdded
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-600",
                    )}
                >
                    {request.status}
                </span>
                {!isAdded ? (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleMarkAdded}
                        disabled={markAdded.isPending}
                    >
                        <Check className="size-3.5" />
                        {markAdded.isPending ? "Saving..." : "Mark added"}
                    </Button>
                ) : null}
            </div>
        </li>
    );
}
