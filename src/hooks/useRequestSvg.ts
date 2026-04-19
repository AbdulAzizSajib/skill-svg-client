"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { listRequestSvgAction } from "@/services/request-svg/list.action";
import { markRequestSvgAddedAction } from "@/services/request-svg/mark-added.action";
import type { IRequestSvgListQuery } from "@/types/request-svg.types";

export function useRequestSvgList(query: IRequestSvgListQuery = {}) {
    return useQuery({
        queryKey: queryKeys.requestSvg.list(query),
        queryFn: () => listRequestSvgAction(query),
        staleTime: 30 * 1000,
        refetchOnWindowFocus: "always",
    });
}

export function useMarkRequestSvgAdded() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => markRequestSvgAddedAction(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.requestSvg.lists() }),
    });
}
