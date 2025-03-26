import { Request, Response } from 'express';
import { createPaginationResponse, createResponse } from '../core';
import adminService from '../services/admin.service';
const AdminController = {
    async getInfo(req: Request, res: Response) {
        const adminId = req.userId;
        const adminInfo = await adminService.getInfo(adminId!);
        const response = createResponse({
            status: 200,
            message: 'Get info successful!',
            data: adminInfo,
        });
        res.status(response.status).json(response);
    },

    async getAllAccount(req: Request, res: Response) {
        const accounts = await adminService.getAllAccount();
        const response = createResponse({
            status: 200,
            data: accounts,
            message: 'get all account!',
        });
        res.status(response.status).json(response);
    },

    async getAccountWithPagination(req: Request, res: Response) {
        const { limit: limitQuery, page: pageQuery } = req.query;
        const limit = Number(limitQuery);
        const page = Number(pageQuery);

        const accounts = await adminService.getAllAccountWithPagination({
            limit,
            page,
        });

        const response = createPaginationResponse({
            status: 200,
            message: 'Get all account',
            data: accounts.data,
            pagination: {
                limit,
                page,
                total: accounts.total,
                hasNextPage: accounts.totalPage > page,
                hasPreviousPage: accounts.totalPage > 1,
            },
        });
        res.status(response.status).json(response);
    },

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
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            role,
            bio,
            address,
        } = req.body;

        const token = await adminService.createAccount({
            username,
            email,
            firstName,
            lastName,
            password,
            role,
            bio,
            address,
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
