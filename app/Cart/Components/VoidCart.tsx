import Link from 'next/link';
import { LuShoppingBag, LuArrowRight } from 'react-icons/lu';

export default function VoidCart() {
    return (
        <div className="bg-gray-50">
            <div className="flex h-screen flex-col items-center justify-center gap-10">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 shadow-inner">
                    <LuShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h2 className="text-3xl font-extrabold">Корзина пуста</h2>
                    <p className="w-100 text-center text-lg text-gray-500">
                        Похоже, вы еще ничего не добавили в корзину. Откройте
                        для себя наши лучшие предложения в каталоге!
                    </p>
                </div>
                <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-2xl bg-black px-8 py-4 font-medium text-white shadow-xl shadow-gray-900/10 transition-colors duration-300 ease-in-out hover:bg-blue-600"
                >
                    Перейти в каталог
                    <LuArrowRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
