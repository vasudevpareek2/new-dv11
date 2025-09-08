import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';
type VillaLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  image: string;
};

export default function VillaLayout({ children, title, description, image }: VillaLayoutProps) {

  return (
    <>
      <Head>
        <title>{title} | Dolce Vita Pushkar</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Dolce Vita Pushkar`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
