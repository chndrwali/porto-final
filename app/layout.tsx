import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { ThemeProvider } from '@/app/theme-provider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
