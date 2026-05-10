import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

        const cartItems = await prisma.cart.findMany({where: { userId },include: {product: {include: { category: true }}},
            orderBy: { id: 'asc' }
        });

        const formattedCart = cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: Number(item.product.price),
            image: item.product.images[0],
            ram: item.product.ram,
            storage: item.product.storage,
            quantity: item.quantity
        }));

        return NextResponse.json(formattedCart);
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

        const { productId, quantity } = await req.json();

        const cartItem = await prisma.cart.upsert({where: {userId_productId: { userId, productId }},update: {quantity: quantity},
            create: {
                userId,
                productId,
                quantity: 1
            }
        });

        return NextResponse.json(cartItem);
    } catch {
        return NextResponse.json({ error: 'Ошибка при сохранении в корзину' }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            await prisma.cart.deleteMany({ where: { userId } });
            return NextResponse.json({ message: 'Корзина очищена' });
        }

        await prisma.cart.delete({
            where: {
                userId_productId: { userId, productId }
            }
        });

        return NextResponse.json({ message: 'Товар удален' });
    } catch {
        return NextResponse.json({ error: 'Ошибка при удалении' }, { status: 500 });
    }
}