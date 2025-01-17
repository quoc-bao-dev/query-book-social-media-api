import { Request, Response } from 'express';
import { createResponse } from '../core';
import adminService from '../services/admin.service';
const AdminController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await adminService.login(email, password);
        const response = createResponse({
            status: 200,
            message: 'Login successful',
            data: token,
        });
        res.status(response.status).json(response);
    },

    async createAccount(req: Request, res: Response) {
        const { username, email, password, role } = req.body;
        const token = await adminService.createAccount({
            username,
            email,
            password,
            role,
        });
        const response = createResponse({
            status: 200,
            message: 'Create account successful',
            data: token,
        });
        res.status(response.status).json(response);
    },
};
export default AdminController;
