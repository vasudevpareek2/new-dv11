import Link from 'next/link';
import Image from 'next/image';

const BookNowIcon = () => {
  const getLetterStyle = (letter: string, index: number) => {
    const baseStyle = {
      transformOrigin: 'center',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0 -3px',
      letterSpacing: '0.1em',
      lineHeight: '0.8',
      transform: 'rotate(-90deg)',
    };

    // For 'B' and 'K', we'll flip them horizontally to look correct when rotated
    if (['B', 'K'].includes(letter)) {
      return { ...baseStyle, transform: 'rotate(-90deg) scaleX(-1)' };
    }

    // For 'W', we'll rotate it 180 degrees for correct orientation
    if (letter === 'W') {
      return { ...baseStyle, transform: 'rotate(90deg)', margin: '0 -2px' };
    }

    // Add a bit more space before 'W' (the 'O' before 'W' in 'NOW')
    if (index === 5) {
      // This is the 'O' before 'W'
      return { ...baseStyle, marginBottom: '1px' };
    }

    return baseStyle;
  };

  return (
    <div className='relative group'>
      <div className='flex flex-col items-center justify-center w-10 h-18 bg-[#fecbba] rounded-l-lg overflow-hidden transition-all duration-300 hover:opacity-90'>
        <div className='flex flex-col items-center justify-center space-y-0 py-1'>
          {['B', 'O', 'O', 'K', 'N', 'O', 'W'].map((letter, index) => (
            <span
              key={index}
              className='text-gray-800 font-bold text-[9px] leading-none'
              style={getLetterStyle(letter, index)}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FloatingIcons() {
  return (
    <div className='fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-[7.5rem] pt-10'>
      {/* WhatsApp Icon */}
      <a
        aria-label='Chat on WhatsApp'
        className='group flex items-center justify-center relative w-[43px] h-[43px] rounded-full overflow-hidden'
        href='https://wa.me/919660088590'
        rel='noopener noreferrer'
        target='_blank'
      >
        <Image
          alt='WhatsApp'
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
          height={43}
          src='/icons/whatsapp-icon.png'
          width={43}
        />
        <span className='absolute right-full mr-3 px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'>
          Chat on WhatsApp
        </span>
      </a>

      {/* Instagram Icon */}
      <a
        aria-label='Follow on Instagram'
        className='group flex items-center relative'
        href='https://www.instagram.com/dolcevitapushkar/?hl=en'
        rel='noopener noreferrer'
        target='_blank'
      >
        <Image
          alt='Instagram'
          className='w-[43px] h-[43px] object-cover transition-transform duration-300 hover:scale-110'
          height={43}
          src='/icons/instagram-icon.png'
          width={43}
        />
        <span className='absolute right-full mr-3 px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'>
          Follow on Instagram
        </span>
      </a>

      {/* Book Now Icon */}
      <Link aria-label='Book Now' className='group flex items-center relative' href='/villas'>
        <BookNowIcon />
        <span className='absolute right-full mr-3 px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'>
          Book Your Stay
        </span>
      </Link>
    </div>
  );
}
