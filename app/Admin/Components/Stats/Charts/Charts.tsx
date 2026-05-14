import { IAdminStats } from '@/app/stores/adminStore';
import BrandSales from './BrandSales/BrandSales';
import CategoryCount from './CategoryCount/CategoryCount';
import SalesHits from './SalesHits/SalesHits';

interface ICharts {
    stats: IAdminStats;
}

export default function Charts({ stats }: ICharts) {
    return (
        <div className="w-full">
            <div className="mb-10 grid w-full grid-cols-2 gap-5 max-md:grid-cols-1">
                <SalesHits topSellingModels={stats.topSellingModels} />
                <CategoryCount
                    distributionBySegments={stats.distributionBySegments}
                />
            </div>
            <BrandSales brandSales={stats.salesByBrands} />
        </div>
    );
}
