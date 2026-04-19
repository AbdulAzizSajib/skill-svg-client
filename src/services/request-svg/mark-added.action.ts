/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { IRequestSvg } from "@/types/request-svg.types";

export const markRequestSvgAddedAction = async (
    id: string,
): Promise<ApiResponse<IRequestSvg> | ApiErrorResponse> => {
    try {
        return await httpClient.patch<IRequestSvg>(endpoints.requestsvg.markAdded(id), {});
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Mark as added failed: ${error.message}`,
        };
    }
};
