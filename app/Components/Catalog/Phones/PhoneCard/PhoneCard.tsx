import { GoStarFill } from 'react-icons/go';
import { IoCartOutline } from 'react-icons/io5';
import Image from 'next/image';
import { ProductWithCategory } from '@/types/database';
import { useSetInfoPhone, useIsFilter } from '@/app/stores/catalogStore';
import { useAddToCart } from '@/app/stores/profileStore';
import { LuHeart } from 'react-icons/lu';
import Link from 'next/link';

import {
    useFavoritePhonesId,
    useToggleFavorites,
} from '@/app/stores/profileStore';

interface IPhoneCard {
    phone: ProductWithCategory;
}
export default function PhoneCard({ phone }: IPhoneCard) {
    const setCart = useAddToCart();
    const setInfoPhone = useSetInfoPhone();
    const toggleFavorites = useToggleFavorites();
    const favoritePhonesId = useFavoritePhonesId();
    const isFilter = useIsFilter();
    return (
        <div
            key={phone.id}
            className={`group flex ${isFilter ? 'h-fit w-72' : 'h-130 w-100'} flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-200 ease-in-out hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5`}
        >
            <div className="relative h-75 w-full bg-gray-50 p-10">
                <button
                    onClick={() => toggleFavorites(phone)}
                    className={`absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-all ${
                        favoritePhonesId.includes(phone.id)
                            ? 'bg-rose-50 hover:bg-rose-100'
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    <LuHeart
                        className={`h-5 w-5 transition-colors ${
                            favoritePhonesId.includes(phone.id)
                                ? 'fill-rose-500 text-rose-500'
                                : 'text-gray-400'
                        }`}
                    />
                </button>
                <Image
                    src={phone.images[0]}
                    width={1000}
                    height={2000}
                    alt="phone"
                    className="h-full w-full object-contain transition-all group-hover:h-60"
                />
            </div>
            <div className="flex flex-col gap-3 bg-white p-5">
                <div className="flex flex-col gap-2 border-b border-b-gray-100 pb-4">
                    <p className="text-sm text-blue-600 uppercase">
                        {phone.categories?.name}
                    </p>
                    <Link
                        href={`/Phone/${phone.id}`}
                        onClick={() => setInfoPhone(phone)}
                    >
                        <h3 className="text-lg font-bold duration-300 group-hover:text-blue-600">
                            {phone.name}
                        </h3>
                    </Link>
                    <div className="flex h-6 w-15 items-center justify-center gap-2 rounded-2xl bg-gray-50 font-bold">
                        <GoStarFill className="h-3 w-3 text-amber-300" />
                        4.9
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div>
                        <span className="text-sm text-gray-400">Цена</span>
                        <h4 className="text-lg font-bold">
                            {phone.price.toLocaleString()} ₽
                        </h4>
                    </div>
                    <button
                        onClick={() => setCart(phone)}
                        className="transition-al flex cursor-pointer items-center justify-center rounded-2xl bg-black px-3 py-3 duration-300 ease-in-out group-hover:-translate-y-1"
                    >
                        <IoCartOutline className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
