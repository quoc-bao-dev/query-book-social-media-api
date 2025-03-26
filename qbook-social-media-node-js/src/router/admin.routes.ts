import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import { wrapAsync } from '../core';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const adminRouter = Router();

adminRouter.get(
    '/get-account-info',
    adminMiddleware(['admin', 'moderator', 'super-admin']),
    wrapAsync(AdminController.getInfo)
);
adminRouter.get('/get-accounts', wrapAsync(AdminController.getAllAccount));
adminRouter.get(
    '/get-account-with-pagination',
    wrapAsync(AdminController.getAllAccount)
);
adminRouter.post('/login', wrapAsync(AdminController.login));
adminRouter.post('/create-account', wrapAsync(AdminController.createAccount));

export default adminRouter;
