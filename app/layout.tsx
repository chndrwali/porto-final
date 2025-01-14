import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: {
    default: 'Candra Wali S | Portfolio',
    template: '%s - Candra Wali S | Portfolio',
  },
  description: 'Portfolio Candra Wali Sanjaya, seorang Front-End Developer profesional.',
  category: 'Portfolio, Front-End Developer',
  authors: [{ name: 'chndrwali' }],
  keywords: ['Portfolio', 'Front-End Developer', 'Candra Wali', 'Web Development'],
  creator: 'Candra Wali Sanjaya',
  publisher: 'Candra Wali Sanjaya',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
