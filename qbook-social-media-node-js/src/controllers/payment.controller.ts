import { Request, Response } from 'express';
import Stripe from 'stripe';
import config from '../config/config';

const stripe = new Stripe(config.STRIPE_PAYMENT_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia',
});
const paymentController = {
    checkout: async (req: Request, res: Response) => {
        const { accountType } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Your Product Name',
                        },
                        unit_amount: 1000, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/payment/cancel',
        });

        res.json({
            id: session.id,
        });
    },
};

export default paymentController;
