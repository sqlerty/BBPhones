import { GoStarFill } from 'react-icons/go';
import { IoCartOutline } from 'react-icons/io5';
import Image from 'next/image';
import { ProductWithCategory } from '@/types/database';
interface IPhoneCard {
    phone: ProductWithCategory;
}
export default function PhoneCard({ phone }: IPhoneCard) {
    return (
        <div
            key={phone.id}
            className="group flex h-130 w-100 flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-200 ease-in-out hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5"
        >
            <div className="h-75 w-full bg-gray-50 p-10">
                <Image
                    src={phone.images[0]}
                    width={1000}
                    height={2000}
                    alt="phone"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-col gap-3 bg-white p-5">
                <div className="flex flex-col gap-2 border-b border-b-gray-100 pb-4">
                    <p className="text-sm text-blue-600 uppercase">
                        {phone.categories?.name}
                    </p>
                    <h3 className="text-lg font-bold duration-300 group-hover:text-blue-600">
                        {phone.name}
                    </h3>
                    <div className="flex h-6 w-15 items-center justify-center gap-2 rounded-2xl bg-gray-50 font-bold">
                        <GoStarFill className="h-3 w-3 text-amber-300" />
                        4.9
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div>
                        <span className="text-sm text-gray-400">Цена</span>
                        <h4 className="text-lg font-bold">{phone.price} Р</h4>
                    </div>
                    <button className="transition-al flex items-center justify-center rounded-2xl bg-black px-3 py-3 duration-300 ease-in-out group-hover:-translate-y-1">
                        <IoCartOutline className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
