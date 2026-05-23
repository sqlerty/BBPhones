import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken();
        if (!userId)
            return NextResponse.json({ error: '401' }, { status: 401 });

        const { address, phone } = await req.json();

        const order = await prisma.$transaction(async (tx) => {
            const cartItems = await tx.cart.findMany({
                where: { userId },
                include: { phone: true },
            });
            const totalAmount = cartItems.reduce(
                (sum, item) => sum + Number(item.phone.price) * item.quantity,
                0
            );

            return await tx.orders.create({
                data: {
                    userId,
                    totalAmount,
                    address,
                    phone,
                    status: 'PENDING',
                    orderItems: {
                        create: cartItems.map((item) => ({
                            phoneId: item.phoneId,
                            quantity: item.quantity,
                            price: item.phone.price,
                        })),
                    },
                },
            });
        });

        const shopId = process.env.YOOKASSA_SHOP_ID;
        const secretKey = process.env.YOOKASSA_SECRET_KEY;

        const authHeader =
            'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64');

        const paymentResponse = await fetch(
            'https://api.yookassa.ru/v3/payments',
            {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                    'Idempotence-Key': order.id,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: {
                        value: order.totalAmount.toFixed(2),
                        currency: 'RUB',
                    },
                    confirmation: {
                        type: 'redirect',
                        return_url: `http://localhost:3000/`,
                    },
                    capture: true,
                    description: `Оплата заказа №${order.id.slice(0, 8)}`,
                    metadata: {
                        orderId: order.id,
                    },
                }),
            }
        );

        const paymentData = await paymentResponse.json();

        return NextResponse.json({
            confirmationUrl: paymentData.confirmation.confirmation_url,
        });
    } catch (error) {
        console.error('Payment error:', error);
        return NextResponse.json({ error: 'Ошибка платежа' }, { status: 500 });
    }
}
