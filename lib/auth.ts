import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export async function getUserIdFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
        };
        return decoded.userId;
    } catch {
        return null;
    }
}
export async function checkAdmin(): Promise<boolean> {
    const userId = await getUserIdFromToken();
    if (!userId) return false;

    const user = await prisma.users.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    return user?.role === 'ADMIN';
}
