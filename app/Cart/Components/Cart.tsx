import { LuTrash2 } from 'react-icons/lu';
import CartPhone from './CartPhone/CartPhone';
import OrderDetails from './OrderDetails/OrderDetails';

export default function Cart() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col px-5 pt-10">
                <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl font-extrabold">
                            Ваша корзина
                        </h2>
                        <p className="font-medium text-gray-500">
                            У вас 3 товара на сумму 100 000 Р
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2">
                        <LuTrash2 className="h-4 w-4" />
                        Очистить всё
                    </button>
                </div>
                <div className="flex justify-between gap-10 py-10">
                    <div className="flex flex-col gap-5">
                        <CartPhone />
                    </div>
                    <OrderDetails />
                </div>
            </div>
        </div>
    );
}
