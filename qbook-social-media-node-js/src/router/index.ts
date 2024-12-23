import { Router } from 'express';
import authRouter from './auth.routes';

const router = Router();

router.get('/', (req, res) => {
    res.json({ mess: 'successful' });
});

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Returns a test response
 *     responses:
 *       200:
 *         description: Successful response
 */
router.use('/auth', authRouter);

export default router;
