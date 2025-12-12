import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LuxAI Tools - Premium AI Productivity Suite',
  description: 'Experience luxury-style AI tools for summarization, translation, and meeting notes generation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
