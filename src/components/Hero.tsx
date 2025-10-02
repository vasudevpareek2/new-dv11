'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error playing video:', err);
      }
    };

    playVideo();
  }, []);

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 z-0'>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-full object-cover'
        >
          <source src='/hero-video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='absolute inset-0 bg-black bg-opacity-30' />
      </div>

      {/* Hero Content */}
      <div className='relative z-10 w-full px-4 mx-auto max-w-5xl h-full'>
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4 text-center'>
          <h1 className='text-xl md:text-3xl lg:text-4xl font-normal font-philosopher uppercase text-white/90'>
            Luxurious Villas in Pushkar
          </h1>
          <div className='flex items-center justify-center mt-3'>
            <div className='h-px w-24 bg-yellow-400/80 mr-3' />
            <p className='text-base md:text-lg lg:text-xl font-normal font-philosopher uppercase text-white/80'>
              Experience the Sweet Life
            </p>
            <div className='h-px w-32 bg-yellow-400 ml-3' />
          </div>
        </div>
      </div>
    </section>
  );
}
