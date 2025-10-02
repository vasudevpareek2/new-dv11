import VillaLayout from '@/components/villas/VillaLayout';
import Image from 'next/image';
import Link from 'next/link';

const villas = [
  {
    id: 'casa-mia',
    name: 'Villa CASA MIA',
    description: 'Spacious 3-bedroom villa with private pool, perfect for families or groups seeking comfort and luxury.',
    size: '251 m²',
    capacity: 'Up to 6 Guests',
    image: '/images/villas/casa-mia/main.jpg',
    features: ['Private Pool', '3 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Coffee Machine']
  },
  {
    id: 'rosa',
    name: 'Villa Rosa',
    description: 'A romantic 2-bedroom villa with private pool and modern amenities, perfect for couples or small families.',
    size: '251 m²',
    capacity: 'Up to 4 Guests',
    image: '/images/villas/rosa/main.jpg',
    features: ['Private Pool', '2 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Flat-screen TV']
  },
  {
    id: 'la-villa-grande',
    name: 'La Villa Grande',
    description: 'Our most luxurious 4-bedroom villa with private pool, perfect for large families or groups.',
    size: '279 m²',
    capacity: 'Up to 8 Guests',
    image: '/images/villas/la-villa-grande/main.jpg',
    features: ['Private Pool', '4 Bedrooms', 'Air Conditioning', 'Free WiFi', 'Minibar']
  }
];

export default function VillasPage() {
  return (
    <VillaLayout
      title="Our Villas | Dolce Vita Pushkar"
      description="Explore our luxurious villas in Pushkar. Each villa offers private pools, modern amenities, and stunning views. Book your perfect getaway today."
      image="/images/villas/casa-mia/main.jpg"
    >
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/images/villas/casa-mia/main.jpg"
          alt="Luxury Villas in Pushkar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Villas</h1>
            <p className="text-xl md:text-2xl">Luxury Redefined in Pushkar</p>
          </div>
        </div>
      </div>

      {/* Villas Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Retreat
          </h2>
          <div className="w-24 h-1 bg-primary-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each of our villas is designed to provide the ultimate in comfort and luxury. 
            Whether you're looking for a romantic getaway or a family vacation, we have the perfect space for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa) => (
            <div key={villa.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Link href={`/villas/${villa.id}`}>
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{villa.name}</h3>
                  <p className="text-sm text-gray-200">{villa.capacity}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{villa.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {villa.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Contact us for pricing</p>
                  </div>
                  <Link
                    href={`/villas/${villa.id}`}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Book Your Stay?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of luxury and comfort at Dolce Vita Pushkar. 
            Contact us for special offers and packages.
          </p>
          <Link
            href="/contact"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-full inline-block transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </VillaLayout>
  );
}
