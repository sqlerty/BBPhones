'use client';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@/app/stores/profileStore';
import { useState } from 'react';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aPassword, setAPassword] = useState('');
    const { handleReg } = useAuthActions();
    const router = useRouter();
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        handleReg(email, password, aPassword, router);
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
            <h1 className="text-center text-3xl font-extrabold max-md:text-lg">
                Создать аккаунт
            </h1>
            <div className="mb-10 flex gap-1">
                или
                <Link
                    href={'/Authorization'}
                    className="flex cursor-pointer items-center justify-center gap-1 rounded-2xl bg-white text-center font-semibold text-blue-600 transition-all duration-200 ease-in-out hover:text-blue-500"
                >
                    войти в существующий
                </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-md flex-col gap-12 rounded-2xl border border-gray-100 bg-white p-8 text-gray-600 shadow-xl shadow-blue-900/5 max-md:h-auto max-md:max-w-xs max-md:gap-5 max-md:text-xs"
            >
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Email:</label>
                        <input
                            type="text"
                            placeholder="you@example.com"
                            className="h-10 w-full rounded-xl border border-gray-100 bg-white p-5 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            className="h-10 w-full rounded-xl border border-gray-100 bg-white p-5 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">
                            Повторите пароль:
                        </label>
                        <input
                            type="password"
                            name="aPassword"
                            placeholder="••••••••"
                            value={aPassword}
                            className="h-10 w-full rounded-xl border border-gray-100 bg-white p-5 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-0"
                            onChange={(e) => setAPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 text-center font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-500 max-md:h-10 max-md:rounded-xl"
                    >
                        Зарегистрироваться
                        <IoArrowForward className="transition-transform ease-in-out group-hover:translate-x-1" />
                    </button>
                </div>
            </form>
        </div>
    );
}
