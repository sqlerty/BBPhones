import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (body.event === 'payment.succeeded') {
            const orderId = body.object.metadata.orderId;

            if (orderId) {
                const order = await prisma.orders.findUnique({
                    where: { id: orderId },
                    select: { userId: true },
                });

                if (order) {
                    await prisma.$transaction([
                        prisma.orders.update({
                            where: { id: orderId },
                            data: { status: 'PAID' },
                        }),
                        prisma.cart.deleteMany({
                            where: { userId: order.userId },
                        }),
                    ]);
                }
            }
        }

        if (body.event === 'payment.canceled') {
            const orderId = body.object.metadata.orderId;
            if (orderId) {
                await prisma.orders.update({
                    where: { id: orderId },
                    data: { status: 'CANCELLED' },
                });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Ошибка обработки вебхука:', error);
        return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
    }
}
