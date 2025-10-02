'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

/*
// Commented out for future use

type DiningOption = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  timing: string;
};

const diningOptions: DiningOption[] = [
  {
    id: 'main-restaurant',
    title: 'La Cucina',
    description:
      'Our signature restaurant serving a fusion of local Rajasthani flavors and international cuisine. Experience fine dining with a breathtaking view of the Aravalli hills.',
    image: '/dining/restaurant-placeholder.jpg',
    features: [
      'Breakfast: 7:00 AM - 10:30 AM',
      'Lunch: 12:30 PM - 3:30 PM',
      'Dinner: 7:30 PM - 11:00 PM',
      'Indoor & Outdoor Seating',
      'Live Cooking Stations',
      'Vegetarian & Non-Vegetarian Options',
    ],
    timing: '7:00 AM - 11:00 PM',
  },
  {
    id: 'pool-bar',
    title: 'The Oasis Bar',
    description:
      'A relaxed poolside bar offering refreshing cocktails, fresh juices, and light snacks. The perfect spot to unwind after a day of exploring Pushkar.',
    image: '/dining/bar-placeholder.jpg',
    features: [
      '11:00 AM - 11:00 PM',
      'Signature Cocktails',
      'Fresh Juices & Mocktails',
      'Light Bites & Snacks',
      'Poolside Service Available',
      'Sunset Happy Hours',
    ],
    timing: '11:00 AM - 11:00 PM',
  },
  {
    id: 'cafe',
    title: 'Dolce Caffè',
    description:
      'A cozy café serving premium coffee, teas, and delicious pastries throughout the day. Enjoy the perfect blend of local and international coffee traditions.',
    image: '/dining/cafe-placeholder.jpg',
    features: [
      '7:00 AM - 10:00 PM',
      'Artisanal Coffee & Tea',
      'Freshly Baked Pastries',
      'Light Meals & Sandwiches',
      'Free Wi-Fi',
      'Indoor & Garden Seating',
    ],
    timing: '7:00 AM - 10:00 PM',
  },
];
*/

export default function DiningPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow flex items-center justify-center bg-gray-50'>
        <div className='text-center px-4 py-20 max-w-4xl mx-auto'>
          <div className='mb-8'>
            <div className='w-24 h-1 bg-amber-500 mx-auto mb-6' />
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif'>
              Coming Soon
            </h1>
            <div className='w-24 h-1 bg-amber-500 mx-auto my-6' />
            <p className='text-xl md:text-2xl text-gray-600 mb-8'>
              We&apos;re crafting an exceptional dining experience for you.
            </p>
            <p className='text-gray-500 max-w-2xl mx-auto mb-8'>
              Our culinary team is working hard to bring you a unique dining experience that
              combines local flavors with international cuisine. Please check back soon for updates.
            </p>
            <a
              className='inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300'
              href='/contact'
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
