'use client';

import { useEffect, useState } from 'react';

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  // This ensures the component is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the image during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div aria-hidden='true' className='h-16 w-[200px] bg-transparent' />;
  }

  return (
    <img
      alt='Dolce Vita Pushkar'
      className='h-16 w-auto object-contain'
      height={80}
      loading='eager'
      src={'/images/logo.png'}
      width={200}
    />
  );
}
