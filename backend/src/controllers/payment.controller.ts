import { Request, Response } from 'express';
import razorpayService from '../services/razorpay.service';
import notionService from '../services/notion.service';

class PaymentController {
  async createOrder(req: Request, res: Response) {
    console.log(' [Payment Controller] ====== NEW ORDER REQUEST ======');
    console.log(' [Payment Controller] Headers:', JSON.stringify(req.headers, null, 2));
    console.log(' [Payment Controller] Body:', JSON.stringify(req.body, null, 2));

    try {
      const { amount, currency = 'INR', receipt, notes } = req.body;

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
        villaName: notes.villa,
        checkIn: notes.checkIn,
        checkOut: notes.checkOut,
        guests: notes.guests || 1,
        extraMattresses: notes.extraMattresses || 0,
        customerName: notes.customerName,
        customerEmail: notes.customerEmail,
        customerPhone: notes.customerPhone,
        amount: Number(amount),
        status: 'pending' as const,
      };

      console.log(
        ' [Payment Controller] Creating booking in Notion with data:',
        JSON.stringify(bookingData, null, 2)
      );
      const notionResult = await notionService.createBooking(bookingData);

      if (!notionResult.success) {
        console.error(
          ' [Payment Controller] Failed to create booking in Notion:',
          notionResult.error
        );
        return res.status(500).json({
          success: false,
          error: 'Failed to create booking',
          details: notionResult.error,
        });
      }

      console.log(' Creating Razorpay order...');
      const result = await razorpayService.createOrder(Number(amount), currency);

      if (!result.success || !result.order) {
        console.error(' Razorpay order creation failed:', result.error);
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

  async verifyPayment(req: Request, res: Response) {
    console.log(' [Payment Controller] ====== VERIFY PAYMENT ======');
    console.log(' [Payment Controller] Request body:', JSON.stringify(req.body, null, 2));

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

      console.log(' [Payment Controller] Verifying payment with:', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature: razorpay_signature ? '***' : 'MISSING',
        bookingId: bookingId || 'MISSING',
      });

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        const error = 'Missing required payment verification data';
        console.error(' [Payment Controller]', error);
        return res.status(400).json({
          success: false,
          error,
        });
      }

      // Verify payment with Razorpay
      console.log(' [Payment Controller] Calling razorpayService.verifyPayment');
      const verification = await razorpayService.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      console.log(' [Payment Controller] Razorpay verification result:', {
        success: verification.success,
        error: verification.error || 'No error',
      });

      if (!verification.success) {
        // Update Notion booking status to 'failed'
        if (bookingId) {
          console.log(' [Payment Controller] Updating Notion booking status to failed');
          try {
            await notionService.updateBookingStatus(bookingId, 'failed');
            console.log(' [Payment Controller] Successfully updated Notion status to failed');
          } catch (notionError) {
            console.error(' [Payment Controller] Failed to update Notion status:', notionError);
          }
        } else {
          console.warn(' [Payment Controller] No bookingId provided, cannot update Notion status');
        }

        return res.status(400).json({
          success: false,
          error: verification.error || 'Payment verification failed',
        });
      }

      // Update Notion booking status to 'completed' and add payment IDs
      if (bookingId) {
        console.log(' [Payment Controller] Updating Notion booking status to completed');
        try {
          await notionService.updateBookingStatus(
            bookingId,
            'completed',
            razorpay_order_id,
            razorpay_payment_id
          );
          console.log(' [Payment Controller] Successfully updated Notion status to completed');
        } catch (notionError) {
          console.error(' [Payment Controller] Failed to update Notion status:', notionError);
          // Don't fail the request if Notion update fails
        }
      } else {
        console.warn(' [Payment Controller] No bookingId provided, cannot update Notion status');
      }

      console.log(' [Payment Controller] Payment verified successfully');
      return res.status(200).json({
        success: true,
        paymentId: razorpay_payment_id,
        message: 'Payment verified successfully',
      });
    } catch (error) {
      console.error(' [Payment Controller] Error in verifyPayment:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      // Update Notion booking status to 'failed' if bookingId is available
      if (req.body.bookingId) {
        try {
          console.log(' [Payment Controller] Error occurred, updating Notion status to failed');
          await notionService.updateBookingStatus(req.body.bookingId, 'failed');
        } catch (notionError) {
          console.error(
            ' [Payment Controller] Failed to update Notion status to failed:',
            notionError
          );
        }
      }

      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new PaymentController();
