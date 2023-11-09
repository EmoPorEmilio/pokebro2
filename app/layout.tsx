import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Slowpoke's Land`,
  description: 'WebApp de Juegos Pokémon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={jost.className}>{children}</body>
    </html>
  );
}
