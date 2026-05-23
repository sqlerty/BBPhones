import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdmin } from '@/lib/auth';

export async function GET() {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const data = await prisma.brands.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при получении данных с Категориями' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const body = await req.json();
        const res = await prisma.brands.create({ data: body });
        return NextResponse.json(res);
    } catch {
        return NextResponse.json('Ошибка при содании', { status: 500 });
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
        delete cleanData.updatedAt;

        const res = await prisma.brands.update({
            where: { id },
            data: cleanData,
        });
        return NextResponse.json(res);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при обновлении' },
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

        await prisma.brands.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при удалении' },
            { status: 500 }
        );
    }
}
