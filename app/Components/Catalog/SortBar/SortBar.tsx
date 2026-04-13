import PhonesLength from './PhonesLength/PhonesLength';
export default function SortBar() {
    return (
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-5">
            <PhonesLength />
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 sm:inline">
                    Сортировка:
                </span>
                <select
                    className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-10 pl-4 font-medium text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.5rem center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `1.5em 1.5em`,
                    }}
                >
                    <option value="popular">Сначала популярные</option>
                    <option value="price-asc">Сначала дешевые</option>
                    <option value="price-desc">Сначала дорогие</option>
                    <option value="rating">По рейтингу</option>
                </select>
            </div>
        </div>
    );
}
