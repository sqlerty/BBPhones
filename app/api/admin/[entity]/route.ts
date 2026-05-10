import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

interface RouteParams {
    params: Promise<{ entity: string }>;
}

async function checkAdmin(): Promise<boolean> {
    const userId = await getUserIdFromToken();
    if (!userId) return false;

    const user = await prisma.users.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    return user?.role === 'ADMIN';
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { entity } = await params;

    try {
        if (entity === 'users') {
            const data = await prisma.users.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json(data);
        }

        if (entity === 'products') {
            const data = await prisma.products.findMany({
                include: { category: true },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json(data);
        }

        if (entity === 'categories') {
            const data = await prisma.categories.findMany({
                orderBy: { name: 'asc' },
            });
            return NextResponse.json(data);
        }

        if (entity === 'orders') {
            const data = await prisma.orders.findMany({
                include: { user: { select: { email: true } } },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json(data);
        }

        return NextResponse.json({ error: 'Unknown entity' }, { status: 400 });
    } catch {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: RouteParams) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { entity } = await params;
    const body = await req.json();

    try {
        if (entity === 'products') {
            const res = await prisma.products.create({ data: body });
            return NextResponse.json(res);
        }
        if (entity === 'categories') {
            const res = await prisma.categories.create({ data: body });
            return NextResponse.json(res);
        }
        if (entity === 'users') {
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 10);
            }
            const res = await prisma.users.create({ data: body });
            return NextResponse.json(res);
        }

        return NextResponse.json(
            { error: 'Method not allowed for this entity' },
            { status: 400 }
        );
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Create error';
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { entity } = await params;
    const { id, ...payload } = await req.json();

    if (!id)
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const cleanData = { ...payload };
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
    delete cleanData.category;

    try {
        if (entity === 'products') {
            const res = await prisma.products.update({
                where: { id },
                data: cleanData,
            });
            return NextResponse.json(res);
        }
        if (entity === 'users') {
            if (cleanData.password)
                cleanData.password = await bcrypt.hash(cleanData.password, 10);
            const res = await prisma.users.update({
                where: { id },
                data: cleanData,
            });
            return NextResponse.json(res);
        }
        if (entity === 'categories') {
            const res = await prisma.categories.update({
                where: { id },
                data: cleanData,
            });
            return NextResponse.json(res);
        }
        if (entity === 'orders') {
            const res = await prisma.orders.update({
                where: { id },
                data: cleanData,
            });
            return NextResponse.json(res);
        }

        return NextResponse.json({ error: 'Update failed' }, { status: 400 });
    } catch {
        return NextResponse.json(
            { error: 'Update database error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { entity } = await params;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id)
        return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        if (entity === 'products')
            await prisma.products.delete({ where: { id } });
        else if (entity === 'users')
            await prisma.users.delete({ where: { id } });
        else if (entity === 'categories')
            await prisma.categories.delete({ where: { id } });
        else if (entity === 'orders')
            await prisma.orders.delete({ where: { id } });
        else
            return NextResponse.json(
                { error: 'Invalid entity' },
                { status: 400 }
            );

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Delete error' }, { status: 500 });
    }
}
