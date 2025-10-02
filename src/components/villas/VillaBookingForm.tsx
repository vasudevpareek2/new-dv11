'use client';

import { useState, useCallback, FormEvent } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { api } from '@/lib/api';

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
  checkIn: Date | null;
  checkOut: Date | null;
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
  basePrice,
  maxGuests = 10,
  villaName,
  villaId,
}: VillaBookingFormProps) {
  const router = useRouter();
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const [dates, setDates] = useState<BookingDates>({
    checkIn: today,
    checkOut: tomorrow,
  });

  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (field: keyof BookingDates, value: Date | null) => {
    setDates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckAvailability = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dates.checkIn || !dates.checkOut) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
    const checkIn = formatDate(dates.checkIn);
    const checkOut = formatDate(dates.checkOut);

    // Navigate to the booking URL with parameters
    window.location.href = `https://asiatech.in/booking_engine/index3?token=OTIyMA==&check_in=${checkIn}&check_out=${checkOut}&adults=${guests}`;
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>Book Your Stay</h3>

      <form className='space-y-6'>
        {/* Check-in Date */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='checkIn'>
            Check-in Date
          </label>
          <input
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            id='checkIn'
            min={format(today, 'yyyy-MM-dd')}
            type='date'
            value={dates.checkIn ? format(dates.checkIn, 'yyyy-MM-dd') : ''}
            onChange={(e) =>
              handleDateChange('checkIn', e.target.value ? new Date(e.target.value) : null)
            }
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='checkOut'>
            Check-out Date
          </label>
          <input
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            id='checkOut'
            min={
              dates.checkIn
                ? format(addDays(dates.checkIn, 1), 'yyyy-MM-dd')
                : format(tomorrow, 'yyyy-MM-dd')
            }
            type='date'
            value={dates.checkOut ? format(dates.checkOut, 'yyyy-MM-dd') : ''}
            onChange={(e) =>
              handleDateChange('checkOut', e.target.value ? new Date(e.target.value) : null)
            }
          />
        </div>

        {/* Guests */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='guests'>
            Number of Guests
          </label>
          <select
            className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            id='guests'
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

        {/* Check Availability Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
          onClick={handleCheckAvailability}
        >
          {isLoading ? 'Checking...' : 'Check Rates & Availability'}
        </button>
      </form>
    </div>
  );
}
