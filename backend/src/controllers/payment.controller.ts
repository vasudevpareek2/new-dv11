import { Request, Response } from 'express';
import razorpayService from '../services/razorpay.service';
import notionService from '../services/notion.service';

// Define interfaces at the top level
interface PaymentRequest {
  amount: string | number;
  currency?: string;
  receipt?: string;
  notes?: {
    villa?: string;
    checkIn?: string;
    checkOut?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    [key: string]: any;
  };
}

interface VerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  bookingId?: string;
}

class PaymentController {
  async createOrder(req: Request, res: Response): Promise<Response> {
    console.log(' [Payment Controller] ====== NEW ORDER REQUEST ======');
    console.log(' [Payment Controller] Headers:', JSON.stringify(req.headers, null, 2));
    console.log(' [Payment Controller] Body:', JSON.stringify(req.body, null, 2));

    let notionPageId: string | null = null;

    try {
      const { amount, currency = 'INR', receipt, notes } = req.body as PaymentRequest;

      console.log(' [Payment Controller] Extracted data:', {
        amount,
        currency,
        receipt,
        notes: JSON.stringify(notes, null, 2),
      });

      if (!amount || isNaN(Number(amount))) {
        const error = new Error(`Invalid amount: ${amount}. Amount must be a valid number`);
        console.error(' [Payment Controller] Validation error:', error.message);
        return res.status(400).json({
          success: false,
          error: 'Valid amount is required',
          details: error.message,
        });
      }

      if (
        !notes?.villa ||
        !notes.checkIn ||
        !notes.checkOut ||
        !notes.customerName ||
        !notes.customerEmail ||
        !notes.customerPhone
      ) {
        const error = new Error('Missing required booking information');
        console.error(' [Payment Controller] Validation error:', error.message);
        return res.status(400).json({
          success: false,
          error: 'Missing required booking information',
          details: 'Villa details, dates, and customer information are required',
        });
      }

      // Create booking in Notion with 'pending' status
      const bookingData = {
        villaName: String(notes.villa || ''),
        checkIn: String(notes.checkIn || ''),
        checkOut: String(notes.checkOut || ''),
        guests: notes.guests ? parseInt(String(notes.guests)) : 1,
        extraMattresses: notes.extraMattresses ? parseInt(String(notes.extraMattresses)) : 0,
        customerName: String(notes.customerName || ''),
        customerEmail: String(notes.customerEmail || ''),
        customerPhone: String(notes.customerPhone || '').replace(/\D/g, ''), // Remove non-numeric chars
        amount: Math.round(Number(amount) * 100), // Convert to paise
        status: 'pending' as const,
      };

      console.log('🔍 Validating booking data...');
      const validationErrors = [];
      if (!bookingData.villaName) validationErrors.push('Villa name is required');
      if (!bookingData.checkIn) validationErrors.push('Check-in date is required');
      if (!bookingData.checkOut) validationErrors.push('Check-out date is required');
      if (!bookingData.customerName) validationErrors.push('Customer name is required');
      if (!bookingData.customerEmail) validationErrors.push('Customer email is required');
      if (!bookingData.customerPhone) validationErrors.push('Customer phone is required');
      
      if (validationErrors.length > 0) {
        console.error('❌ Validation errors:', validationErrors);
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationErrors,
        });
      }

      console.log('📝 Creating booking in Notion with data:', JSON.stringify(bookingData, null, 2));
      
      const notionResult = await notionService.createBooking(bookingData);
      console.log('📊 Notion API response:', JSON.stringify(notionResult, null, 2));

      if (!notionResult.success) {
        console.error('❌ Failed to create booking in Notion:', notionResult.error);
        return res.status(500).json({
          success: false,
          error: 'Failed to create booking in Notion',
          details: notionResult.error,
          validation: validationErrors.length > 0 ? validationErrors : undefined,
        });
      }

      console.log('✅ Successfully created Notion booking. Page ID:', notionResult.pageId);
      
      // Store the Notion page ID for later use
      if (notionResult.pageId) {
        notionPageId = notionResult.pageId;
      } else {
        console.warn('No pageId returned from Notion, but operation was marked as successful');
      }
      
      // Continue with Razorpay order creation
      console.log(' Creating Razorpay order...');
      const result = await razorpayService.createOrder(Number(amount), currency);

      if (!result.success || !result.order) {
        console.error('❌ Razorpay order creation failed:', result.error);
        
        // Update Notion booking status to 'failed' if Razorpay fails
        if (notionPageId) {
          try {
            await notionService.updateBookingStatus(notionPageId, 'failed');
          } catch (updateError) {
            console.error('Failed to update Notion status after Razorpay failure:', updateError);
          }
        }
        
        return res.status(500).json({
          success: false,
          error: result.error || 'Failed to create order',
          details: result.details || 'No additional details available',
        });
      }

      console.log(' Razorpay order created successfully:', {
        orderId: result.order.id,
        amount: result.order.amount,
        currency: result.order.currency,
      });

      return res.status(200).json({
        success: true,
        orderId: result.order.id,
        amount: result.order.amount,
        currency: result.order.currency,
        bookingId: notionResult.pageId, // Return Notion page ID for reference
      });
    } catch (error) {
      console.error(' [Payment Controller] Error in createOrder:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async verifyPayment(req: Request, res: Response): Promise<Response> {
    try {
      // Type assertion with validation
      const body = req.body as VerifyPaymentRequest;
      const { 
        razorpay_payment_id, 
        razorpay_order_id, 
        razorpay_signature, 
        bookingId 
      } = body;
      
      // Validate required fields
      const missingFields: string[] = [];
      if (!razorpay_payment_id) missingFields.push('razorpay_payment_id');
      if (!razorpay_order_id) missingFields.push('razorpay_order_id');
      if (!razorpay_signature) missingFields.push('razorpay_signature');
      
      if (missingFields.length > 0) {
        const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
        console.error(' [Payment Controller] Validation error:', errorMessage);
        
        return res.status(400).json({
          success: false,
          error: errorMessage
        });
      }

      console.log(' [Payment Controller] Verifying payment with Razorpay:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature ? `${razorpay_signature.substring(0, 10)}...` : 'undefined',
        bookingId
      });

      // Verify the payment with Razorpay
      const verificationResult = await razorpayService.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!verificationResult.success) {
        console.error(' [Payment Controller] Payment verification failed:', verificationResult.error);
        
        // Update Notion booking status to 'failed' if verification fails
        if (bookingId) {
          try {
            console.log(` [Payment Controller] Updating Notion booking ${bookingId} status to 'failed'`);
            await notionService.updateBookingStatus(bookingId, 'failed');
          } catch (updateError) {
            console.error(' [Payment Controller] Failed to update Notion status after verification failure:', updateError);
          }
        }
        
        return res.status(400).json({
          success: false,
          error: 'Payment verification failed',
          details: verificationResult.error
        });
      }

      console.log(' [Payment Controller] Payment verified successfully:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        bookingId
      });

      // Update Notion booking status to 'completed' on successful payment
      if (bookingId) {
        try {
          console.log(`✅ [Payment Controller] Updating Notion booking ${bookingId} status to 'completed'`);
          await notionService.updateBookingStatus(bookingId, 'completed');
          console.log(`✅ [Payment Controller] Successfully updated Notion booking status to 'completed'`);
        } catch (updateError) {
          const err = updateError as Error;
          console.error('❌ [Payment Controller] Failed to update Notion status after successful payment:', {
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            bookingId
          });
          // Continue even if Notion update fails, since payment was successful
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        bookingId
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      console.error(' [Payment Controller] Error in verifyPayment:', {
        error: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      });

      // Update Notion booking status to 'failed' if bookingId is available
      const requestBody = req.body as { bookingId?: string };
      if (requestBody.bookingId) {
        try {
          console.log('⚠️ [Payment Controller] Error occurred, updating Notion status to failed');
          // Ensure bookingId is a string before passing to updateBookingStatus
          const bookingId = String(requestBody.bookingId);
          await notionService.updateBookingStatus(bookingId, 'failed');
        } catch (notionError) {
          const err = notionError as Error;
          console.error('❌ [Payment Controller] Failed to update Notion status to failed:', {
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
          });
        }
      }

      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        details: errorMessage
      });
    }
  }
}

export default new PaymentController();
