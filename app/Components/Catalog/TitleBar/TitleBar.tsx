'use client';
import { LuSlidersHorizontal } from 'react-icons/lu';
import { useCatalogActions } from '@/app/stores/catalogStore';
import SearchPhones from './SearchPhones/SearchPhones';

export default function TitleBar() {
    const { setFilter } = useCatalogActions();
    return (
        <div
            id="catalog"
            className="mx-auto flex max-w-7xl items-center justify-between px-5 pt-10 pb-10 max-md:w-full max-md:flex-col max-md:gap-5"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-gray-900">
                    Каталог смартфонов
                </h2>
                <p className="text-gray-500">
                    Выберите устройство, которое подходит именно вам
                </p>
            </div>
            <div className="p-2 max-md:w-screen">
                <SearchPhones />
            </div>
            <button
                onClick={() => setFilter()}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-gray-700 shadow-sm transition-all ease-in-out hover:border-gray-300 hover:bg-gray-50"
            >
                <LuSlidersHorizontal />
                <span>Фильтры</span>
            </button>
        </div>
    );
}
