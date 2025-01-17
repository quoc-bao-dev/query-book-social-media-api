import { NextFunction, Request, Response } from 'express';
const systemLogMiddleware =
    (accountType: 'user' | 'admin') =>
    (req: Request, res: Response, next: NextFunction) => {
        console.log(`[${accountType}] ${req.method} ${req.ip} -  ${req.url}`);
        next();
    };

export default systemLogMiddleware;
