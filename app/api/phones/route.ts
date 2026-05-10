import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.products.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
    }
}