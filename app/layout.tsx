import type {Metadata} from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'UNSTITCHED - Luxury Pakistani Suits & Designer Wear',
  description: 'Premium Pakistani lawn suits, luxury embroidered collections, designer wear, and custom stitching with express Pan-India shipping and regional payments.',
  openGraph: {
    title: 'UNSTITCHED - Luxury Pakistani Suits & Designer Wear',
    description: 'Premium Pakistani lawn suits, luxury embroidered collections, designer wear, and custom stitching with express Pan-India shipping and regional payments.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNSTITCHED - Luxury Pakistani Suits & Designer Wear',
    description: 'Premium Pakistani lawn suits, luxury embroidered collections, designer wear, and custom stitching with express Pan-India shipping and regional payments.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-[#8B4513] selection:text-white" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
