import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // If you have a Footer
import Chatbot from '../components/Chatbot'; // If you have a Footer
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Portfolio',
  description: 'Web Developer & AI Enthusiast Portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />


      </body>
    </html>
  );
}