'use client';
import { useEffect } from 'react';

import {
    useCatalogActions,
    useLoading,
    useFilterPhones,
} from '@/app/stores/catalogStore';
import PhoneCard from './PhoneCard/PhoneCard';
import LoadingCards from './LoadingPhones';
export default function Phones() {
    const loading = useLoading();
    const { fetchPhones } = useCatalogActions();
    const phones = useFilterPhones();
    useEffect(() => {
        fetchPhones();
    }, [fetchPhones]);
    if (loading) {
        return <LoadingCards />;
    }
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-5 px-5 py-5 max-md:grid-cols-1">
            {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
            ))}
        </div>
    );
}
