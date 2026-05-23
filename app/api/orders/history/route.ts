import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        const orders = await prisma.orders.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        phone: {
                            include: {
                                brand: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
