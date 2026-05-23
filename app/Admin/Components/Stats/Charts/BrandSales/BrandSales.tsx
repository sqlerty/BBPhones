import { ISegmentChartData } from '@/app/stores/adminStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
interface IBrandsSales {
    brandSales: ISegmentChartData[];
}
export default function BrandSales({ brandSales }: IBrandsSales) {
    return (
        <div>
            <div className="block rounded-lg bg-white p-6 shadow-sm max-md:hidden">
                <h3 className="mb-6 font-bold">Продажи по брендам</h3>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={brandSales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey={'sales'} />
                        <Tooltip
                            formatter={(value: unknown) =>
                                `${Number(value).toLocaleString()} ₽`
                            }
                        />
                        <Legend />
                        <Bar dataKey="sales" fill="#3b82f6" name="Продажи" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="hidden rounded-lg bg-white p-6 shadow-sm max-md:block">
                <h3 className="mb-6 font-bold">Продажи по брендам</h3>
                <ResponsiveContainer width="105%" height={320}>
                    <BarChart
                        data={brandSales}
                        margin={{ top: 10, right: 2, left: -25, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <YAxis
                            dataKey={'sales'}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickFormatter={(value) => {
                                if (value >= 1000000)
                                    return `${(value / 1000000).toFixed(1)}M`;
                                if (value >= 1000) return `${value / 1000}k`;
                                return value;
                            }}
                        />
                        <Tooltip
                            formatter={(value: unknown) =>
                                `${Number(value).toLocaleString()} ₽`
                            }
                        />
                        <Legend />
                        <Bar dataKey="sales" fill="#3b82f6" name="Продажи" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
