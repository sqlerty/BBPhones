import { IoSearch } from 'react-icons/io5';
import { LuSlidersHorizontal } from 'react-icons/lu';
export default function TitleBar() {
    return (
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pt-10 pb-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-gray-900">
                    Каталог смартфонов
                </h2>
                <p className="text-gray-500">
                    Выберите устройство, которое подходит именно вам
                </p>
            </div>
            <div className="flex gap-4">
                <div className="group relative">
                    <IoSearch className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Поиск по моделям..."
                        className="w-150 rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-gray-700 shadow-sm transition-all ease-in-out hover:border-gray-300 hover:bg-gray-50">
                <LuSlidersHorizontal />
                <span>Фильтры</span>
            </button>
        </div>
    );
}
