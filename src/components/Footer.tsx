import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Villas', href: '/villas' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Villas',
      links: [
        { name: 'Villa Rosa', href: '/villas/villa-rosa' },
        { name: 'Villa Azzurra', href: '/villas/villa-azzurra' },
        { name: 'Villa Verde', href: '/villas/villa-verde' },
        { name: 'All Villas', href: '/villas' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Cancellation Policy', href: '/cancellation-policy' },
        { name: 'Sitemap', href: '/sitemap.xml' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/dolcevitapushkar/?hl=en' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'TripAdvisor', icon: 'tripadvisor', url: '#' },
  ];

  return (
    <footer className="bg-primary-200 text-gray-700 pt-8 pb-4 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src={`/images/logo.png?t=${Date.now()}`}
                alt="Dolce Vita Pushkar"
                width={200}
                height={80}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-gray-600 mb-3">
              Experience luxury and comfort at Dolce Vita Pushkar. Our villas offer the perfect blend of traditional charm and modern amenities.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-serif">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2">
                  <i className="fas fa-map-marker-alt text-xs"></i>
                </div>
                <span className="text-sm text-gray-600">123 Luxury Villa Lane, Pushkar, Rajasthan 305022, India</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2">
                  <i className="fas fa-phone-alt text-xs"></i>
                </div>
                <div>
                  <a href="tel:+919660088590" className="text-sm text-gray-600 hover:text-primary-600 block">+91 96600 88590</a>
                  <a href="https://wa.me/919660088590" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-0.5">
                    <i className="fab fa-whatsapp mr-1"></i> Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2">
                  <i className="fas fa-envelope text-xs"></i>
                </div>
                <div>
                  <a href="mailto:dolcevitapushkar@gmail.com" className="text-sm text-gray-600 hover:text-primary-600 block">dolcevitapushkar@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2">
                  <i className="fas fa-clock text-xs"></i>
                </div>
                <span className="text-sm text-gray-600">24/7 Customer Support</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 font-serif">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.find(section => section.title === 'Legal')?.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-start group"
                  >
                    <span className="w-1 h-1 mt-2 mr-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-2 md:mb-0">
              &copy; {currentYear} Dolce Vita Pushkar. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {footerLinks.find(section => section.title === 'Legal')?.links.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
            Dolce Vita Pushkar is a luxury villa resort in Pushkar, Rajasthan. All images and content are protected by copyright.
          </p>
        </div>
      </div>
    </footer>
  );
}
