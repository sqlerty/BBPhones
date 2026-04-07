'use client';
import { useEffect, useState } from 'react';
import { GoStarFill } from 'react-icons/go';
import { IoCartOutline } from 'react-icons/io5';
import { ProductWithCategory } from '@/types/database';
import axios from 'axios';
export default function Phones() {
    const [phones, setPhones] = useState<ProductWithCategory[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response =
                    await axios.get<ProductWithCategory[]>('api/phones');
                setPhones(response.data);
            } catch (err) {
                alert(`Произошла ошибка в принятии данных!: ${err}`);
            } finally {
                setLoading(false);
            }
        };
        fetchPhones();
    }, []);
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-5 px-5 pb-5">
            {phones.map((phone) => (
                <div
                    key={phone.id}
                    className="group flex h-130 w-100 flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-200 ease-in-out hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5"
                >
                    <div className="h-[67%] w-full bg-gray-50"></div>
                    <div className="flex flex-col gap-3 bg-white p-5">
                        <div className="flex flex-col gap-2 border-b border-b-gray-100 pb-4">
                            <p className="text-sm text-blue-600 uppercase">
                                {phone.categories?.name}
                            </p>
                            <h3 className="text-lg font-bold group-hover:text-blue-600">
                                {phone.name}
                            </h3>
                            <div className="flex h-5 w-13 items-center justify-center gap-2 rounded-2xl bg-gray-50 font-bold">
                                <GoStarFill className="h-3 w-3 text-amber-300" />
                                4.9
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <span className="text-sm text-gray-400">
                                    Цена
                                </span>
                                <h4 className="text-lg font-bold">
                                    {phone.price} Р
                                </h4>
                            </div>
                            <button className="transition-al flex items-center justify-center rounded-2xl bg-black px-3 py-3 duration-300 ease-in-out group-hover:-translate-y-1">
                                <IoCartOutline className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
