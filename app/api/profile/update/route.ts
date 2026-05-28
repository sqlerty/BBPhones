import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const file = formData.get('avatar') as File | null;
        let avatarUrl = undefined;
        if (file) {
            const uploadDir = path.join(process.cwd(), 'uploads/avatars');
            await mkdir(uploadDir, { recursive: true });
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExtension = path.extname(file.name);
            const fileName = `avatar-${userId}-${uniqueSuffix}${fileExtension}`;
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(path.join(uploadDir, fileName), buffer);
            avatarUrl = `/api/uploads/avatars/${fileName}`;
        }
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                name: name || undefined,
                avatarUrl: avatarUrl || undefined,
                phone: phone || undefined,
                address: address || undefined,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
