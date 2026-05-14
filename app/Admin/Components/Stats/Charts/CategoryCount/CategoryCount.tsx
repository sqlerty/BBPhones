import { IDistributionBySegments } from '@/app/stores/adminStore';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IDistribution {
    distributionBySegments: IDistributionBySegments[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#FF4500', '#FF00FF'];

export default function CategoryCount({
    distributionBySegments,
}: IDistribution) {
    const coloredData = distributionBySegments.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length],
    }));
    return (
        <div>
            <div className="block rounded-lg bg-white p-6 shadow-sm max-md:hidden">
                <h3 className="mb-6 font-bold">Распределение по категориям</h3>
                <ResponsiveContainer width="99%" height={320}>
                    <PieChart>
                        <Pie
                            data={coloredData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={120}
                            fill={'#8884d8'}
                            dataKey="value"
                        ></Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="hidden rounded-lg bg-white p-6 shadow-sm max-md:block">
                <h3 className="mb-6 font-bold">Распределение по категориям</h3>
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Pie
                            data={coloredData}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            labelLine={false}
                            outerRadius={'80%'}
                            fill={'#8884d8'}
                            dataKey="value"
                        ></Pie>
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{
                                paddingTop: '30px',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
