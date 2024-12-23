class ApiError extends Error {
    statusCode: number;
    errors?: { path: string; message: string }[];
    constructor(
        message: string,
        statusCode: number,
        errors?: { path: string; message: string }[]
    ) {
        super(message || 'Something went wrong');
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static badRequest(message = 'Bad Request') {
        return new ApiError(message, 400);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(message, 403);
    }

    static notFound(message = 'Not Found') {
        return new ApiError(message, 404);
    }

    static conflict(message = 'Conflict') {
        return new ApiError(message, 409);
    }

    static internal(message = 'Internal Server Error') {
        return new ApiError(message, 500);
    }

    static validationFailed(errors: { path: string; message: string }[]) {
        if (!Array.isArray(errors) || errors.length === 0) {
            return new ApiError('Validation failed', 422, []);
        }
        const sanitizedErrors = errors.map((error) => ({
            path: error.path || 'unknown',
            message: error.message || 'Invalid input',
        }));
        return new ApiError('Validation failed', 422, sanitizedErrors);
    }
}

export default ApiError;
