"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionCard } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import type { IRequestSvg } from "@/types/request-svg.types";

import { AdminRequestsRow } from "./AdminRequestsRow";

export function AdminRequestsTable({
    items,
    loading,
    fetching,
    page,
    totalPages,
    onPageChange,
}: {
    items: IRequestSvg[];
    loading?: boolean;
    fetching?: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    return (
        <SectionCard
            title="Requests"
            description={`${items.length} item${items.length === 1 ? "" : "s"} on this page`}
        >
            {loading ? (
                <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-14 animate-pulse rounded-xl border border-border/70 bg-muted/30"
                        />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                    No icon requests match the current filters.
                </p>
            ) : (
                <div
                    className="overflow-hidden rounded-xl border border-border/70"
                    data-fetching={fetching ? "true" : undefined}
                >
                    <div className="grid grid-cols-[1fr_140px_100px_160px_160px] items-center gap-4 border-b border-border/70 bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <span>Name</span>
                        <span>IP</span>
                        <span>Country</span>
                        <span>Requested</span>
                        <span className="text-right">Status</span>
                    </div>
                    <ul className="divide-y divide-border/70">
                        {items.map((request) => (
                            <AdminRequestsRow key={request.id} request={request} />
                        ))}
                    </ul>
                </div>
            )}

            {totalPages > 1 ? (
                <div className="mt-4 flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        <ChevronLeft className="size-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            ) : null}
        </SectionCard>
    );
}
