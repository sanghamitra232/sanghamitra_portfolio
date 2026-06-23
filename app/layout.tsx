import type { Metadata } from 'next';
import './globals.css';
import { AudioProvider } from '@/app/lib/AudioContext';

export const metadata: Metadata = {
  title: 'Sanghamitra Deb | Portfolio',
  description: 'Food Technologist, AI Enthusiast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
