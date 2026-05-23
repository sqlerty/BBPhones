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
    const statsArr = [
        {
            icon: LuTrendingUp,
            value: stats.stats.totalRevenue.toLocaleString(),
            name: 'Общая выручка',
            r: true,
        },
        {
            icon: LuShoppingCart,
            value: stats.stats.totalOrders,
            name: 'Всего заказов',
        },
        {
            icon: LuPackage,
            value: stats.stats.productsCount,
            name: 'Товаров в каталоге',
        },
        {
            icon: LuUsers,
            value: stats.stats.avgCheck.toLocaleString(),
            name: 'Средний чек',
            r: true,
        },
    ];
    return (
        <div className="pt-10">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                {statsArr.map((item) => (
                    <div
                        className="rounded-lg bg-white p-6 shadow-sm max-md:w-full max-md:text-center"
                        key={item.name}
                    >
                        <div className="mb-2 flex items-center justify-between max-md:justify-self-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <item.icon className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mb-1 font-bold">
                            {item.r ? `${item.value} ₽` : item.value}{' '}
                        </div>
                        <div className="text-sm text-gray-500">{item.name}</div>
                    </div>
                ))}
            </div>

            <Charts stats={stats} />
        </div>
    );
}
