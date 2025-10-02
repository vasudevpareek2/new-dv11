'use client';

import { useState, useEffect } from 'react';
// Using require to avoid TypeScript errors with Next.js Link
const Link = require('next/link').default;
import Logo from './ui/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Villas', href: '/villas', submenu: true },
    { name: 'Dining', href: '/dining' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const roomTypes = [
    { name: 'Villa Rosa', href: '/villas/rosa' },
    { name: 'Villa CASA MIA', href: '/villas/casa-mia' },
    { name: 'La Villa Grande', href: '/villas/la-villa-grande' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary-200 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 h-full flex items-center">
            <Link href="/" passHref>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className="text-gray-800 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors duration-300"
                  passHref
                >
                  {link.name}
                  {link.submenu && (
                    <span className="ml-1">
                      <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  )}
                </Link>
                
                {link.submenu && (
                  <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    {roomTypes.map((room) => (
                      <Link
                        key={room.name}
                        href={room.href}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                        passHref
                      >
                        {room.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/villas" 
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
              passHref
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg shadow-lg">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => link.submenu ? null : setIsMenuOpen(false)}
                  >
                    {link.name}
                    {link.submenu && (
                      <span className="float-right">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </Link>
                  {link.submenu && (
                    <div className="pl-4 mt-1 space-y-1">
                      {roomTypes.map((room) => (
                        <Link
                          key={room.name}
                          href={room.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {room.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-3 pt-2">
                <a 
                  href="/villas"
                  className="block w-full bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    window.location.href = '/villas';
                  }}
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
