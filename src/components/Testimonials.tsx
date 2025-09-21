'use client';

import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  image: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rohit K.',
    location: 'Mumbai, India',
    rating: 5,
    content: 'Exceptional stay at Dolce Vita! The villas are beautifully designed with attention to detail. The staff was incredibly welcoming and made our stay memorable. The location is perfect - peaceful yet close to Pushkar attractions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date: 'August 2023'
  },
  {
    id: 2,
    name: 'Priya M.',
    location: 'Delhi, India',
    rating: 5,
    content: 'A perfect blend of luxury and comfort. The private pool villa was stunning, and the service was impeccable. The staff went above and beyond to make our anniversary special. Highly recommended for a romantic getaway!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    date: 'July 2023'
  },
  {
    id: 3,
    name: 'Amit & Neha',
    location: 'Bangalore, India',
    rating: 5,
    content: 'The best hospitality we\'ve experienced in a long time. The villas are spacious, clean, and beautifully decorated. The food was delicious, and the staff was always ready to help. Will definitely come back!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    date: 'June 2023'
  },
  {
    id: 4,
    name: 'Sarah W.',
    location: 'London, UK',
    rating: 5,
    content: 'An absolute gem in Pushkar! The property is stunning, and the service is top-notch. The staff arranged wonderful cultural experiences for us. The perfect place to experience Rajasthani hospitality at its finest.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    date: 'May 2023'
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const visibleTestimonials = 3;
  const totalTestimonials = testimonials.length;

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalTestimonials - visibleTestimonials + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalTestimonials]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= totalTestimonials - visibleTestimonials ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? totalTestimonials - visibleTestimonials : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const visibleItems = testimonials.slice(currentIndex, currentIndex + visibleTestimonials);
  
  // If we're at the end and don't have enough items, take from the beginning
  if (visibleItems.length < visibleTestimonials) {
    const remaining = visibleTestimonials - visibleItems.length;
    visibleItems.push(...testimonials.slice(0, remaining));
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <span className="text-primary-500 text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            What Our <span className="text-primary-500">Guests Say</span>
          </h2>
          <div className="w-24 h-1 bg-primary-300 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our guests have to say about their experience at Dolce Vita Pushkar.
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all z-10 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {visibleItems.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="mb-4 text-amber-400">
                  <FaQuoteLeft className="text-3xl opacity-20 mb-4" />
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>
                
                <div className="flex items-center mb-6">
                  {testimonial.image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-lg text-white font-bold mr-4">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all z-10 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.google.com/travel/search?q=google%20reviews%20dolcevita%20pushkar&g2lb=4965990%2C4969803%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C72990342%2C73059275%2C73064216%2C73064764%2C73076417%2C73107088&hl=en-IN&gl=in&ssta=1&ts=CAEaRwopEicyJTB4Mzk2YmRkMDAyYTgzODVmNzoweDQ5Y2VkMTdjM2NhZGU5NTASGhIUCgcI6Q8QCRgXEgcI6Q8QCRgYGAEyAhAA&qs=CAEyE0Nnb0kwTkszNWNPdnRPZEpFQUU4AkIJCVDprTx80c5JQgkJUOmtPHzRzkk&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwig8unE4uaPAxUAAAAAHQAAAAAQBA"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          >
            Read More Reviews on Google
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
