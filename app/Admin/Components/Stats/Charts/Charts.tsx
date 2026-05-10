import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Sector,
    Rectangle,
} from 'recharts';

import { IAdminStats } from '@/app/stores/adminStore';

interface ICharts {
    stats: IAdminStats;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#FF4500', '#FF00FF'];

export default function Charts({ stats }: ICharts) {
    return (
        <div className="w-full">
            <div className="mb-10 grid w-full grid-cols-2 gap-5">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                    <h3 className="mb-6 text-xl font-bold text-gray-800">
                        Хиты продаж (шт.)
                    </h3>

                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stats.topSellingModels}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 40,
                                    bottom: 5,
                                }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: '#4b5563',
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }}
                                    width={100}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[0, 10, 10, 0]}
                                    barSize={20}
                                    shape={(props) => {
                                        const { x, y, width, height, index } =
                                            props;
                                        return (
                                            <Rectangle
                                                x={x}
                                                y={y}
                                                width={width}
                                                height={height}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                                radius={[0, 10, 10, 0]}
                                                className="transition-all duration-300 hover:opacity-80"
                                            />
                                        );
                                    }}
                                ></Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-6 font-bold">
                        Распределение по категориям
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.distributionBySegments}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={130}
                                fill={'#8884d8'}
                                dataKey="value"
                                shape={(props) => {
                                    const { ...rest } = props;
                                    return (
                                        <Sector
                                            {...rest}
                                            fill={
                                                COLORS[
                                                    props.index % COLORS.length
                                                ]
                                            }
                                        />
                                    );
                                }}
                            ></Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-6 font-bold">Продажи по брендам</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.salesByBrands}>
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
        </div>
    );
}
