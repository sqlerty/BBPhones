import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const phoneId = searchParams.get('phoneId');

        if (!phoneId)
            return NextResponse.json(
                { error: 'ID товара не указан' },
                { status: 400 }
            );

        const reviews = await prisma.reviews.findMany({
            where: { phoneId },
            include: {
                user: { select: { name: true, email: true, avatarUrl: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(reviews);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при получении отзывов' },
            { status: 500 }
        );
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
        const { phoneId, rating, comment } = await req.json();
        if (!phoneId || !rating)
            return NextResponse.json(
                { error: 'Данные не полные' },
                { status: 400 }
            );
        if (rating < 1 || rating > 5)
            return NextResponse.json(
                { error: 'Оценка должна быть от 1 до 5' },
                { status: 400 }
            );
        const existingReview = await prisma.reviews.findFirst({
            where: { userId, phoneId },
        });
        if (existingReview) {
            return NextResponse.json(
                { error: 'Вы уже оставили отзыв на этот телефон' },
                { status: 400 }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            const newReview = await tx.reviews.create({
                data: {
                    userId,
                    phoneId,
                    rating: Number(rating),
                    comment,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            avatarUrl: true,
                        },
                    },
                },
            });

            const stats = await tx.reviews.aggregate({
                where: { phoneId },
                _avg: { rating: true },
                _count: { id: true },
            });

            const updatedPhone = await tx.phones.update({
                where: { id: phoneId },
                data: {
                    averageRating: stats._avg.rating
                        ? Math.round(stats._avg.rating * 10) / 10
                        : Number(rating),
                    reviewCount: stats._count.id || 1,
                },
            });

            return { newReview, updatedPhone };
        });

        return NextResponse.json(result.newReview);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при сохранении отзыва' },
            { status: 500 }
        );
    }
}
