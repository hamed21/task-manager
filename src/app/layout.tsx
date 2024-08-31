import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Providers} from './Providers';
import classNames from 'classnames';
import Header from '@/components/Common/Header';
import Sidebar from '@/components/Common/Sidebar';

const inter = Inter({subsets: ['latin']});

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
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className={classNames('w-full h-screen ')}>
            <Header />
            <Sidebar />
            <main className={classNames('bg-background-main ml-48 px-4 py-8')}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
