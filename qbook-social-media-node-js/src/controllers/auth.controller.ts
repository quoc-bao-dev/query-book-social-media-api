import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { createResponse } from '../core';

const AuthController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        const response = createResponse({
            status: 200,
            message: 'Login successful',
            data: user,
        });

        res.status(response.status).json(response);
    },
};

export default AuthController;
