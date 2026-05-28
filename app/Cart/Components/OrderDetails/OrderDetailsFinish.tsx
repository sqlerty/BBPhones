import { LuShieldCheck, LuLock } from 'react-icons/lu';
import { useCartAmount, useCartActions } from '@/app/stores/profileStore';
import { orderCompleteSchema } from '@/lib/validation';
interface IOrderDetails {
    phone: string;
    address: string;
}

export default function OrderDetailsFinish({ phone, address }: IOrderDetails) {
    const cartAmount = useCartAmount();
    const { createOrder, setStep } = useCartActions();
    const handleSave = async (phone: string, address: string) => {
        const validation = orderCompleteSchema.safeParse({ phone, address });
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;

            const errorMessages = Object.values(fieldErrors)
                .flat()
                .map((err) => `• ${err}`)
                .join('\n');
            alert(
                `Пожалуйста, исправьте следующие ошибки:\n\n${errorMessages}`
            );
            return;
        }
        await createOrder(phone, address);
        setStep('cart');
    };
    return (
        <div className="sticky top-28 flex h-1/12 w-3xl flex-col gap-5 divide-y divide-white/10 rounded-3xl bg-gray-900 p-8 shadow-2xl shadow-gray-900/20 max-md:w-full">
            <div className="pb-5">
                <h2 className="mb-6 text-xl font-bold text-white">
                    Детали заказа
                </h2>
                <div className="flex flex-col gap-3 text-gray-300">
                    <div className="flex items-center justify-between">
                        <span>Товары</span>
                        <span>{cartAmount.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Доставка</span>
                        <span>Бесплатно</span>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">
                        Итого к оплате
                    </span>
                    <span className="text-3xl font-extrabold text-white max-md:text-xl">
                        {cartAmount.toLocaleString()} ₽
                    </span>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <button
                        onClick={() => handleSave(phone, address)}
                        className="w-full cursor-pointer rounded-xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-emerald-500 active:scale-95"
                    >
                        Оплатить заказ
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-gray-400">
                    <LuShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm">Официальная гарантия</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <LuLock className="h-5 w-5 text-blue-400" />
                    <span className="text-sm">Безопасная онлайн-оплата</span>
                </div>
            </div>
        </div>
    );
}
