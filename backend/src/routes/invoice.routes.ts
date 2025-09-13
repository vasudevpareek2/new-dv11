import { Router } from 'express';
import { invoiceController } from '../controllers/invoice.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Generate invoice (protected route)
router.post('/generate', authMiddleware, invoiceController.generateInvoice);

// Create payment link and generate invoice (protected route)
router.post('/create-payment', authMiddleware, invoiceController.createPaymentAndInvoice);

// Verify payment and update invoice (public route - called by Razorpay webhook)
router.post('/verify-payment', invoiceController.verifyPaymentAndUpdateInvoice);

export default router;
