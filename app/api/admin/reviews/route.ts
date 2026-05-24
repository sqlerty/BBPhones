import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdmin } from '@/lib/auth';

export async function GET() {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const data = await prisma.reviews.findMany({
            include: {
                user: { select: { email: true } },
                phone: { select: { name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        const formattedData = data.map((review) => ({
            id: review.id,
            userEmail: review.user?.email || 'Неизвестно',
            productName: review.phone?.name || 'Удаленный товар',
            rating: review.rating,
            comment: review.comment || '',
            createdAt: review.createdAt,
        }));

        return NextResponse.json(formattedData);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при получении данных Отзывов' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const { id, ...cleanData } = await req.json();

        if (!id)
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        delete cleanData.createdAt;
        delete cleanData.userEmail;
        delete cleanData.productName;

        const res = await prisma.reviews.update({
            where: { id },
            data: {
                rating: Number(cleanData.rating),
                comment: cleanData.comment,
            },
        });

        return NextResponse.json(res);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при обновлении отзыва' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id)
            return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.reviews.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при удалении отзыва' },
            { status: 500 }
        );
    }
}
