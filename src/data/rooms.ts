export type Room = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  size: string;
  capacity: string;
  view: string;
  image: string;
  features: string[];
};

export const rooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Room',
    description:
      'Experience luxury in our spacious deluxe rooms with modern amenities and a comfortable king-size bed.',
    price: 8999,
    size: '450 sq.ft',
    capacity: '2 Adults',
    view: 'Garden View',
    image: '/images/gallery/bedroom.jpg',
    features: [
      'King-size bed',
      'Air conditioning',
      'Free Wi-Fi',
      'Flat-screen TV',
      'Minibar',
      'Coffee/tea maker',
      'Safe',
      'En-suite bathroom',
    ],
  },
  {
    id: 2,
    name: 'Luxury Suite',
    description:
      'Indulge in our luxurious suite featuring a separate living area and premium amenities.',
    price: 12999,
    size: '750 sq.ft',
    capacity: '2 Adults + 1 Child',
    view: 'Pool View',
    image: '/images/gallery/room.jpg',
    features: [
      'King-size bed',
      'Separate living area',
      'Air conditioning',
      'Free Wi-Fi',
      'Flat-screen TV',
      'Minibar',
      'Coffee/tea maker',
      'Safe',
      'En-suite bathroom with bathtub',
    ],
  },
  {
    id: 3,
    name: 'Villa Grande',
    description:
      'Our premium villa offering ultimate privacy, luxury, and stunning views of the surrounding landscape.',
    price: 19999,
    size: '1200 sq.ft',
    capacity: '4 Adults + 2 Children',
    view: 'Panoramic View',
    image: '/images/gallery/villa-exterior.jpg',
    features: [
      '2 Bedrooms with king-size beds',
      'Private swimming pool',
      'Living and dining area',
      'Fully equipped kitchen',
      'Air conditioning',
      'Free Wi-Fi',
      'Flat-screen TVs',
      'Minibar',
      'Coffee/tea maker',
      'Safe',
      'En-suite bathrooms',
      'Private garden',
    ],
  },
];
