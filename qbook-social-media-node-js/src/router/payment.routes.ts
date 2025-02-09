import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import { wrapAsync } from '../core';

const paymentRouter = Router();

paymentRouter.post('/checkout', wrapAsync(paymentController.checkout));

export default paymentRouter;
