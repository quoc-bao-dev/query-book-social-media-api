import { Request, Response } from 'express';
import { createResponse } from '../core';
import addressService from '../services/address.service';

const addressController = {
    async getAddressByUser(req: Request, res: Response) {
        const userId = req.userId;
        const result = await addressService.getAddressByUser(userId!);

        const response = createResponse({
            status: 200,
            message: 'Get address successful',
            data: result,
        });

        res.status(response.status).json;
    },

    async createForUser(req: Request, res: Response) {
        const userId = req.userId;
        const {
            province,
            provinceSlug,
            provinceWithType,
            district,
            districtSlug,
            districtWithType,
            ward,
            wardSlug,
            wardWithType,
            address,
            country,
        } = req.body;

        const payload = {
            province,
            provinceSlug,
            provinceWithType,
            district,
            districtSlug,
            districtWithType,
            ward,
            wardSlug,
            wardWithType,
            address,
            country,
        };

        const result = await addressService.createAddressForUser(
            userId!,
            payload
        );

        const response = createResponse({
            status: 200,
            message: 'Create address successful',
            data: result,
        });

        res.status(response.status).json(response);
    },
};

export default addressController;
