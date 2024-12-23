export type Pagination = {
    page: number;
    limit: number;
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
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    constructor(
        status: number,
        message: string,
        data: T,
        pagination: Pagination
    ) {
        super(status, message, data);
        this.pagination = {
            page: pagination.page,
            limit: pagination.limit,
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
