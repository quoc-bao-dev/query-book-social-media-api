import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { wrapAsync } from '../core';

const authRouter = Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Returns a test response
 *     responses:
 *       200:
 *         description: Successful response
 */
authRouter.post('/login', wrapAsync(AuthController.login));

export default authRouter;
