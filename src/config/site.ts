// Site configuration
const siteConfig = {
  // Site metadata
  name: 'Dolce Vita Pushkar',
  shortName: 'Dolce Vita',
  description: 'Luxurious villas in the heart of Pushkar, offering an unforgettable experience of comfort and elegance.',
  url: 'https://dolcevitapushkar.com',
  logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=180&h=40&fit=crop',
  logoHeight: 40,
  logoWidth: 180,
  
  // Contact information
  contact: {
    email: 'info@dolcevitapushkar.com',
    phone: '+91 12345 67890',
    whatsapp: '+911234567890',
    address: '123 Luxury Villa Lane, Pushkar, Rajasthan 305022, India',
    coordinates: '26.4863° N, 74.5550° E', // Pushkar coordinates
  },
  
  // Social media links
  social: {
    facebook: 'https://facebook.com/dolcevitapushkar',
    instagram: 'https://instagram.com/dolcevitapushkar',
    twitter: 'https://twitter.com/dolcevitapushkar',
    tripadvisor: 'https://tripadvisor.com/dolcevitapushkar',
  },
  
  // Booking information
  booking: {
    checkIn: '14:00',
    checkOut: '11:00',
    minStay: 1, // Minimum nights
    maxGuests: 6,
    cancellationPolicy: 'Free cancellation up to 7 days before arrival',
  },
  
  // SEO defaults
  seo: {
    defaultTitle: 'Dolce Vita Pushkar - Luxurious Villas in Pushkar',
    defaultDescription: 'Experience luxury and comfort at Dolce Vita Pushkar. Our villas offer the perfect blend of traditional charm and modern amenities for an unforgettable stay.',
    defaultImage: '/images/og-image.jpg',
    twitterHandle: '@dolcevitapushkar',
  },
  
  // Navigation
  navigation: {
    main: [
      { name: 'Home', href: '/', current: true },
      { name: 'About', href: '/about', current: false },
      { 
        name: 'Villas', 
        href: '/villas', 
        current: false,
        children: [
          { name: 'Villa Rosa', href: '/villas/villa-rosa' },
          { name: 'Villa Azzurra', href: '/villas/villa-azzurra' },
          { name: 'Villa Verde', href: '/villas/villa-verde' },
        ]
      },
      { name: 'Gallery', href: '/gallery', current: false },
      { name: 'Contact', href: '/contact', current: false },
    ],
    footer: [
      {
        title: 'Explore',
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
        ],
      },
    ],
  },
  
  // Features and amenities
  features: [
    {
      name: 'Luxury Accommodations',
      description: 'Elegantly designed villas with modern amenities and private spaces.',
      icon: 'bed',
    },
    {
      name: 'Unmatched Experience',
      description: 'Personalized services to make your stay truly special and memorable.',
      icon: 'star',
    },
    {
      name: 'Prime Location',
      description: 'Situated in the heart of Pushkar, close to major attractions and local culture.',
      icon: 'map-marker-alt',
    },
    {
      name: 'Gourmet Dining',
      description: 'Experience authentic Rajasthani cuisine and international dishes prepared by our expert chefs.',
      icon: 'utensils',
    },
  ],
  
  // Room types
  roomTypes: [
    {
      id: 'villa-rosa',
      name: 'Villa Rosa',
      description: 'A luxurious villa with a private pool and garden view, perfect for a romantic getaway.',
      price: 25000,
      size: '85 sqm',
      capacity: '2 Adults',
      image: '/images/villa-rosa.jpg',
      gallery: [
        '/images/villa-rosa-1.jpg',
        '/images/villa-rosa-2.jpg',
        '/images/villa-rosa-3.jpg',
      ],
      features: [
        'Private Pool',
        'King Size Bed',
        'Garden View',
        'Air Conditioning',
        'Free WiFi',
        'Minibar',
        'En-suite Bathroom',
        'Private Terrace',
      ],
    },
    {
      id: 'villa-azzurra',
      name: 'Villa Azzurra',
      description: 'Spacious villa with a stunning pool view and modern amenities for a comfortable stay.',
      price: 30000,
      size: '100 sqm',
      capacity: '2 Adults, 1 Child',
      image: '/images/villa-azzurra.jpg',
      gallery: [
        '/images/villa-azzurra-1.jpg',
        '/images/villa-azzurra-2.jpg',
        '/images/villa-azzurra-3.jpg',
      ],
      features: [
        'Pool View',
        'King Size Bed',
        'Living Area',
        'Bathtub',
        'Free WiFi',
        'Minibar',
        'En-suite Bathroom',
        'Private Balcony',
      ],
    },
    {
      id: 'villa-verde',
      name: 'Villa Verde',
      description: 'Elegant villa surrounded by lush greenery, offering privacy and tranquility.',
      price: 35000,
      size: '120 sqm',
      capacity: '4 Adults',
      image: '/images/villa-verde.jpg',
      gallery: [
        '/images/villa-verde-1.jpg',
        '/images/villa-verde-2.jpg',
        '/images/villa-verde-3.jpg',
      ],
      features: [
        'Garden View',
        'Two Bedrooms',
        'Living Room',
        'Kitchenette',
        'Private Terrace',
        'Free WiFi',
        'Air Conditioning',
        'Dining Area',
      ],
    },
  ],
  
  // Testimonials
  testimonials: [
    {
      id: 1,
      name: 'Rahul Sharma',
      location: 'Mumbai, India',
      rating: 5,
      content: 'Our stay at Dolce Vita was absolutely magical! The villa was luxurious, the staff was incredibly attentive, and the location was perfect. We can\'t wait to come back!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      date: 'March 2025'
    },
    {
      id: 2,
      name: 'Priya Patel',
      location: 'Delhi, India',
      rating: 5,
      content: 'The perfect romantic getaway! The private pool was our favorite spot. The attention to detail in the villa was impressive, and the staff went above and beyond to make our anniversary special.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      date: 'February 2025'
    },
    {
      id: 3,
      name: 'Amit & Neha',
      location: 'Bangalore, India',
      rating: 4,
      content: 'Beautiful property with excellent service. The villa was spacious and clean, and the food was delicious. Would definitely recommend for a peaceful retreat.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      date: 'January 2025'
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'London, UK',
      rating: 5,
      content: 'One of the best places we\'ve stayed in India. The combination of luxury and authentic local experience was perfect. The staff arranged wonderful tours for us.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: 'December 2024'
    },
  ],
  
  // Gallery images
  gallery: [
    { id: 1, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', alt: 'Villa Exterior', category: 'villas' },
    { id: 2, src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop', alt: 'Luxury Bedroom', category: 'rooms' },
    { id: 3, src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop', alt: 'Swimming Pool', category: 'amenities' },
    { id: 4, src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop', alt: 'Bathroom Interior', category: 'rooms' },
    { id: 5, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', alt: 'Dining Area', category: 'dining' },
    { id: 6, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Garden View', category: 'villas' },
    { id: 7, src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop', alt: 'Spa Area', category: 'amenities' },
    { id: 8, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Sunset View', category: 'villas' },
  ],
  
  // Gallery categories
  galleryCategories: [
    { id: 'all', name: 'All' },
    { id: 'villas', name: 'Villas' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'dining', name: 'Dining' },
  ],
};

export default siteConfig;
