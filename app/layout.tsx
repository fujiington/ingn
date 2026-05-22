import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INGN - Nyheder',
  description: 'De seneste nyheder fra Danmark og verden',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
