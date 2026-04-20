import Link from 'next/link';
import { LuShieldCheck, LuLock } from 'react-icons/lu';

export default function OrderDetails() {
    return (
        <div className="sticky top-28 flex h-1/12 w-full flex-col gap-5 divide-y divide-white/10 rounded-3xl bg-gray-900 p-8 shadow-2xl shadow-gray-900/20">
            <div className="pb-5">
                <h2 className="mb-6 text-xl font-bold text-white">
                    Детали заказа
                </h2>
                <div className="flex flex-col gap-3 text-gray-300">
                    <div className="flex items-center justify-between">
                        <span>Товары</span>
                        <span>80 000 Р</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Доставка</span>
                        <span>Бесплатно</span>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">
                        Итого к оплате
                    </span>
                    <span className="text-3xl font-extrabold text-white">
                        84 980 ₽
                    </span>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <button className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 active:scale-95">
                        Перейти к оформлению
                    </button>
                    <Link
                        href="/"
                        className="text-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
                    >
                        Продолжить покупки
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-gray-400">
                    <LuShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm">Официальная гарантия</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <LuLock className="h-5 w-5 text-blue-400" />
                    <span className="text-sm">Безопасная онлайн-оплата</span>
                </div>
            </div>
        </div>
    );
}
