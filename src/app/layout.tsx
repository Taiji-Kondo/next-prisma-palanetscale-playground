import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Next.js + Prisma + PlanetScale',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
