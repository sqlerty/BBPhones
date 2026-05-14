import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        }
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if (user?.role !== 'ADMIN')
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const orders = await prisma.orders.findMany();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + Number(order.totalAmount),
            0
        );
        const totalOrders = orders.length;
        const avgCheck = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        const productsCount = await prisma.products.count();

        const paidOrders = await prisma.orders.findMany({
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: { category: true },
                        },
                    },
                },
            },
        });
        const brandMap: Record<string, number> = {};

        paidOrders.forEach((order) => {
            order.orderItems.forEach((item) => {
                const brandName = item.product.category.name;
                const totalPositionPrice = Number(item.price) * item.quantity;

                if (!brandMap[brandName]) brandMap[brandName] = 0;
                brandMap[brandName] += totalPositionPrice;
            });
        });

        const salesByBrands = Object.entries(brandMap)
            .map(([name, sales]) => ({
                name,
                sales,
            }))
            .sort((a, b) => b.sales - a.sales);

        const [budgetCount, middleCount, flagshipCount] = await Promise.all([
            prisma.products.count({ where: { price: { lt: 20000 } } }),
            prisma.products.count({
                where: { price: { gte: 20000, lt: 40000 } },
            }),
            prisma.products.count({ where: { price: { gte: 40000 } } }),
        ]);

        const distributionBySegments = [
            { name: 'Бюджетные', value: budgetCount },
            { name: 'Средний класс', value: middleCount },
            { name: 'Флагманы', value: flagshipCount },
        ];

        const topProducts = await prisma.orderItems.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 5,
        });
        const topSellingModels = await Promise.all(
            topProducts.map(async (item) => {
                const product = await prisma.products.findUnique({
                    where: { id: item.productId },
                    select: { name: true },
                });
                return {
                    name:
                        product?.name.split(' ').slice(0, 3).join(' ') ||
                        'Unknown',
                    value: item._sum.quantity || 0,
                };
            })
        );

        return NextResponse.json({
            stats: { totalRevenue, totalOrders, productsCount, avgCheck },
            salesByBrands,
            distributionBySegments,
            topSellingModels,
        });
    } catch {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
