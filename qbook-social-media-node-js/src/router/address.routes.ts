import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import addressController from '../controllers/address.controller';
import { wrapAsync } from '../core';

const addressRouter = Router();

addressRouter.get(
    '/user',
    authMiddleware,
    wrapAsync(addressController.getAddressByUser)
);

addressRouter.post(
    '/create',
    authMiddleware,
    wrapAsync(addressController.createForUser)
);

export default addressRouter;
