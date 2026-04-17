"use server";

import { isAxiosError } from "axios";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";

type IRequestSvgPayload = {
    name: string;
};

export const createRequestSvgAction = async (
    payload: IRequestSvgPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const name = payload.name.trim();

    if (!name) {
        return { success: false, message: "Name is required" };
    }

    try {
        return await httpClient.post(endpoints.requestsvg.request, { name });
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    (error.response?.data as { message?: string } | undefined)?.message
                    ?? "Request failed",
            };
        }

        return {
            success: false,
            message: error instanceof Error ? error.message : "Request failed",
        };
    }
};
