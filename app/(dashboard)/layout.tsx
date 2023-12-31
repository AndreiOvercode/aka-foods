import { Outfit } from 'next/font/google';

import 'app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} `}>
      <body>
        <main className="flex min-h-screen flex-col items-center bg-muted">
          {children}
        </main>
      </body>
    </html>
  );
}
