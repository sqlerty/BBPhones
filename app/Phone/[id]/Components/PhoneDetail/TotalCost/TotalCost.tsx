import { LuShoppingCart } from 'react-icons/lu';

import { ProductWithCategory } from '@/app/stores/catalogStore';
import { useCartActions } from '@/app/stores/profileStore';
interface ITotalCost {
    phone: ProductWithCategory | null;
}

export default function TotalCost({ phone }: ITotalCost) {
    const { addToCart } = useCartActions();
    return (
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
                <div className="mb-1 text-sm font-medium text-gray-500">
                    Итоговая цена
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {Number(phone?.price).toLocaleString()} ₽
                    </span>
                </div>
            </div>

            <button
                onClick={() => addToCart(phone!)}
                disabled={!phone?.stock}
                className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold shadow-sm transition-all sm:flex-none ${
                    phone?.stock
                        ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95'
                        : 'cursor-not-allowed bg-gray-100 text-gray-400'
                }`}
            >
                <LuShoppingCart className="h-6 w-6" />
                {phone?.stock ? 'В корзину' : 'Нет в наличии'}
            </button>
        </div>
    );
}
