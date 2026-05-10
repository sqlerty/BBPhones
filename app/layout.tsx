import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './Header/Header';
import { AuthRegProvider } from './Provider/AuthRegProvider';
import Footer from './Footer/Footer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'BBPhones',
    description: 'Лучший магазин смартфонов!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ru"
            className={`${geistSans.variable} ${geistMono.variable} `}
        >
            <body>
                <AuthRegProvider>
                    <header className="sticky top-0 z-100">
                        <Header />
                    </header>
                    <main>{children}</main>
                    <footer>
                        <Footer />
                    </footer>
                </AuthRegProvider>
            </body>
        </html>
    );
}
