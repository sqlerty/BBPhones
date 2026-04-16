import { LuTrash2, LuMinus, LuPlus } from 'react-icons/lu';
export default function CartPhone() {
    return (
        <div className="flex w-3xl justify-between rounded-3xl border border-gray-100 bg-white p-5">
            <div className="flex gap-5">
                <div className="flex h-40 w-32 items-center justify-center rounded-2xl bg-gray-50 p-4"></div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-xs font-bold text-blue-600 uppercase">
                                Nothing
                            </p>
                            <h3 className="text-lg font-bold duration-300 group-hover:text-blue-600">
                                Nothing Phone 2
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                12 ГБ RAM
                            </span>
                            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                256 ГБ
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-white hover:shadow-sm disabled:opacity-50">
                            <LuMinus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900">
                            1
                        </span>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-white hover:shadow-sm">
                            <LuPlus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between text-right">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-300 transition-colors hover:bg-rose-50 hover:text-rose-500">
                    <LuTrash2 className="h-4 w-4" />
                </button>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-400">
                        Цена за шт: 44 990 ₽
                    </span>
                    <h3 className="text-xl font-extrabold">44 990 ₽</h3>
                </div>
            </div>
        </div>
    );
}
