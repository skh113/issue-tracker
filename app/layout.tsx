import './globals.css';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import { NavBar } from '@/app/NavBar';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Theme>
          <NavBar />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
