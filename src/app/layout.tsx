import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jon Deiss | Software Implementation Expert',
  description:
    'Portfolio of Jon Deiss, a software implementation expert and former EY consultant now focused on AI product and solutions engineering roles.',
  keywords: ['Jon Deiss', 'Software Implementation', 'AI Product', 'Solutions Engineer', 'Digital Consultant', 'EY', 'Arlington VA'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Jon Deiss | Software Implementation Expert',
    description: 'Portfolio of Jon Deiss, a software implementation expert and former EY consultant now focused on AI product and solutions engineering roles.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
