'use client';

import Link from 'next/link';
import { LuMenu, LuX } from 'react-icons/lu';
import { useState } from 'react';
import MobileNav from './MobileNav';
import Image from 'next/image';

export default function MobileHeader() {
    const [mobileMenuOpen, setMobileMenu] = useState(false);
    return (
        <div className="h-20 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="transition-all ease-in-out group-hover:scale-105">
                        <Image
                            src="/img/logo.svg"
                            alt="logo"
                            width={500}
                            height={300}
                            className="h-10 w-10"
                        />
                    </div>

                    <h2 className="text-xl font-bold transition-all ease-in-out group-hover:scale-105">
                        BB
                        <span className="text-blue-600">Phones</span>
                    </h2>
                </Link>
                <button
                    onClick={() => setMobileMenu(!mobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
                >
                    {mobileMenuOpen ? (
                        <LuX className="h-6 w-6" />
                    ) : (
                        <LuMenu className="h-6 w-6" />
                    )}
                </button>
            </div>
            {mobileMenuOpen && <MobileNav setMobileMenu={setMobileMenu} />}
        </div>
    );
}
