'use client';
import { IoSearch } from 'react-icons/io5';
import {
    setSearchedPhones,
    useSearchedPhones,
    useSearchWord,
    useSetInfoPhone,
} from '@/app/stores/catalogStore';
import Image from 'next/image';
import Link from 'next/link';
export default function SearchPhones() {
    const searchWord = useSearchWord();
    const searchedPhones = useSearchedPhones();
    const setSearchWord = setSearchedPhones;
    const setInfoPhone = useSetInfoPhone();
    return (
        <div className="w-xl">
            <div className="flex gap-4">
                <div className="group relative">
                    <IoSearch className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Поиск по моделям..."
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        className="w-xl rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
            </div>
            {searchWord && (
                <div className="absolute flex w-xl flex-col overflow-hidden rounded-b-3xl">
                    {searchedPhones.map((phone) => (
                        <div
                            className="flex h-20 w-full justify-between border-b border-b-gray-100 bg-white p-3"
                            key={phone.id}
                        >
                            <div className="flex items-center">
                                <div className="h-full w-30">
                                    <Image
                                        src={phone.images[0]}
                                        alt={phone.name}
                                        width={500}
                                        height={500}
                                        className="h-full w-full rounded-lg object-contain"
                                    />
                                </div>
                                <Link
                                    href={`/Phone/${phone.id}`}
                                    className="font-medium transition-colors hover:text-blue-500"
                                    onClick={() => setInfoPhone(phone)}
                                >
                                    {phone.name}
                                </Link>
                            </div>
                            <p className="self-center text-xl font-medium text-black">
                                {phone.price} Р
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
