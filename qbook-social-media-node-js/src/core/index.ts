import { ApiResponse, Pagination } from './ApiResponse';

export const createResponse = ({
    status = 200,
    message = 'Success',
    data,
}: {
    status: number;
    message: string;
    data?: any;
}) => {
    return ApiResponse.create(status, message, data);
};

export const createPaginationResponse = ({
    status,
    message,
    data,
    pagination,
}: {
    status: number;
    message: string;
    data: any;
    pagination: Pagination;
}) => {
    return ApiResponse.create(status, message, data, pagination);
};

export { errorHandler, wrapAsync } from './handler';
