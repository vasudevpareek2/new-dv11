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
    return <div className="h-16 w-[200px] bg-transparent" aria-hidden="true" />;
  }

  return (
    <img 
      src={"/images/logo.png"}
      alt="Dolce Vita Pushkar" 
      width={200}
      height={80}
      className="h-16 w-auto object-contain"
      loading="eager"
    />
  );
}
