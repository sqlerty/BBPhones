'use client';
import { AnimatePresence, motion } from 'motion/react';
import { FilterItems } from '../CatalogData';
import {
    usePhones,
    useSetCategory,
    useSetBrands,
    useSetPriceRange,
    useSelectedCategory,
    useSelectedBrands,
    usePriceRange,
    useClearFilters,
} from '@/app/stores/catalogStore';

export default function Filters() {
    const phones = usePhones();
    const brands = Array.from(
        new Set(phones.map((p) => p.categories?.name))
    ).filter(Boolean);
    const setCategory = useSetCategory();
    const setBrands = useSetBrands();
    const setPriceRange = useSetPriceRange();
    const selectedCategory = useSelectedCategory();
    const selectedBrands = useSelectedBrands();
    const priceRange = usePriceRange();
    const clearFilters = useClearFilters();
    return (
        <AnimatePresence>
            <motion.aside
                initial={{ opacity: 0, width: 0, x: -20 }}
                animate={{ opacity: 1, width: 280, x: 0 }}
                exit={{ opacity: 0, width: 0, x: -20 }}
                className="shrink-0 lg:block"
            >
                <div className="sticky top-28 mx-auto flex h-fit w-xs flex-col divide-y divide-gray-100 rounded-3xl bg-white p-5 shadow-2xl">
                    <div className="mb-5 pb-5">
                        <div className="mb-10 flex justify-between">
                            <h3 className="text-lg font-bold">Фильтры</h3>
                            <button
                                onClick={() => clearFilters()}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Сбросить
                            </button>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Категории</h4>
                            <div className="flex flex-col gap-2">
                                {FilterItems.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setCategory(item.value)}
                                        className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
                                            selectedCategory === item.value
                                                ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 pb-5">
                        <h4 className="mb-4 font-semibold">Бренды</h4>
                        <div className="flex flex-col gap-1">
                            {brands.map((brand) => (
                                <label
                                    key={brand}
                                    className="group flex cursor-pointer items-center gap-4"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(
                                            brand ?? ''
                                        )}
                                        onChange={() => setBrands(brand ?? '')}
                                        className="peer sr-only"
                                    />

                                    <div className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-colors group-hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600">
                                        {selectedBrands.includes(
                                            brand ?? ''
                                        ) && (
                                            <svg
                                                className="h-3.5 w-3.5 text-white"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold">Цена, ₽</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700">
                                    от 0
                                </div>
                                <div className="h-px w-4 bg-gray-300"></div>
                                <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700">
                                    до {priceRange[1].toLocaleString()}
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="150000"
                                step="5000"
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange(parseInt(e.target.value))
                                }
                                className="w-full accent-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}
