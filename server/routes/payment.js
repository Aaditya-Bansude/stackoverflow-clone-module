import express from 'express';
import { paymentCheckout } from '../controllers/subscription.js';

const router = express.Router();

router.post('/checkout', paymentCheckout)

export default router
