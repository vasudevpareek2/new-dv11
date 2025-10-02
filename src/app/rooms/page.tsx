import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import Image from 'next/image';
import Link from 'next/link';
import { rooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gray-800">
          <div className="pt-32 pb-16 md:pt-40 md:pb-24 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Villas</h1>
              <p className="text-xl text-gray-200">Experience luxury and comfort in our beautifully appointed villas</p>
            </div>
          </div>
        </div>
        
        {/* Booking Form - Below hero section */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 -mt-8 md:-mt-16">
            <BookingForm />
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Rooms List */}
          <div className="max-w-5xl mx-auto space-y-16">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 h-80 md:h-auto">
                    <div className="h-full w-full relative">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h2>
                    <p className="text-amber-600 text-xl font-semibold mb-4">₹{room.price.toLocaleString()} / night</p>
                    <p className="text-gray-600 mb-6">{room.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-sm text-gray-600">{room.size}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{room.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">{room.view}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {room.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <svg className="h-4 w-4 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/booking?room=${room.id}`}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-center py-3 px-6 rounded-md font-medium transition-colors"
                      >
                        Book Now
                      </Link>
                      <Link
                        href={`/rooms/${room.id}`}
                        className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 text-center py-3 px-6 rounded-md font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-amber-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Take advantage of our exclusive packages and special rates for an enhanced stay experience.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Weekend Getaway',
                    description: '15% off on 2+ night stays',
                    code: 'WEEKEND15',
                  },
                  {
                    title: 'Advance Booking',
                    description: '10% off on bookings made 30+ days in advance',
                    code: 'EARLY10',
                  },
                  {
                    title: 'Long Stay',
                    description: '20% off on stays of 7+ nights',
                    code: 'EXTEND20',
                  },
                ].map((offer, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-amber-600 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="font-mono text-sm">Code: {offer.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
