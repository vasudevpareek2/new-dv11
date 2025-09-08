'use client';

import { useState } from 'react';
import { loadRazorpay, RazorpayOptions, RazorpayPaymentSuccess } from '@/lib/razorpay';
import toast from 'react-hot-toast';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  buttonText?: string;
  customerDetails?: {
    name: string;
    email: string;
    contact: string;
  };
  metadata?: Record<string, string>;
  disabled?: boolean;
}

type OrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  error?: string;
};

type VerifyResponse = {
  success: boolean;
  error?: string;
};

export default function PaymentButton({
  amount,
  currency = 'INR',
  description = 'Booking Payment',
  onSuccess,
  onError,
  className = '',
  buttonText = 'Pay Now',
  customerDetails = {
    name: 'Customer Name',
    email: 'customer@example.com',
    contact: '9999999999',
  },
  metadata = {},
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      const error = new Error('Please enter a valid amount');
      toast.error(error.message);
      onError?.(error);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on our server
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/payments/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency,
          notes: metadata,
        }),
      });

      let orderData: OrderResponse;
      try {
        orderData = await orderRes.json();
      } catch (e) {
        throw new Error('Invalid response from server');
      }

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const { orderId, amount: orderAmount, currency: orderCurrency } = orderData;

      // 2. Load Razorpay script
      const Razorpay = await loadRazorpay();
      if (!Razorpay) {
        throw new Error('Failed to load payment provider');
      }

      // 3. Configure payment options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderAmount,
        currency: orderCurrency,
        name: 'Dolce Vita Villas',
        description,
        order_id: orderId,

        // Prefill customer details
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.contact,
        },

        // Theme
        theme: {
          color: '#F97316',
        },

        // Handle successful payment
        handler: async function (response: RazorpayPaymentSuccess) {
          try {
            // Verify payment on our server
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || ''}/api/payments/verify`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            let verifyData: VerifyResponse;
            try {
              verifyData = await verifyRes.json();
            } catch (e) {
              throw new Error('Invalid verification response');
            }

            if (verifyData.success) {
              toast.success('Payment successful!');
              onSuccess?.(response.razorpay_payment_id);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            const errorMessage =
              error instanceof Error ? error.message : 'Payment verification failed';
            toast.error(errorMessage);
            onError?.(error instanceof Error ? error : new Error(errorMessage));
          }
        },

        // Handle modal close
        modal: {
          ondismiss: () => {
            if (!isLoading) {
              toast('Payment was not completed', { icon: 'ℹ️' });
            }
          },
          escape: true,
          handle_back: true,
          confirm_close: true,
          backdropclose: true,
        },

        // Retry options
        retry: {
          enabled: true,
          max_count: 3,
        },

        // Timeout in seconds
        timeout: 900, // 15 minutes
      };

      // 4. Initialize Razorpay
      const paymentObject = new Razorpay(options);

      // Handle payment failure
      paymentObject.on('payment.failed', (response: any) => {
        const error = new Error(response.error?.description || 'Payment failed');
        console.error('Payment failed:', error);

        let errorMessage = 'Payment failed. Please try again.';
        if (response.error?.code === 'PAYMENT_CANCELLED') {
          errorMessage = 'Payment was cancelled';
        } else if (response.error?.code === 'NETWORK_ISSUE') {
          errorMessage = 'Network issue. Please check your connection and try again.';
        }

        toast.error(errorMessage);
        onError?.(error);
      });

      // 5. Open payment dialog
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Payment failed. Please try again.';
      toast.error(errorMessage);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      aria-busy={isLoading}
    >
      {isLoading ? 'Processing...' : buttonText}
    </button>
  );
}
