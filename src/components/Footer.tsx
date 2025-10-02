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
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/dolcevitapushkar/?hl=en',
    },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'TripAdvisor', icon: 'tripadvisor', url: '#' },
  ];

  return (
    <footer className='bg-primary-200 text-gray-700 pt-8 pb-4 border-t border-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-6'>
          {/* Logo and Description */}
          <div>
            <Link className='block mb-4' href='/'>
              <Image
                priority
                alt='Dolce Vita Pushkar'
                className='h-16 w-auto object-contain'
                height={80}
                src={`/images/logo.png?t=${Date.now()}`}
                width={200}
              />
            </Link>
            <p className='text-sm text-gray-600 mb-3'>
              Experience luxury and comfort at Dolce Vita Pushkar. Our villas offer the perfect
              blend of traditional charm and modern amenities.
            </p>
            <div className='flex space-x-2'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  aria-label={social.name}
                  className='text-gray-600 hover:text-primary-600 transition-colors duration-300'
                  href={social.url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <i className={`fab fa-${social.icon} text-xl`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3 font-serif'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='flex items-start'>
                <div className='bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2'>
                  <i className='fas fa-map-marker-alt text-xs' />
                </div>
                <span className='text-sm text-gray-600'>
                  Building No./Flat No.: Khasra no 3133/3127
                  <br />
                  Name Of Premises/Building: Samla Ki Dhani
                  <br />
                  Road/Street: Kaharo Ka Chouraha
                  <br />
                  City/Town/Village: Pushkar
                  <br />
                  District: Ajmer
                  <br />
                  State: Rajasthan
                  <br />
                  PIN Code: 305022
                </span>
              </li>
              <li className='flex items-start'>
                <div className='bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2'>
                  <i className='fas fa-phone-alt text-xs' />
                </div>
                <div>
                  <a
                    className='text-sm text-gray-600 hover:text-primary-600 block'
                    href='tel:+919660088590'
                  >
                    +91 96600 88590
                  </a>
                  <a
                    className='text-xs text-primary-500 hover:underline inline-flex items-center mt-0.5'
                    href='https://wa.me/919660088590'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <i className='fab fa-whatsapp mr-1' /> Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className='flex items-start'>
                <div className='bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2'>
                  <i className='fas fa-envelope text-xs' />
                </div>
                <div>
                  <a
                    className='text-sm text-gray-600 hover:text-primary-600 block'
                    href='mailto:dolcevitapushkar@gmail.com'
                  >
                    dolcevitapushkar@gmail.com
                  </a>
                </div>
              </li>
              <li className='flex items-start'>
                <div className='bg-primary-100 p-1.5 rounded-full text-primary-600 mr-2'>
                  <i className='fas fa-clock text-xs' />
                </div>
                <span className='text-sm text-gray-600'>24/7 Customer Support</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3 font-serif'>Legal</h3>
            <ul className='space-y-2'>
              {footerLinks
                .find((section) => section.title === 'Legal')
                ?.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      className='text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-start group'
                      href={link.href}
                    >
                      <span className='w-1 h-1 mt-2 mr-2 bg-primary-400 rounded-full flex-shrink-0' />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-4 border-t border-gray-100'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-xs text-gray-500 mb-2 md:mb-0'>
              &copy; {currentYear} Dolce Vita Pushkar. All rights reserved.
            </p>
            <div className='flex space-x-4'>
              {footerLinks
                .find((section) => section.title === 'Legal')
                ?.links.map((link) => (
                  <Link
                    key={link.name}
                    className='text-xs text-gray-500 hover:text-primary-600 transition-colors'
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </div>
          <p className='text-xs text-gray-500 mt-2 text-center md:text-left'>
            Dolce Vita Pushkar is a luxury villa resort in Pushkar, Rajasthan. All images and
            content are protected by copyright.
          </p>
        </div>
      </div>
    </footer>
  );
}
