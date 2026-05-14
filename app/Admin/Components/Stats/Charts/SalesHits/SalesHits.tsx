import { ITopModel } from '@/app/stores/adminStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
} from 'recharts';

interface IHits {
    topSellingModels: ITopModel[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#FF4500', '#FF00FF'];
export default function SalesHits({ topSellingModels }: IHits) {
    return (
        <div className="rounded-lg bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-bold text-gray-800">
                Хиты продаж (шт.)
            </h3>

            <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={topSellingModels}
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
                                const { x, y, width, height, index } = props;
                                return (
                                    <Rectangle
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={COLORS[index % COLORS.length]}
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
    );
}
