'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { loadRazorpay, RazorpayOptions, RazorpayPaymentSuccess } from '@/lib/razorpay';

type PriceTier = {
  guests: number;
  price: number;
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
};

type BookingDates = {
  checkIn: string;
  checkOut: string;
};

type BookingPayload = {
  amount: number;
  currency: string;
  receipt: string;
  notes: {
    villa: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    extraMattresses: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
};

type BookingResponse = {
  success: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  bookingId?: string;
  error?: string;
};

type VillaBookingFormProps = {
  basePrices?: PriceTier[];
  basePrice?: number;
  hasExtraMattress?: boolean;
  maxGuests: number;
  villaName: string;
  villaId: string;
};

export default function VillaBookingForm({
  basePrices: propBasePrices,
  basePrice,
  hasExtraMattress = false,
  maxGuests,
  villaName,
  villaId: _villaId,
}: VillaBookingFormProps) {
  const basePrices = propBasePrices || (basePrice ? [{ guests: 1, price: basePrice }] : []);

  const [guests, setGuests] = useState(1);
  const [extraMattresses, setExtraMattresses] = useState(0);
  const [dates, setDates] = useState<BookingDates>({ checkIn: '', checkOut: '' });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Load Razorpay script when component mounts
  useEffect(() => {
    const initializeRazorpay = async () => {
      try {
        await loadRazorpay();
        setIsRazorpayLoaded(true);
      } catch (error) {
        console.error('Failed to load Razorpay:', error);
        toast.error('Failed to load payment system. Please refresh the page.');
      }
    };

    initializeRazorpay();
  }, []);

  const calculateBasePrice = useCallback(() => {
    if (basePrices.length === 0) return 0;

    const sortedPrices = [...basePrices].sort((a, b) => a.guests - b.guests);
    let selectedPrice = sortedPrices[0].price;

    for (const tier of sortedPrices) {
      if (guests >= tier.guests) {
        selectedPrice = tier.price;
      } else {
        break;
      }
    }

    return selectedPrice;
  }, [basePrices, guests]);

  const calculateNumberOfNights = useCallback(() => {
    if (!dates.checkIn || !dates.checkOut) return 0;

    const checkInDate = new Date(dates.checkIn);
    const checkOutDate = new Date(dates.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return nightCount > 0 ? nightCount : 0;
  }, [dates.checkIn, dates.checkOut]);

  const calculateTotal = () => {
    const basePrice = calculateBasePrice();
    const nights = calculateNumberOfNights();
    const extraMattressPrice = hasExtraMattress ? extraMattresses * 2500 : 0;
    const subtotal = basePrice * nights + extraMattressPrice;
    const gst = subtotal * 0.18;

    return {
      subtotal,
      gst,
      total: subtotal + gst,
      nights,
    };
  };

  const { gst, total, nights } = calculateTotal();

  const handlePaymentSuccess = useCallback(
    async (response: RazorpayPaymentSuccess & { bookingId?: string }) => {
      console.log('Payment successful:', response);

      try {
        const verifyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/api/payments/verify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: response.bookingId,
            }),
          }
        );

        const data = await verifyResponse.json();

        if (!verifyResponse.ok) {
          throw new Error(data.error || 'Payment verification failed');
        }

        toast.success('Booking confirmed! We will contact you shortly.');
      } catch (error) {
        console.error('Payment verification error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment';
        toast.error(errorMessage);
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRazorpayLoaded) {
      toast.error('Payment system is still loading. Please wait...');
      return;
    }

    if (!dates.checkIn || !dates.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast.error('Please fill in all contact information');
      return;
    }

    try {
      setIsLoading(true);

      const requestPayload: BookingPayload = {
        amount: total , // Convert to paise
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          villa: villaName,
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
          guests,
          extraMattresses: hasExtraMattress ? extraMattresses : 0,
          customerName: contactInfo.name,
          customerEmail: contactInfo.email,
          customerPhone: contactInfo.phone,
        },
      };

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/payments/orders`.replace(/([^:]\/)\/+/g, '$1');
      
      console.log('Sending request to:', apiUrl);
      console.log('Request payload:', requestPayload);
      
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/payments/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        throw new Error(errorData.error || `Failed to create booking. Status: ${response.status}`);
      }

      const data: BookingResponse = await response.json();

      if (!data.orderId || !data.bookingId) {
        throw new Error('Invalid response from server: missing orderId or bookingId');
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount || requestPayload.amount,
        currency: data.currency || 'INR',
        name: 'Dolce Vita Villas',
        description: `Booking for ${villaName}`,
        order_id: data.orderId,
        handler: (response: RazorpayPaymentSuccess) => {
          handlePaymentSuccess({
            ...response,
            bookingId: data.bookingId,
          });
        },
        prefill: {
          name: contactInfo.name,
          email: contactInfo.email,
          contact: contactInfo.phone,
        },
        theme: {
          color: '#F37254',
        },
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
        retry: {
          enabled: true,
          max_count: 3,
        },
        timeout: 900, // 15 minutes
      };

      if (!window.Razorpay) {
        throw new Error('Razorpay not loaded. Please refresh the page and try again.');
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', (response: { error: { description?: string } }) => {
        console.error('Payment failed:', response.error);
        const errorMessage = response.error?.description || 'Payment failed. Please try again.';
        toast.error(errorMessage);
      });

      razorpay.open();
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process booking';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>Book Your Stay</h3>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Dates */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='checkIn' className='block text-sm font-medium text-gray-700 mb-1'>
              Check-in
            </label>
            <input
              type='date'
              id='checkIn'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='checkOut' className='block text-sm font-medium text-gray-700 mb-1'>
              Check-out
            </label>
            <input
              type='date'
              id='checkOut'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={dates.checkOut}
              onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label htmlFor='guests' className='block text-sm font-medium text-gray-700 mb-1'>
            Number of Guests
          </label>
          <select
            id='guests'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Extra Mattresses */}
        {hasExtraMattress && (
          <div>
            <label
              htmlFor='extraMattresses'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Extra Mattresses
            </label>
            <select
              id='extraMattresses'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={extraMattresses}
              onChange={(e) => setExtraMattresses(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Mattress' : 'Mattresses'} (₹{num * 2500})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Contact Information */}
        <div className='space-y-4'>
          <h4 className='text-lg font-medium text-gray-800'>Contact Information</h4>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phone'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h4 className='font-medium text-gray-800 mb-3'>Price Summary</h4>
          <div className='space-y-2'>
            {nights > 0 && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>
                  {nights} {nights === 1 ? 'Night' : 'Nights'} × ₹
                  {calculateBasePrice().toLocaleString()}
                </span>
                <span className='font-medium'>
                  ₹{(calculateBasePrice() * nights).toLocaleString()}
                </span>
              </div>
            )}
            {hasExtraMattress && extraMattresses > 0 && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>
                  {extraMattresses} Extra {extraMattresses === 1 ? 'Mattress' : 'Mattresses'}:
                </span>
                <span className='font-medium'>₹{(extraMattresses * 2500).toLocaleString()}</span>
              </div>
            )}
            <div className='flex justify-between'>
              <span className='text-gray-600'>GST (18%):</span>
              <span className='font-medium'>
                ₹{gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className='border-t border-gray-200 my-2'></div>
            <div className='flex justify-between text-lg font-bold'>
              <span>Total:</span>
              <span>₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <p className='text-sm text-gray-500 mt-2'>* Breakfast included in the price</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className='space-y-4'>
          <button
            type='submit'
            className='w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors'
            disabled={
              !dates.checkIn ||
              !dates.checkOut ||
              !contactInfo.name ||
              !contactInfo.email ||
              !contactInfo.phone ||
              isLoading
            }
          >
            {!dates.checkIn ||
            !dates.checkOut ||
            !contactInfo.name ||
            !contactInfo.email ||
            !contactInfo.phone
              ? 'Please fill all required fields'
              : isLoading
                ? 'Processing...'
                : 'Proceed to Payment'}
          </button>
          <p className='text-xs text-gray-500 text-center'>
            We accept UPI, Credit/Debit Cards, Netbanking, and Wallets
          </p>
        </div>
      </form>
    </div>
  );
}
