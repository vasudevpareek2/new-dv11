import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import FloatingIcons from '@/components/FloatingIcons';
import { philosopher } from './fonts';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Dolce Vita Pushkar - Luxurious Villas in Pushkar',
  description:
    'Dolce Vita Pushkar perfectly suits honeymooners and couples, particularly those looking for a perfect blend of rural Balinese',
  keywords: ['Pushkar', 'Luxury Villas', 'Honeymoon', 'Rajasthan', 'Resort'],
  authors: [{ name: 'Dolce Vita Pushkar' }],
  creator: 'Dolce Vita Pushkar',
  publisher: 'Dolce Vita Pushkar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dolcevitapushkar.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dolce Vita Pushkar - Luxurious Stay in Pushkar',
    description:
      'Dolce Vita Pushkar perfectly suits honeymooners and couples, particularly those looking for a perfect blend of rural Balinese',
    url: 'https://dolcevitapushkar.com/',
    siteName: 'Dolce Vita Pushkar',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Dolce Vita Pushkar - Luxurious Villas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolce Vita Pushkar - Luxurious Stay in Pushkar',
    description:
      'Dolce Vita Pushkar perfectly suits honeymooners and couples, particularly those looking for a perfect blend of rural Balinese',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${philosopher.variable} font-sans`}>
      <body className={inter.className}>
        <FloatingIcons />
        {children}
      </body>
    </html>
  );
}
