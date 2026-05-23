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

        const favorites = await prisma.favorites.findMany({
            where: { userId },
            include: { phone: { include: { brand: true } } },
        });

        const phones = favorites.map((fav) => fav.phone);
        return NextResponse.json(phones);
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );

        const { phoneId } = await req.json();

        const existingFavorite = await prisma.favorites.findUnique({
            where: { userId_phoneId: { userId, phoneId } },
        });

        if (existingFavorite) {
            await prisma.favorites.delete({
                where: { id: existingFavorite.id },
            });
            return NextResponse.json({
                message: 'Удалено из избранного',
                action: 'removed',
            });
        } else {
            await prisma.favorites.create({ data: { userId, phoneId } });
            return NextResponse.json({
                message: 'Добавлено в избранное',
                action: 'added',
            });
        }
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
