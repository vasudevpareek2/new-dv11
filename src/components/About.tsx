import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="text-primary-500 text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Welcome to <span className="text-primary-500">Dolce Vita</span> Pushkar
          </h2>
          <div className="w-24 h-1 bg-primary-300 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nestled in the heart of Pushkar, Dolce Vita offers a luxurious retreat that perfectly blends modern comfort with traditional charm. 
            Our villas are designed to provide an unforgettable experience for couples and families alike, with personalized services and 
            attention to detail that will make your stay truly special.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=64&h=64&fit=crop',
              title: 'Luxury Accommodations',
              description: 'Elegantly designed villas with modern amenities and private spaces.'
            },
            {
              icon: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=64&h=64&fit=crop',
              title: 'Unmatched Experience',
              description: 'Personalized services to make your stay truly special and memorable.'
            },
            {
              icon: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=64&h=64&fit=crop',
              title: 'Prime Location',
              description: 'Situated in the heart of Pushkar, close to major attractions and local culture.'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-primary-200 hover:bg-primary-300 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-300 rounded-full flex items-center justify-center">
                <Image 
                  src={feature.icon} 
                  alt={feature.title}
                  width={32} 
                  height={32}
                  className="text-primary-600 rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
