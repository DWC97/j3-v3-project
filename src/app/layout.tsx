import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { Providers } from '@/context/Providers';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
    title: 'Jolly Roger Tours | Thailand party tours',
    description: 'Small group party tours around South-East Asia. Starting in 2025.',
    icons: {
        icon: '/logo.webp',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={poppins.className}>
                <Providers>
                    <header>
                        <nav className="relative">
                            <Navbar />
                        </nav>
                    </header>
                    {children}
                    <footer>
                        <Footer />
                    </footer>
                </Providers>
            </body>
        </html>
    );
}