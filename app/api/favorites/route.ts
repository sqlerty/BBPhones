import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

        const favorites = await prisma.favorites.findMany({where: { userId },include: {product: {include: { category: true } }}});

        const products = favorites.map(fav => fav.product);
        return NextResponse.json(products);
    } catch  {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

        const { productId } = await req.json();

        const existingFavorite = await prisma.favorites.findUnique({
            where: {userId_productId: { userId, productId }}});

        if (existingFavorite) {
            await prisma.favorites.delete({where: { id: existingFavorite.id }});
            return NextResponse.json({ message: 'Удалено из избранного', action: 'removed' });
        } else {
            await prisma.favorites.create({data: { userId, productId }});
            return NextResponse.json({ message: 'Добавлено в избранное', action: 'added' });
        }
    } catch  {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}