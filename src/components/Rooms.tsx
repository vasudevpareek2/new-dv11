'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  capacity: string;
  image: string;
  features: string[];
};

const rooms: Room[] = [
  {
    id: 'rosa',
    name: 'Villa Rosa',
    description:
      'A romantic 2-bedroom villa with private pool and modern amenities, perfect for couples or small families.',
    price: 20000,
    size: '251 m²',
    capacity: 'Up to 4 Guests',
    image: '/images/villas/rosa/main.jpg',
    features: ['Private Pool', '2 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Flat-screen TV'],
  },
  {
    id: 'casa-mia',
    name: 'Villa CASA MIA',
    description:
      'Spacious 3-bedroom villa with private pool, perfect for families or groups seeking comfort and luxury.',
    price: 30000,
    size: '251 m²',
    capacity: 'Up to 6 Guests',
    image: '/images/villas/casa-mia/main.jpg',
    features: ['Private Pool', '3 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Coffee Machine'],
  },
  {
    id: 'la-villa-grande',
    name: 'La Villa Grande',
    description:
      'Our most luxurious 4-bedroom villa with private pool, perfect for large families or groups.',
    price: 45000,
    size: '279 m²',
    capacity: 'Up to 8 Guests',
    image: '/images/villas/la-villa-grande/main.jpg',
    features: ['Private Pool', '4 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Minibar'],
  },
];

export default function Rooms() {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className='py-20 bg-gray-50' id='rooms'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4 font-serif'>Our Villas</h2>
          <div className='w-20 h-1 bg-amber-500 mx-auto' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {rooms.map((room) => (
            <div
              key={room.id}
              className='group w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col'
            >
              <div className='relative w-full' style={{ aspectRatio: '3/4' }}>
                {!imageError[room.id] ? (
                  <div className='relative w-full h-full'>
                    <Image
                      fill
                      priority
                      alt={room.name}
                      className='object-cover transition-transform duration-700 group-hover:scale-110'
                      sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33.33vw'
                      src={room.image}
                      unoptimized={process.env.NODE_ENV !== 'production'}
                      onError={() => handleImageError(room.id)}
                    />
                  </div>
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-500'>Image not available</span>
                  </div>
                )}
                <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent'>
                  {/* Villa Name at Top */}
                  <div className='absolute left-1/2 top-10 transform -translate-x-1/2 w-full px-6 text-center'>
                    <h3 className='text-3xl md:text-4xl font-bold text-white font-serif tracking-wide'>
                      {room.name}
                      <div className='w-20 h-0.5 bg-amber-400 mx-auto mt-3 mb-4' />
                    </h3>
                  </div>

                  {/* Tagline at Bottom */}
                  <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full px-6 pb-8 text-center'>
                    <p className='text-white text-lg md:text-xl font-light italic mb-4'>
                      {room.id === 'rosa'
                        ? 'A romantic hideaway for couples, where elegance meets intimacy.'
                        : room.id === 'casa-mia'
                          ? 'Serene villa - A tranquil escape for family and friends.'
                          : 'The perfect destination for memorable reunions and milestones.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='p-6 bg-white flex justify-center'>
                <Link
                  className='bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 group'
                  href={`/villas/${room.id}`}
                >
                  Discover
                  <svg
                    className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
