import Image from 'next/image';
import Link from 'next/link';
import { useFavoritePhones } from '@/app/stores/profileStore';
import { useSetInfoPhone } from '@/app/stores/catalogStore';
import { LuHeart } from 'react-icons/lu';

export default function UserFavorites() {
    const favoritePhones = useFavoritePhones();
    const setInfoPhone = useSetInfoPhone();
    return (
        <div className="grid grid-cols-2 gap-3 p-5">
            {favoritePhones.map((phone) => (
                <Link
                    key={phone.id}
                    href={`/Phone/${phone.id}`}
                    onClick={() => setInfoPhone(phone)}
                    className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-lg sm:p-5"
                >
                    <div className="relative h-20 w-20 shrink-0 rounded-xl bg-gray-50 p-3 sm:h-24 sm:w-24">
                        <Image
                            src={phone.images[0]}
                            alt={phone.name}
                            width={500}
                            height={500}
                            className="h-full w-full object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                        />
                        <div className="absolute -top-2 -right-2 rounded-full bg-rose-100 p-1 text-rose-500 shadow-sm">
                            <LuHeart className="h-3.5 w-3.5 fill-current" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 text-xs font-bold text-blue-600 uppercase">
                            {phone.categories?.name}
                        </div>
                        <div className="mb-2 truncate font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                            {phone.name}
                        </div>
                        <div className="text-lg font-extrabold text-gray-900">
                            {phone.price} ₽
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
