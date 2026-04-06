import { LuTruck, LuShield, LuZap } from 'react-icons/lu';

export default function Pluses() {
    return (
        <div className="border-y border-gray-200 bg-white">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-3 divide-x divide-gray-100 px-5 py-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                        <LuTruck className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h3 className="font-semibold text-gray-900">
                            Бесплатная доставка
                        </h3>
                        <p className="text-sm text-gray-500">
                            При заказе от 10 000 ₽
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                        <LuShield className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h3 className="font-semibold text-gray-900">
                            Официальная гарантия
                        </h3>
                        <p className="text-sm text-gray-500">
                            1 год от производителя
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                        <LuZap className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h3 className="font-semibold text-gray-900">
                            Быстрый возврат
                        </h3>
                        <p className="text-sm text-gray-500">
                            В течение 14 дней
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
