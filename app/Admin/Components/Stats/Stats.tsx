import {
    useIsStatsLoading,
    useStats,
    useStatsActions,
} from '@/app/stores/adminStore';
import { useEffect } from 'react';
import {
    LuPackage,
    LuShoppingCart,
    LuTrendingUp,
    LuUsers,
} from 'react-icons/lu';
import Charts from './Charts/Charts';

export default function Stats() {
    const stats = useStats();
    const isLoading = useIsStatsLoading();
    const { fetchStats } = useStatsActions();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (isLoading)
        return (
            <p className="pt-10 text-xl font-medium">Загрузка аналитики...</p>
        );
    if (!stats) return <p className="pt-10 text-xl font-medium">Данных нет</p>;
    return (
        <div className="pt-10">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <LuTrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mb-1 font-bold">
                        {stats.stats.totalRevenue.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-gray-500">Общая выручка</div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                            <LuShoppingCart className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mb-1 font-bold">
                        {stats.stats.totalOrders}
                    </div>
                    <div className="text-sm text-gray-500">Всего заказов</div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <LuPackage className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mb-1 font-bold">
                        {stats.stats.productsCount}
                    </div>
                    <div className="text-sm text-gray-500">
                        Товаров в каталоге
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <LuUsers className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                    <div className="mb-1 font-bold">
                        {stats.stats.avgCheck.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-gray-500">Средний чек</div>
                </div>
            </div>

            <Charts stats={stats} />
        </div>
    );
}
