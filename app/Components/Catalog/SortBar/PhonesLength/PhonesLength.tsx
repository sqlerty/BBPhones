'use client';
import { usePhones } from '@/app/stores/catalogStore';
export default function PhonesLength() {
    const phones = usePhones();
    const phonesLength = phones.length;
    return (
        <p className="font-medium text-gray-500">
            Показано: <span className="text-gray-900">{phonesLength}</span>{' '}
            товаров
        </p>
    );
}
