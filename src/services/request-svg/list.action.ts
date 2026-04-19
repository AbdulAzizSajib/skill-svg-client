"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { IRequestSvg, IRequestSvgListQuery } from "@/types/request-svg.types";

export const listRequestSvgAction = async (query: IRequestSvgListQuery = {}) => {
    return httpClient.get<IRequestSvg[]>(endpoints.requestsvg.list, { params: query });
};
