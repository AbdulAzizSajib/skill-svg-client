"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { PageHero } from "@/components/admin/admin-shell";
import { useRequestSvgList } from "@/hooks/useRequestSvg";
import type { IRequestSvgListQuery, RequestSvgStatus } from "@/types/request-svg.types";

import { AdminRequestsFilters } from "./AdminRequestsFilters";
import { AdminRequestsTable } from "./AdminRequestsTable";

export default function AdminRequestsClient({
    initialQuery,
}: {
    initialQuery: IRequestSvgListQuery;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = useMemo<IRequestSvgListQuery>(() => {
        const page = Number(searchParams.get("page") ?? initialQuery.page ?? 1);
        const limit = Number(searchParams.get("limit") ?? initialQuery.limit ?? 50);
        return {
            page,
            limit,
            status:
                (searchParams.get("status") as RequestSvgStatus) ??
                initialQuery.status ??
                undefined,
            search: searchParams.get("search") || initialQuery.search || undefined,
        };
    }, [searchParams, initialQuery]);

    const { data, isLoading, isError, error, isFetching } = useRequestSvgList(query);

    const updateUrl = useCallback(
        (next: Partial<IRequestSvgListQuery>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(next)) {
                if (value === undefined || value === null || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            }
            router.push(`/admin/requests?${params.toString()}`);
        },
        [router, searchParams],
    );

    const items = data?.success ? data.data : [];
    const meta = data?.success ? data.meta : undefined;

    return (
        <>
            <PageHero
                eyebrow="Icon requests"
                title="Icons users are asking for"
                description="Review pending requests from the public catalog, then mark them as added once the matching SVG is published."
            />

            <AdminRequestsFilters
                query={query}
                onChange={(next) => updateUrl({ ...next, page: 1 })}
            />

            {isError ? (
                <p className="text-sm text-destructive">
                    Failed to load requests:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            ) : (
                <AdminRequestsTable
                    items={items}
                    loading={isLoading}
                    fetching={isFetching}
                    page={meta?.page ?? 1}
                    totalPages={meta?.totalPages ?? 1}
                    onPageChange={(page) => updateUrl({ page })}
                />
            )}
        </>
    );
}
