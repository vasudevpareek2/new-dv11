import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src="/dolce-logo.png"
            alt="Dolce Vita Pushkar"
            width={240}
            height={67}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-amber-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors duration-300 text-center"
          >
            Return Home
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-full transition-colors duration-300 text-center"
          >
            Contact Support
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Villas', href: '/villas' },
              { name: 'Gallery', href: '/gallery' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-amber-600 hover:text-amber-700 hover:underline transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
