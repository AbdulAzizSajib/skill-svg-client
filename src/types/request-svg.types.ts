export type RequestSvgStatus = "PENDING" | "ADDED";

export interface IRequestSvg {
    id: string;
    name: string;
    ip?: string;
    country?: string;
    status: RequestSvgStatus;
    createdAt: string;
}

export interface IRequestSvgListQuery {
    page?: number;
    limit?: number;
    status?: RequestSvgStatus;
    search?: string;
}
