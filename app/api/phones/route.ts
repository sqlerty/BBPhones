import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const phones = await prisma.phones.findMany({
            include: {
                brand: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(phones);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Ошибка при получении данных' },
            { status: 500 }
        );
    }
}
