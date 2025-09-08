import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import paymentController from '../controllers/payment.controller';

const router = Router();

// Debug middleware to log request start
const debugRequest = (req: Request, _res: Response, next: NextFunction) => {
  console.log(' [1/4] [Route] Request received at:', new Date().toISOString());
  console.log(' [1/4] [Route] Method:', req.method);
  console.log(' [1/4] [Route] Path:', req.path);
  console.log(' [1/4] [Route] Headers:', JSON.stringify(req.headers, null, 2));
  console.log(' [1/4] [Route] Body:', JSON.stringify(req.body, null, 2));
  next();
};

// Create a new order
router.post('/orders', [
  // Debug middleware
  debugRequest,

  // Validation middleware
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log(' [2/4] [Validation] Starting validation');
    next();
  },

  body('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom((value) => value > 0)
    .withMessage('Amount must be greater than 0'),

  body('currency')
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code'),

  (_req: Request, _res: Response, next: NextFunction) => {
    console.log(' [2/4] [Validation] Validation passed');
    next();
  },

  // Validation error handler
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(' [Validation] Validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    return next();
  },

  // Controller
  (req: Request, res: Response, next: NextFunction) => {
    console.log(' [3/4] [Controller] Reached payment controller');
    paymentController.createOrder(req, res).catch((error: Error) => {
      console.error(' [Controller] Error in payment controller:', error);
      next(error);
    });
  },
]);

// Verify payment
router.post(
  '/verify',
  [
    (req: Request, _res: Response, next: NextFunction) => {
      console.log(' [Verify Payment] Request received at:', new Date().toISOString());
      console.log(' [Verify Payment] Request body:', JSON.stringify(req.body, null, 2));
      return next();
    },
    body('razorpay_payment_id').isString().notEmpty(),
    body('razorpay_order_id').isString().notEmpty(),
    body('razorpay_signature').isString().notEmpty(),
    body('bookingId').optional().isString(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(' [Verify Payment] Validation failed:', errors.array());
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        });
      }
      return next();
    },
  ],
  paymentController.verifyPayment
);

export default router;
