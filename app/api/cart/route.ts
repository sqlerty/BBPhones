import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );

        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: { phone: { include: { brand: true } } },
            orderBy: { id: 'asc' },
        });

        const formattedCart = cartItems.map((item) => ({
            id: item.phone.id,
            name: item.phone.name,
            price: Number(item.phone.price),
            image: item.phone.images[0],
            ram: item.phone.ram,
            storage: item.phone.storage,
            quantity: item.quantity,
        }));

        return NextResponse.json(formattedCart);
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
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

        const { phoneId, quantity } = await req.json();

        const cartItem = await prisma.cart.upsert({
            where: { userId_phoneId: { userId, phoneId } },
            update: { quantity: quantity },
            create: {
                userId,
                phoneId,
                quantity: 1,
            },
        });

        return NextResponse.json(cartItem);
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при сохранении в корзину' },
            { status: 500 }
        );
    }
}
export async function DELETE(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json(
                { error: 'Не авторизован' },
                { status: 401 }
            );

        const { searchParams } = new URL(req.url);
        const phoneId = searchParams.get('phoneId');

        if (!phoneId) {
            await prisma.cart.deleteMany({ where: { userId } });
            return NextResponse.json({ message: 'Корзина очищена' });
        }

        await prisma.cart.delete({
            where: {
                userId_phoneId: { userId, phoneId },
            },
        });

        return NextResponse.json({ message: 'Товар удален' });
    } catch {
        return NextResponse.json(
            { error: 'Ошибка при удалении' },
            { status: 500 }
        );
    }
}
