import { motion } from 'motion/react';
import Link from 'next/link';
import { LuPackage } from 'react-icons/lu';
import { useOrders, useOrdersLoading } from '@/app/stores/profileStore';
import Image from 'next/image';
import { useCatalogActions } from '@/app/stores/catalogStore';

export default function UserOrders() {
    const { setInfoPhone } = useCatalogActions();
    const orders = useOrders();
    const ordersLoading = useOrdersLoading();
    if (ordersLoading)
        return <div className="p-10 text-center">Загрузка истории...</div>;
    if (orders.length === 0)
        return <div className="p-10 text-center">У вас еще нет заказов</div>;
    return (
        <motion.div
            key="orders"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 p-5"
        >
            {orders.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                        <LuPackage className="h-10 w-10 text-gray-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                        У вас пока нет заказов
                    </h3>
                    <p className="mx-auto mb-8 max-w-sm text-gray-500">
                        Оформите свой первый заказ, и он появится здесь.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                    >
                        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-6 py-4 sm:flex-row sm:items-center">
                            <div>
                                <div className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                    Заказ от{' '}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className="text-lg font-extrabold text-gray-900">
                                    № SM-{order.id}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                {order.orderItems?.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/Phone/${item.phone.slug}`}
                                        onClick={() =>
                                            setInfoPhone(item.phone.id)
                                        }
                                        className="flex gap-2"
                                    >
                                        <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 p-2">
                                            <Image
                                                src={item.phone.images[0]}
                                                alt={item.phone.name}
                                                height={600}
                                                width={600}
                                                className="h-full w-full object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center">
                                            <div className="mb-1 text-xs font-bold text-blue-600 uppercase">
                                                {item.phone.brand?.name ||
                                                    'Смартфон'}
                                            </div>
                                            <div className="font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                {item.phone.name}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {item.quantity} шт. ×{' '}
                                                {item.price.toLocaleString()} ₽
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                            <span className="font-medium text-gray-600">
                                Итого оплачено:
                            </span>
                            <span className="text-xl font-extrabold text-gray-900">
                                {Number(order.totalAmount).toLocaleString()} ₽
                            </span>
                        </div>
                    </div>
                ))
            )}
        </motion.div>
    );
}
