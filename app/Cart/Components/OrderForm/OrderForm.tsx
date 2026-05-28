'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { LuMapPin, LuPhone } from 'react-icons/lu';
import { useUser } from '@/app/stores/profileStore';
import { useCartActions } from '@/app/stores/profileStore';

import OrderDetailsFinish from '../OrderDetails/OrderDetailsFinish';

export default function OrderForm() {
    const user = useUser();
    const { setStep } = useCartActions();
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');

    return (
        <div className="bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-5 py-10">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl font-extrabold">Оплата заказа</h2>
                    <p className="font-medium text-gray-500">
                        Пожалуйста, укажите контактные данные для доставки
                    </p>
                </div>
                <div className="flex justify-between gap-10 max-md:flex-col">
                    <motion.div
                        key="checkout-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="w-full rounded-3xl border border-gray-100 bg-white px-5 py-2 shadow-sm sm:p-8"
                    >
                        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900 max-md:text-lg">
                                Оформление заказа
                            </h2>
                            <button
                                onClick={() => setStep('cart')}
                                className="cursor-pointer text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 max-md:text-xs"
                            >
                                Вернуться к корзине
                            </button>
                        </div>

                        <div className="w-full space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Номер телефона
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <LuPhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        className="block w-full rounded-xl border border-gray-200 py-3 pr-3 pl-11 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="+7 (999) 000-00-00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Адрес доставки
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute pt-3 pl-4">
                                        <LuMapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        rows={2}
                                        className="block w-full resize-none rounded-xl border border-gray-200 py-3 pr-3 pl-11 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <OrderDetailsFinish phone={phone} address={address} />
                </div>
            </div>
        </div>
    );
}
