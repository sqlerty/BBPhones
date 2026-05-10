import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { email, password} = await req.json();
        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Пользователь с таким email уже есть' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({data: {email,password: hashedPassword,role: 'USER'}});

        return NextResponse.json({ message: 'Регистрация успешна', userId: user.id });
    } catch  {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}