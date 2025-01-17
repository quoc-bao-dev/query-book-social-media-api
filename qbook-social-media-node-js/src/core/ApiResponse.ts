export type Pagination = {
    page: number;
    limit: number;
    totalPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    total: number;
};
class ApiResponse<T> {
    status: number;
    message: string;
    data: T;
    constructor(status: number, message: string, data: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static create<T>(
        status: number,
        message: string,
        data: T,
        pagination: Pagination
    ): ApiWithPaginationResponse<T>;
    static create<T>(
        status: number,
        message: string,
        data: T,
        pagination?: Pagination
    ): ApiResponse<T>;
    static create<T>(status: number, message: string, data: T): ApiResponse<T> {
        return new ApiResponse<T>(status, message, data);
    }
}

class ApiWithPaginationResponse<T> extends ApiResponse<T> {
    status: number;
    message: string;
    pagination: {
        page: number;
        limit: number;
        totalPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        total: number;
    };
    data: T;

    constructor(
        status: number,
        message: string,
        data: T,
        pagination: Pagination
    ) {
        super(status, message, data);

        this.status = status;
        this.message = message;
        this.data = data;

        const page = pagination.page;
        const totalPage = Math.ceil(pagination.total / pagination.limit);
        this.pagination = {
            page,
            limit: pagination.limit,
            totalPage,
            hasNextPage: page < totalPage,
            hasPreviousPage: page > 1,
            total: pagination.total,
        };
    }

    static create<T>(
        status: number,
        message: string,
        data: T,
        pagination: Pagination
    ) {
        return new ApiWithPaginationResponse<T>(
            status,
            message,
            data,
            pagination
        );
    }
}

export { ApiResponse, ApiWithPaginationResponse };
