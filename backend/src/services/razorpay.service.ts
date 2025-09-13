import Razorpay from 'razorpay';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

export interface RazorpayPaymentLinkResponse {
  id: string;
  short_url: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'expired' | 'partially_paid' | 'cancelled';
  description: string;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  created_at: number;
  updated_at: number;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: string[];
  created_at: number;
}

export interface RazorpayPaymentResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: 'captured' | 'failed';
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, string>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  created_at: number;
}

export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
      throw new Error('Razorpay keyId and keySecret are required');
    }

    this.razorpay = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret,
    });
  }

  async createPaymentLink(params: {
    amount: number;
    currency: string;
    customer: {
      name: string;
      email: string;
      contact: string;
    };
    description: string;
    notes?: Record<string, string>;
  }): Promise<RazorpayPaymentLinkResponse> {
    try {
      const paymentLink = await this.razorpay.paymentLink.create({
        amount: params.amount * 100, // Convert to paise
        currency: params.currency,
        accept_partial: false,
        description: params.description,
        customer: {
          name: params.customer.name,
          email: params.customer.email,
          contact: params.customer.contact,
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: true,
        notes: params.notes || {},
        callback_url: `${config.appUrl}/payment/callback`,
        callback_method: 'get',
      });

      return {
        id: String(paymentLink.id),
        short_url: String(paymentLink.short_url),
        amount: Number(paymentLink.amount) / 100, // Convert back to rupees
        currency: String(paymentLink.currency),
        status: paymentLink.status as 'created' | 'paid' | 'expired' | 'partially_paid' | 'cancelled',
        description: String(paymentLink.description || ''),
        customer: {
          name: String(paymentLink.customer?.name || ''),
          email: String(paymentLink.customer?.email || ''),
          contact: String(paymentLink.customer?.contact || ''),
        },
        notes: typeof paymentLink.notes === 'object' && paymentLink.notes !== null 
          ? (paymentLink.notes as Record<string, string>)
          : {},
        created_at: Number(paymentLink.created_at || Math.floor(Date.now() / 1000)),
        updated_at: Number(paymentLink.updated_at || Math.floor(Date.now() / 1000)),
      };
    } catch (error) {
      console.error('Error creating Razorpay payment link:', error);
      throw new Error('Failed to create payment link');
    }
  }

  async verifyWebhookSignature(
    webhookBody: any,
    signature: string
  ): Promise<boolean> {
    try {
      if (!config.razorpay.webhookSecret) {
        throw new Error('Razorpay webhook secret is not configured');
      }

      const generatedSignature = crypto
        .createHmac('sha256', config.razorpay.webhookSecret)
        .update(JSON.stringify(webhookBody))
        .digest('hex');

      return generatedSignature === signature;
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  async capturePayment(paymentId: string, amount: number): Promise<boolean> {
    try {
      await this.razorpay.payments.capture(paymentId, amount * 100, 'INR'); // Convert to paise and specify currency
      return true;
    } catch (error) {
      console.error('Error capturing payment:', error);
      return false;
    }
  }

  async createOrder(amount: number, currency: string = 'INR'): Promise<RazorpayOrderResponse> {
    try {
      const options = {
        amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
        currency,
        receipt: `order_${uuidv4()}`,
        payment_capture: 1,
      };

      const order = await this.razorpay.orders.create(options);
      
      // Transform the response to match our interface
      const transformedOrder: RazorpayOrderResponse = {
        id: order.id,
        entity: order.entity,
        amount: Number(order.amount),
        amount_paid: Number(order.amount_paid || 0),
        amount_due: Number(order.amount_due || order.amount),
        currency: order.currency,
        receipt: order.receipt || '',
        offer_id: order.offer_id || null,
        status: order.status as 'created' | 'attempted' | 'paid',
        attempts: order.attempts || 0,
        notes: Array.isArray(order.notes) ? order.notes : [],
        created_at: order.created_at || Math.floor(Date.now() / 1000),
      };
      
      return transformedOrder;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create order');
    }
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
    try {
      const text = orderId + '|' + paymentId;
      const generatedSignature = crypto
        .createHmac('sha256', config.razorpay.keySecret)
        .update(text)
        .digest('hex');

      return generatedSignature === signature;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  async fetchPayment(paymentId: string): Promise<RazorpayPaymentResponse | null> {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      // Transform the response to match our interface
      return {
        ...payment,
        amount: Number(payment.amount),
        amount_refunded: Number(payment.amount_refunded),
        fee: Number(payment.fee || 0),
        tax: Number(payment.tax || 0),
        created_at: payment.created_at || Math.floor(Date.now() / 1000),
        notes: payment.notes || {},
      } as RazorpayPaymentResponse;
    } catch (error) {
      console.error('Error fetching payment:', error);
      return null;
    }
  }
}

export const razorpayService = new RazorpayService();