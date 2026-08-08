import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASIF | Luxury Perfume Oils & Attars',
  description: 'Experience the essence of pure luxury.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0B0B] text-white antialiased selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
        {children}
      </body>
    </html>
  );
}