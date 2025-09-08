'use client';

import { useState } from 'react';
import { loadRazorpay, RazorpayOptions, RazorpayPaymentSuccess } from '@/lib/razorpay';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

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

  // Test function to debug API calls
  const testApiCall = async () => {
    try {
      console.log('Testing API call...');
      const response = await fetch('/apii/payments/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000,
          currency: 'INR',
          notes: {}
        })
      });
      
      console.log('Test response status:', response.status);
      console.log('Test response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.text();
      console.log('Test response body:', data);
      
      if (!response.ok) {
        console.error('Test API call failed:', response.status, data);
      } else {
        console.log('Test API call successful:', data);
      }
    } catch (error) {
      console.error('Test API call error:', error);
    }
  };

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
      console.log('Creating order with data:', {
        amount: Math.round(amount * 100),
        currency,
        notes: metadata,
      });
      
      const { data: orderData, error: orderError } = await api.post<OrderResponse>('/payments/orders', {
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        notes: metadata,
      });

      console.log('Order response:', { orderData, orderError });

      if (orderError || !orderData) {
        console.error('Order creation failed:', orderError);
        throw new Error(orderError?.message || 'Failed to create order');
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
            console.log('Verifying payment with data:', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            const { data: verifyData, error: verifyError } = await api.post<VerifyResponse>('/payments/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log('Verification response:', { verifyData, verifyError });

            if (verifyError || !verifyData) {
              console.error('Payment verification failed:', verifyError);
              throw new Error(verifyError?.message || 'Payment verification failed');
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
    <div className="flex gap-2">
      <button
        onClick={handlePayment}
        disabled={disabled || isLoading}
        className={`px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
        aria-busy={isLoading}
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
      
      {/* Debug button - remove this after testing */}
      <button
        onClick={testApiCall}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        Test API
      </button>
    </div>
  );
}
