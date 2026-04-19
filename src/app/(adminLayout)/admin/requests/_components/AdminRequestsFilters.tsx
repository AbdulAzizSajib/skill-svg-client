"use client";

import { useEffect, useState } from "react";

import { SectionCard } from "@/components/admin/admin-shell";
import type { IRequestSvgListQuery, RequestSvgStatus } from "@/types/request-svg.types";

const STATUS_OPTIONS: Array<{ value: RequestSvgStatus | ""; label: string }> = [
    { value: "", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "ADDED", label: "Added" },
];

export function AdminRequestsFilters({
    query,
    onChange,
}: {
    query: IRequestSvgListQuery;
    onChange: (next: Partial<IRequestSvgListQuery>) => void;
}) {
    const [search, setSearch] = useState(query.search ?? "");

    useEffect(() => {
        setSearch(query.search ?? "");
    }, [query.search]);

    useEffect(() => {
        const handle = setTimeout(() => {
            if ((search || undefined) !== query.search) {
                onChange({ search: search || undefined });
            }
        }, 300);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <SectionCard title="Filters" description="Narrow the request queue by status or name.">
            <div className="flex flex-wrap items-center gap-3">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name..."
                    className="h-10 min-w-[220px] flex-1 rounded-lg border border-border/70 bg-background px-3 text-sm"
                />
                <select
                    value={query.status ?? ""}
                    onChange={(e) =>
                        onChange({ status: (e.target.value as RequestSvgStatus) || undefined })
                    }
                    className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value || "all"} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </SectionCard>
    );
}
