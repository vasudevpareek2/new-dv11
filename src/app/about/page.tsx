import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">About Dolce Vita Pushkar</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Dolce Vita Pushkar, a luxurious retreat nestled in the heart of Pushkar. 
              Our property offers a perfect blend of traditional Rajasthani architecture and modern amenities, 
              providing a unique and comfortable experience for all our guests.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Established with a vision to create memorable experiences, Dolce Vita Pushkar is more than just a place to stay. 
              It's a destination where comfort meets elegance, and every detail is carefully curated to ensure your stay is nothing short of extraordinary.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2020, Dolce Vita Pushkar was born out of a passion for hospitality and a love for the rich cultural 
              heritage of Rajasthan. Our founders envisioned a space where travelers could experience the true essence of 
              Rajasthani hospitality while enjoying modern comforts.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Our mission is to provide exceptional service, luxurious accommodations, and unforgettable experiences 
              that exceed our guests' expectations. We strive to create a home away from home for every traveler who 
              walks through our doors.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
