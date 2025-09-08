'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function DiningPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-50'>
        {/* Hero Section */}
        <div className='relative h-[70vh] bg-gray-300 flex items-center justify-center'>
          <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
            <div className='text-center text-white px-4'>
              <h1 className='text-4xl md:text-6xl font-bold mb-6'>Dining at Dolce Vita</h1>
              <p className='text-xl md:text-2xl max-w-3xl mx-auto'>
                Experience a culinary journey through the flavors of Rajasthan and beyond
              </p>
            </div>
          </div>
        </div>

        {/* Dining Options */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Our Dining Experiences
              </h2>
              <div className='w-24 h-1 bg-amber-600 mx-auto mb-6'></div>
              <p className='text-gray-600 max-w-3xl mx-auto'>
                From traditional Rajasthani thalis to international cuisine, our restaurants offer a
                diverse range of dining options to satisfy every palate.
              </p>
            </div>

            <div className='space-y-16'>
              {diningOptions.map((option) => (
                <div key={option.id} className='grid md:grid-cols-2 gap-8 items-center'>
                  <div className='h-80 bg-gray-200 rounded-lg overflow-hidden relative'>
                    <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
                      <span className='text-lg'>{option.title} Image</span>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-3'>{option.title}</h3>
                    <p className='text-gray-600 mb-4'>{option.description}</p>
                    <div className='mb-4'>
                      <h4 className='font-semibold text-gray-800 mb-2'>Timings:</h4>
                      <p className='text-amber-700'>{option.timing}</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6'>
                      {option.features.map((feature, index) => (
                        <div key={index} className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
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
                    <button className='px-6 py-2.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors'>
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Dining Experience */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Special Dining Experiences
              </h2>
              <div className='w-24 h-1 bg-amber-600 mx-auto mb-6'></div>
              <p className='text-gray-600 max-w-3xl mx-auto'>
                Make your stay memorable with our unique dining experiences under the stars or by
                the pool.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  title: 'Romantic Dinner',
                  description:
                    'A private dining experience under the stars, perfect for special occasions.',
                  image: '/dining/romantic-dinner.jpg',
                },
                {
                  title: 'Rajasthani Thali',
                  description:
                    'Experience authentic Rajasthani cuisine with our traditional thali dinner.',
                  image: '/dining/thali-dinner.jpg',
                },
                {
                  title: 'Poolside BBQ',
                  description:
                    'Sizzling barbecue by the pool with live cooking stations and international flavors.',
                  image: '/dining/bbq-dinner.jpg',
                },
              ].map((experience, index) => (
                <div key={index} className='bg-white rounded-lg overflow-hidden shadow-md'>
                  <div className='h-48 bg-gray-300 relative'>
                    <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
                      {experience.title} Image
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{experience.title}</h3>
                    <p className='text-gray-600 mb-4'>{experience.description}</p>
                    <button className='text-amber-600 font-medium hover:text-amber-700'>
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
