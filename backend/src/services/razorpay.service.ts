import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from 'dotenv';

// Load environment variables
config();

// Type definitions for Razorpay order response
interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

interface CreateOrderResponse {
  success: boolean;
  order?: RazorpayOrder;
  error?: string;
  details?: any; // For additional error details
}

interface VerifyPaymentResponse {
  success: boolean;
  paymentId?: string;
  error?: string;
}

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Verify Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Error: Razorpay credentials are not properly configured in environment variables');
  console.log('Current RAZORPAY_KEY_ID exists:', !!process.env.RAZORPAY_KEY_ID);
  console.log('Current RAZORPAY_KEY_SECRET exists:', !!process.env.RAZORPAY_KEY_SECRET);
}

class RazorpayService {
  async createOrder(amount: number, currency: string = 'INR'): Promise<CreateOrderResponse> {
    console.log('🔵 [Razorpay Service] ====== CREATE ORDER ======');
    console.log('🔵 [Razorpay Service] Amount:', amount, 'Currency:', currency);
    
    try {
      // Verify credentials are set
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        const error = new Error('Razorpay credentials not configured in environment variables');
        console.error('❌ [Razorpay Service] Error:', error.message);
        console.log('🔍 [Razorpay Service] RAZORPAY_KEY_ID exists:', !!process.env.RAZORPAY_KEY_ID);
        console.log('🔍 [Razorpay Service] RAZORPAY_KEY_SECRET exists:', !!process.env.RAZORPAY_KEY_SECRET);
        throw error;
      }

      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        const error = new Error(`Invalid amount: ${amount}. Amount must be a positive number`);
        console.error('❌ [Razorpay Service] Validation error:', error.message);
        throw error;
      }
      
      console.log('🔵 [Razorpay Service] Credentials verified and amount validated');

      // Amount is already in paise (smallest currency unit) from the frontend
      const options = {
        amount: Math.round(amount), // No need to multiply by 100, already in paise
        currency: currency || 'INR',
        receipt: `rcpt_${Date.now()}`,
        payment_capture: 1,
        notes: {
          source: 'dolce-vita-villas',
          created_at: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development'
        }
      };

      console.log(' Razorpay order options:', {
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        key_id: process.env.RAZORPAY_KEY_ID ? '***' + process.env.RAZORPAY_KEY_ID.slice(-4) : 'not set',
        environment: process.env.NODE_ENV || 'development'
      });

      console.log(' Sending request to Razorpay API...');
      const order = await razorpay.orders.create(options) as RazorpayOrder;
      
      if (!order || !order.id) {
        const error = new Error('Failed to create order: Invalid response from Razorpay');
        console.error(' Error:', error.message);
        console.error(' Razorpay response:', order);
        throw error;
      }
      
      console.log(' Successfully created Razorpay order:', {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status
      });
      
      return { 
        success: true, 
        order 
      };
      
    } catch (error: any) {
      console.error(' [Razorpay Service] Error in createOrder:', {
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        isAxiosError: error.isAxiosError,
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          headers: error.config.headers ? Object.keys(error.config.headers) : undefined,
          data: error.config.data
        } : undefined,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        } : undefined
      });
      
      // Extract meaningful error message
      let errorMessage = 'Failed to create payment order';
      let errorDetails: any = error.message;
      
      if (error.error) {
        // Handle Razorpay error response
        console.error(' Razorpay error details:', error.error);
        if (error.error.description) {
          errorMessage = error.error.description;
        } else if (error.error.error) {
          errorMessage = error.error.error.description || JSON.stringify(error.error.error);
        }
        errorDetails = error.error;
      } else if (error.response?.data) {
        // Handle HTTP error response
        console.error(' HTTP error response:', error.response.data);
        errorMessage = error.response.data.error?.message || error.response.data.message || errorMessage;
        errorDetails = error.response.data;
      }
      
      return { 
        success: false, 
        error: errorMessage,
        details: errorDetails
      };
    }
  }

  async verifyPayment(
    razorpayOrderId: string, 
    razorpayPaymentId: string, 
    razorpaySignature: string
  ): Promise<VerifyPaymentResponse> {
    try {
      if (!process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay credentials not configured');
      }

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        throw new Error('Missing required payment verification parameters');
      }

      const text = `${razorpayOrderId}|${razorpayPaymentId}`;
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      const isValid = crypto.timingSafeEqual(
        Buffer.from(generatedSignature, 'utf8'),
        Buffer.from(razorpaySignature, 'utf8')
      );
      
      if (!isValid) {
        console.warn('Invalid payment signature:', { 
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          expectedSignature: generatedSignature,
          receivedSignature: razorpaySignature
        });
        return { 
          success: false, 
          error: 'Invalid payment signature' 
        };
      }
      
      // Optionally fetch and verify payment details
      // const payment = await razorpay.payments.fetch(razorpayPaymentId);
      // if (payment.status !== 'captured') {
      //   return { 
      //     success: false, 
      //     error: `Payment status is ${payment.status}` 
      //   };
      // }
      
      return { 
        success: true, 
        paymentId: razorpayPaymentId 
      };
    } catch (error: any) {
      console.error('Error verifying payment:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to verify payment' 
      };
    }
  }
}

export default new RazorpayService();
