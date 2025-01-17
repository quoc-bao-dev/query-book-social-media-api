import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import { wrapAsync } from '../core';

const adminRouter = Router();

adminRouter.post('/login', wrapAsync(AdminController.login));
adminRouter.post('/create-account', wrapAsync(AdminController.createAccount));

export default adminRouter;
