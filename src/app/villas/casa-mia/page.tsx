'use client';

import VillaLayout from '@/components/villas/VillaLayout';
import VillaBookingForm from '@/components/villas/VillaBookingForm';
import Image from 'next/image';
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
} from 'react-icons/fa';
import { useState } from 'react';

export default function VillaCasaMia() {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    '/images/villas/casa-mia/gallery1.jpg',
    '/images/villas/casa-mia/gallery2.jpg',
    '/images/villas/casa-mia/gallery3.jpg',
    '/images/villas/casa-mia/gallery4.jpg',
  ];

  const amenities = [
    { icon: <FaWifi className='w-6 h-6' />, name: 'Free WiFi' },
    { icon: <FaSnowflake className='w-6 h-6' />, name: 'Air Conditioning' },
    { icon: <FaBath className='w-6 h-6' />, name: 'Ensuite Bathroom' },
    { icon: <FaSwimmingPool className='w-6 h-6' />, name: 'Private Pool' },
    { icon: <FaTv className='w-6 h-6' />, name: 'Flat-screen TV' },
    { icon: <FaCoffee className='w-6 h-6' />, name: 'Coffee Machine' },
    { icon: <FaGlassMartiniAlt className='w-6 h-6' />, name: 'Minibar' },
  ];

  const basePrices = [
    { guests: 4, price: 30000 },
    { guests: 5, price: 32500 },
    { guests: 6, price: 35000 },
  ];

  return (
    <VillaLayout
      title='Villa Casa Mia | Dolce Vita Pushkar'
      description='Luxurious 3-bedroom villa with private pool and modern amenities at Dolce Vita Pushkar.'
      image='/images/villas/casa-mia/main.jpg'
    >
      {/* Hero Section */}
      <div className='relative h-[60vh] w-full'>
        <Image
          src={galleryImages[selectedImage] || '/images/villas/casa-mia/main.jpg'}
          alt='Villa Casa Mia'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>Villa Casa Mia</h1>
            <p className='text-xl md:text-2xl'>Luxury Redefined in Pushkar</p>
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
                      alt={`Villa Casa Mia - ${index + 1}`}
                      fill
                      className='object-cover rounded'
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className='relative h-96 w-full rounded-xl overflow-hidden'>
                <Image
                  src={galleryImages[selectedImage] || '/images/villas/casa-mia/main.jpg'}
                  alt='Villa Casa Mia'
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            {/* Villa Description */}
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Villa Overview</h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Experience the epitome of luxury in our spacious 3-bedroom Villa Casa Mia. Perfect
                for families or groups, this villa offers a private pool, modern amenities, and
                breathtaking views of the surrounding landscape.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl'>
                <div className='flex items-center'>
                  <FaHome className='text-primary-500 text-2xl mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Size</p>
                    <p className='font-medium'>251 m²</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <FaUsers className='text-primary-500 text-2xl mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Guests</p>
                    <p className='font-medium'>Up to 6</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <FaBed className='text-primary-500 text-2xl mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Bedrooms</p>
                    <p className='font-medium'>3</p>
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
                    <div className='text-primary-500 mr-3'>{amenity.icon}</div>
                    <span className='text-gray-700'>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className='lg:pl-8'>
            <VillaBookingForm
              villaId='casa-mia'
              villaName='Villa Casa Mia'
              basePrice={30000}
              maxGuests={6}
            />

            {/* Price Breakdown */}
            <div className='bg-gray-50 p-6 rounded-xl mt-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Price Details</h3>
              <div className='space-y-3'>
                {basePrices.map((price, index) => (
                  <div key={index} className='flex justify-between'>
                    <span className='text-gray-600'>{price.guests} Guests</span>
                    <span className='font-medium'>₹{price.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className='mt-4 pt-4 border-t border-gray-200'>
                <p className='text-sm text-gray-500'>*Prices are per night and exclude taxes</p>
                <p className='text-sm text-gray-500'>*Minimum stay may be required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VillaLayout>
  );
}
