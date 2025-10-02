import localFont from 'next/font/local';

export const philosopher = localFont({
  src: [
    {
      path: '../../public/fonts/Philosopher-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Philosopher-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-philosopher',
  display: 'swap',
  fallback: ['serif'],
});
