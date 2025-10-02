'use client';

import VillaLayout from '@/components/villas/VillaLayout';
import VillaBookingForm from '@/components/villas/VillaBookingForm';
// Using require to avoid TypeScript errors with Next.js Image
const Image = require('next/image').default;
import {
  FaWifi,
  FaSwimmingPool,
  FaTv,
  FaCoffee,
  FaGlassMartiniAlt,
  FaSnowflake,
  FaBath,
  FaBed,
  FaUsers,
  FaHome,
  FaUtensils,
} from 'react-icons/fa';

// Fix icon props type
type IconProps = {
  size?: number;
  className?: string;
};
import { useState } from 'react';

export default function LaVillaGrande() {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    '/images/villas/la-villa-grande/gallery1.jpg',
    '/images/villas/la-villa-grande/gallery2.jpg',
    '/images/villas/la-villa-grande/gallery3.jpg',
    '/images/villas/la-villa-grande/gallery4.jpg',
  ];


  const amenities = [
    { icon: FaWifi, name: 'Free WiFi' },
    { icon: FaSnowflake, name: 'Air Conditioning' },
    { icon: FaBath, name: 'Ensuite Bathrooms' },
    { icon: FaSwimmingPool, name: 'Private Pool' },
    { icon: FaTv, name: 'Multiple Flat-screen TVs' },
    { icon: FaUtensils, name: 'Fully Equipped Kitchen' },
    { icon: FaGlassMartiniAlt, name: 'Minibar & Bar Area' },
    { icon: FaCoffee, name: 'Premium Coffee Machine' },
  ];

  // Price details removed

  return (
    <VillaLayout
      title='La Villa Grande | Dolce Vita Pushkar'
      description='Luxurious 4-bedroom villa with private pool and premium amenities at Dolce Vita Pushkar.'
      image='/images/villas/la-villa-grande/main.jpg'
    >
      {/* Hero Section */}
      <div className='relative h-[60vh] w-full'>
        <Image
          src={galleryImages[selectedImage] || '/images/villas/la-villa-grande/main.jpg'}
          alt='La Villa Grande'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>La Villa Grande</h1>
            <p className='text-xl md:text-2xl'>Ultimate Luxury in Pushkar</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 md:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Left Column - Villa Details */}
          <div className='lg:col-span-2'>
            {/* Image Gallery */}
            <div className='mb-12'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className={`relative h-24 cursor-pointer transition-opacity ${selectedImage === index ? 'ring-2 ring-primary-500' : 'opacity-75 hover:opacity-100'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img}
                      alt={`La Villa Grande - ${index + 1}`}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className='relative h-96 w-full rounded-xl overflow-hidden'>
                <Image
                  src={galleryImages[selectedImage] || '/images/villas/la-villa-grande/main.jpg'}
                  alt='La Villa Grande'
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            {/* Villa Description */}
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Villa Overview</h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Experience the pinnacle of luxury in our magnificent 4-bedroom La Villa Grande. This
                expansive 279 m² villa is perfect for large families or groups, offering a private
                pool, premium amenities, and breathtaking views of Pushkar's landscape.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl'>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaHome size={20} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Size</p>
                    <p className='font-medium'>279 m²</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaUsers size={20} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Guests</p>
                    <p className='font-medium'>Up to 8</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaBed size={20} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Bedrooms</p>
                    <p className='font-medium'>4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className='mb-12'>
              <h3 className='text-2xl font-semibold text-gray-900 mb-6'>Amenities</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                {amenities.map((amenity, index) => (
                  <div key={index} className='flex items-center'>
                    <div className='text-blue-500 mr-3'>
                      <amenity.icon size={20} />
                    </div>
                    <span className='text-gray-700'>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className='lg:pl-8'>
            <VillaBookingForm
              villaId='la-villa-grande'
              villaName='La Villa Grande'
              maxGuests={8}
            />
          </div>
        </div>
      </div>
    </VillaLayout>
  );
}
