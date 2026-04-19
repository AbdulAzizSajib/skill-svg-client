import type { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { listSvgAction } from "@/services/svg/list.action";
import type { ISvgListQuery } from "@/types/svg.types";

import SvgBrowseClient from "./_components/SvgBrowseClient";

export const metadata: Metadata = {
    title: "Free tech stack SVG icons",
    description: SITE_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
        title: `${SITE_NAME} — Free tech stack SVG icons`,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
    },
    twitter: {
        title: `${SITE_NAME} — Free tech stack SVG icons`,
        description: SITE_DESCRIPTION,
    },
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
};

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    categoryId?: string;
    tag?: string;
    visibility?: string;
}>;

function parseQuery(sp: Awaited<SearchParams>): ISvgListQuery {
    return {
        page: sp.page ? Number(sp.page) : 1,
        limit: sp.limit ? Number(sp.limit) : 200,
        sortBy: (sp.sortBy as ISvgListQuery["sortBy"]) ?? "title",
        sortOrder: (sp.sortOrder as ISvgListQuery["sortOrder"]) ?? "asc",
        search: sp.search || undefined,
        categoryId: sp.categoryId || undefined,
        tag: sp.tag || undefined,
        visibility: (sp.visibility as ISvgListQuery["visibility"]) ?? "PUBLIC",
    };
}

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams;
    const query = parseQuery(sp);

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.svg.list(query),
        queryFn: () => listSvgAction(query),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <SvgBrowseClient />
        </HydrationBoundary>
    );
}
