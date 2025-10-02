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
        <meta content={description} name='description' />
        <meta content={`${title} | Dolce Vita Pushkar`} property='og:title' />
        <meta content={description} property='og:description' />
        <meta content={image} property='og:image' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
