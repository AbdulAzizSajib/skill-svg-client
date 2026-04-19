import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { listRequestSvgAction } from "@/services/request-svg/list.action";
import type { IRequestSvgListQuery, RequestSvgStatus } from "@/types/request-svg.types";

import AdminRequestsClient from "./_components/AdminRequestsClient";

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    status?: string;
    search?: string;
}>;

function parseQuery(sp: Awaited<SearchParams>): IRequestSvgListQuery {
    return {
        page: sp.page ? Number(sp.page) : 1,
        limit: sp.limit ? Number(sp.limit) : 50,
        status: (sp.status as RequestSvgStatus) || undefined,
        search: sp.search || undefined,
    };
}

export default async function AdminRequestsPage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams;
    const query = parseQuery(sp);

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.requestSvg.list(query),
        queryFn: () => listRequestSvgAction(query),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminRequestsClient initialQuery={query} />
        </HydrationBoundary>
    );
}
