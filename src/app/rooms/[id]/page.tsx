'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Import the Room type and rooms data from the data file
import { rooms } from '@/data/rooms';

export default function RoomPage() {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === id);

  if (!room) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
          <p className='text-xl text-gray-600 mb-8'>Villa not found</p>
          <Link
            href='/rooms'
            className='px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors'
          >
            Back to Villas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='relative h-96'>
        <Image src={room.image} alt={room.name} fill className='object-cover' />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center'>
          <div className='container mx-auto px-4'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>{room.name}</h1>
            <div className='flex items-center text-white space-x-4'>
              <span>{room.size}</span>
              <span>•</span>
              <span>{room.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-3 gap-12'>
          <div className='md:col-span-2'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Villa Details</h2>
            <p className='text-gray-600 mb-8 text-lg'>{room.description}</p>

            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Features</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12'>
              {room.features.map((feature, index) => (
                <div key={index} className='flex items-center p-4 bg-white rounded-lg shadow-sm'>
                  <svg
                    className='w-5 h-5 text-primary-500 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span className='text-gray-700'>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className='md:sticky md:top-8 h-fit'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-bold text-gray-900'>₹{room.price.toLocaleString()}</h3>
                <span className='text-gray-500'>per night</span>
              </div>

              <div className='space-y-4 mb-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Check-in</label>
                  <input
                    type='date'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Check-out</label>
                  <input
                    type='date'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Guests</label>
                  <select className='w-full px-4 py-2 border border-gray-300 rounded-md'>
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                  </select>
                </div>
              </div>

              <button className='w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors'>
                Book Now
              </button>

              <div className='mt-6 text-center text-sm text-gray-500'>
                <p>No credit card required to book</p>
                <p>Free cancellation up to 7 days before check-in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
