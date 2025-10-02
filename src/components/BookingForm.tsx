'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';

const villas = [
  { id: 'casa-mia', name: 'Villa CASA MIA', maxGuests: 6 },
  { id: 'rosa', name: 'Villa Rosa', maxGuests: 4 },
  { id: 'la-villa-grande', name: 'La Villa Grande', maxGuests: 8 },
];

export default function BookingForm() {
  const [villaId, setVillaId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const totalGuests = adults + children;

  // Set default check-in to today and check-out to tomorrow
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!villaId) {
      alert('Please select a villa');
      return;
    }

    const selectedVilla = villas.find((villa) => villa.id === villaId);
    if (totalGuests > (selectedVilla?.maxGuests || 0)) {
      alert(`The selected villa can only accommodate up to ${selectedVilla?.maxGuests} guests.`);
      return;
    }

    // Navigate to the booking URL
    window.location.href = 'https://asiatech.in/booking_engine/index3?token=OTIyMA==';
  };

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden relative z-10 mx-auto max-w-6xl -mt-8'>
      <div className='flex items-center bg-primary-50 px-4 py-2'>
        <div className='flex items-center'>
          <svg className='w-5 h-5 text-primary-600 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              clipRule='evenodd'
              d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              fillRule='evenodd'
            />
          </svg>
          <span className='text-sm font-medium text-gray-800'>Best Rate Guarantee</span>
        </div>
      </div>
      <form className='p-4' onSubmit={handleSubmit}>
        <div className='flex flex-wrap items-end gap-2'>
          {/* Villa Selection */}
          <div className='flex-1 min-w-[180px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='villa'>
              Select Villa <span className='text-red-500'>*</span>
            </label>
            <select
              required
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-10'
              id='villa'
              value={villaId}
              onChange={(e) => setVillaId(e.target.value)}
            >
              <option value=''>-- Select Villa --</option>
              {villas.map((villa) => (
                <option key={villa.id} value={villa.id}>
                  {villa.name}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div className='flex-1 min-w-[150px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='check-in'>
              Check-in
            </label>
            <input
              required
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-10'
              id='check-in'
              min={today}
              type='date'
              value={checkIn || today}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          {/* Check-out Date */}
          <div className='flex-1 min-w-[150px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='check-out'>
              Check-out
            </label>
            <input
              required
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-10'
              id='check-out'
              min={checkIn || tomorrow}
              type='date'
              value={checkOut || tomorrow}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* Adults */}
          <div className='flex-1 min-w-[100px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='adults'>
              Adults
            </label>
            <select
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-10'
              id='adults'
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className='flex-1 min-w-[100px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='children'>
              Children
            </label>
            <select
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-10'
              id='children'
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>
          </div>

          {/* Promo Code */}
          <div className='flex-1 min-w-[150px]'>
            <label className='block text-xs font-medium text-gray-700 mb-1' htmlFor='promo-code'>
              Promo Code
            </label>
            <input
              className='w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 h-10'
              id='promo-code'
              placeholder='Enter code'
              type='text'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className='flex-1 min-w-[150px]'>
            <button
              className='w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-md h-10 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center'
              type='submit'
            >
              Check Availability
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
