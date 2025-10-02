import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-50'>
        {/* Full-width header image */}
        <div className='w-full h-[70vh] bg-gray-100 flex items-center justify-center overflow-hidden'>
          <div className='relative w-full h-full'>
            <img
              alt='Gallery Header'
              className='w-full h-full object-cover'
              src='/images/gallery/room.jpg'
            />
            <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
              <div className='text-center text-white p-8'>
                <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our Gallery</h1>
                <p className='text-xl max-w-2xl mx-auto'>
                  Explore the beauty and luxury of Dolce Vita Pushkar through our photo gallery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use the same Gallery component as the homepage */}
        <div className='py-16'>
          <Gallery />
        </div>
      </main>
      <Footer />
    </>
  );
}
