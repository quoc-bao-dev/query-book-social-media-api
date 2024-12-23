import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const logMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
};

export default logMiddleware;
