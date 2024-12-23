import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode,
        message: err.message,
        errors: err?.errors,
    });
};

const wrapAsync =
    (
        handler: (
            req: Request,
            res: Response,
            next?: NextFunction
        ) => Promise<void> | Promise<Response<any, Record<string, any>>>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export { errorHandler, wrapAsync };
