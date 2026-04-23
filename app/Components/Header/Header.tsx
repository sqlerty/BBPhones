'use client';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { useUser } from '../../stores/profileStore';
import { useCartCount } from '@/app/stores/profileStore';
import { navLinks } from './HeaderData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const user = useUser();
    const cartLength = useCartCount();
    const pathname = usePathname();
    return (
        <div className="h-20 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <IoPhonePortraitOutline className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">BBPhones</h2>
                </Link>
                <nav className="flex items-center justify-between gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                href={user ? link.to : link.dopTo || ''}
                                className={`relative flex h-10 w-30 cursor-pointer items-center justify-center gap-2 rounded-2xl ${isActive ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'}`}
                            >
                                <link.icon className="h-6 w-6" />
                                <p>{link.label}</p>
                                {cartLength > 0 && link.to == '/Cart' && (
                                    <span className="absolute top-0 right-0 flex h-4 w-4 translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                                        {cartLength}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
