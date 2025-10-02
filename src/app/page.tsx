import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BookingForm from '@/components/BookingForm';
import About from '@/components/About';
import Rooms from '@/components/Rooms';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='relative'>
        <Hero />
        <div className='container mx-auto px-4 mt-12 md:mt-16'>
          <BookingForm />
        </div>
      </div>
      <div className='relative -mt-8 md:-mt-12'>
        <About />
      </div>
      <Rooms />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
