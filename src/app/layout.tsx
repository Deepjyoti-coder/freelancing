import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moments by Deepjyoti — Personalized Surprise Websites',
  description: 'Beautiful personalized websites for birthdays, anniversaries, love stories and unforgettable surprises. You bring the moment. I build the magic.',
  openGraph: {
    title: 'Moments by Deepjyoti — Personalized Surprise Websites',
    description: 'Beautiful personalized websites for birthdays, anniversaries, love stories and unforgettable surprises.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://momentsbydeepjyoti.com',
    siteName: 'Moments by Deepjyoti',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
