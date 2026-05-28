'use client';
import { useStep } from '@/app/stores/profileStore';
import Cart from './Cart/Cart';
import OrderForm from './OrderForm/OrderForm';
export default function Main() {
    const step = useStep();
    return (
        <div className="bg-gray-50">
            {step === 'cart' && <Cart />}
            {step === 'form' && <OrderForm />}
        </div>
    );
}
