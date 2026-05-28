import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdmin } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const data = await prisma.users.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                phone: true,
                address: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка получения данных о пользователях' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin()))
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    try {
        const body = await req.json();
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        const res = await prisma.users.create({ data: body });
        return NextResponse.json(res);
    } catch {
        return NextResponse.json('Ошибка при создании', { status: 500 });
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

        if (cleanData.password) {
            cleanData.password = await bcrypt.hash(cleanData.password, 10);
        }

        const res = await prisma.users.update({
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

        await prisma.users.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при удалении' },
            { status: 500 }
        );
    }
}
