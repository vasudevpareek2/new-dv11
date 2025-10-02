'use client';

import { useState } from 'react';
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
import VillaLayout from '@/components/villas/VillaLayout';
import VillaBookingForm from '@/components/villas/VillaBookingForm';

export default function VillaCasaMia() {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    '/images/villas/casa-mia/gallery1.jpg',
    '/images/villas/casa-mia/gallery2.jpg',
    '/images/villas/casa-mia/gallery3.jpg',
    '/images/villas/casa-mia/gallery4.jpg',
  ];

  // Define icon components with consistent styling
  const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ width: '24px', height: '24px', marginRight: '12px', color: '#3B82F6' }}>
      {children as React.ReactElement}
    </div>
  );

  const amenities = [
    { icon: <FaWifi size={20} />, name: 'Free WiFi' },
    { icon: <FaSnowflake size={20} />, name: 'Air Conditioning' },
    { icon: <FaBath size={20} />, name: 'Ensuite Bathroom' },
    { icon: <FaSwimmingPool size={20} />, name: 'Private Pool' },
    { icon: <FaTv size={20} />, name: 'Flat-screen TV' },
    { icon: <FaCoffee size={20} />, name: 'Coffee Machine' },
    { icon: <FaGlassMartiniAlt size={20} />, name: 'Minibar' },
  ];

  // Price details removed

  return (
    <VillaLayout
      description='Luxurious 3-bedroom villa with private pool and modern amenities at Dolce Vita Pushkar.'
      image='/images/villas/casa-mia/main.jpg'
      title='Villa Casa Mia | Dolce Vita Pushkar'
    >
      {/* Hero Section */}
      <div className='relative h-[60vh] w-full'>
        <Image
          fill
          priority
          alt='Villa Casa Mia'
          className='object-cover rounded-lg'
          sizes='100vw'
          src='/images/villas/casa-mia/main.jpg'
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedImage(index);
                      }
                    }}
                    role='button'
                    tabIndex={0}
                  >
                    <Image
                      fill
                      alt={`Villa Casa Mia - ${index + 1}`}
                      className='object-cover rounded'
                      src={img}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className='relative h-96 w-full rounded-xl overflow-hidden'>
                <Image
                  fill
                  alt='Villa Casa Mia'
                  className='object-cover'
                  src={galleryImages[selectedImage] || '/images/villas/casa-mia/main.jpg'}
                />
              </div>
            </div>

            {/* Villa Description */}
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Villa Overview</h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Experience the epitome of luxury in our spacious 3-bedroom Villa Casa Mia. Perfect
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl'>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaHome size={20} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Size</p>
                    <p className='font-medium'>251 m²</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaUsers size={20} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Guests</p>
                    <p className='font-medium'>Up to 6</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='text-blue-500 mr-3'>
                    <FaBed size={20} />
                  </div>
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
                    <IconWrapper>{amenity.icon}</IconWrapper>
                    <span className='text-gray-700'>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className='lg:pl-8'>
            <VillaBookingForm maxGuests={6} villaId='casa-mia' villaName='Villa Casa Mia' />
          </div>
        </div>
      </div>
    </VillaLayout>
  );
}
