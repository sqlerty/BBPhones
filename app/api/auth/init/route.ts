import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
        };
        const user = await prisma.users.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
            },
        });
        if (!user)
            return NextResponse.json(
                { error: 'Пользователь не найден' },
                { status: 401 }
            );

        return NextResponse.json(user);
    } catch {
        return NextResponse.json({ error: 'Токен невалиден' }, { status: 401 });
    }
}
