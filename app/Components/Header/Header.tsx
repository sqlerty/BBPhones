'use client';
import { IoPhonePortraitOutline, IoCartOutline } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useUser, useAuth } from './../../stores/AuthoRegStore';

import Link from 'next/link';
export default function Header() {
    const user = useUser();
    const isAuth = useAuth();
    return (
        <div className="h-20 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <IoPhonePortraitOutline className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">BBPhones</h2>
                </Link>
                <div className="flex items-center justify-between gap-2">
                    <Link
                        href="/"
                        className="flex h-10 w-30 cursor-pointer items-center justify-center gap-2 rounded-2xl text-black hover:bg-gray-100"
                    >
                        <FiHome className="h-6 w-6" />
                        <p>Главная</p>
                    </Link>
                    <Link
                        href="/Cart"
                        className="flex h-10 w-30 cursor-pointer items-center justify-center gap-2 rounded-2xl hover:bg-gray-100"
                    >
                        <IoCartOutline className="h-6 w-6" />
                        <p>Корзина</p>
                    </Link>
                    {(isAuth || user !== null) && <p>{user?.email}</p>}
                    <Link
                        href={user ? `/Profile` : `/Authorization`}
                        className="flex h-10 w-30 cursor-pointer items-center justify-center gap-2 rounded-2xl hover:bg-gray-100"
                    >
                        <MdOutlinePersonOutline className="h-6 w-6" />
                        <p>Профиль</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
