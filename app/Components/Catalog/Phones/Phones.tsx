'use client';
import { useEffect } from 'react';

import { fetchPhones, useLoading, usePhones } from '@/app/stores/catalogStore';
import PhoneCard from './PhoneCard/PhoneCard';
export default function Phones() {
    const loading = useLoading();
    const phones = usePhones();
    useEffect(() => {
        fetchPhones();
    }, []);
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-5 px-5 py-5">
            {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
            ))}
        </div>
    );
}
