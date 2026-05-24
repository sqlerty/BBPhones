import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './Header/DesktopHeader/Header';
import { AuthRegProvider } from './Provider/AuthRegProvider';
import Footer from './Footer/Footer';
import MobileHeader from './Header/MobileHeader/MobileHeader';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'BBPhones | Магазин новых и б/у смартфонов ',
    description:
        'Технологии будущего в твоих руках! Широкий выбор новых и проверенных б/у смартфонов с гарантией качества. Быстрая доставка до двери и честные цены.',
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
                        <div className="block max-md:hidden">
                            <Header />
                        </div>
                        <div className="hidden max-md:block">
                            <MobileHeader />
                        </div>
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
