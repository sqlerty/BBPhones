'use client';

import { useInfoPhone } from '@/app/stores/catalogStore';
import PhoneDetail from './PhoneDetail/PhoneDetail';
import PhoneReviews from './PhoneReviews/PhoneReviews';
import { useEffect } from 'react';
import { useReviewActions } from '@/app/stores/reviewStore';

export default function PhonePage() {
    const phone = useInfoPhone();
    const { fetchReviews } = useReviewActions();
    useEffect(() => {
        if (phone?.id) {
            fetchReviews(phone.id);
        }
    }, [fetchReviews, phone]);
    if (!phone) {
        return (
            <div className="p-10 text-center">
                Загрузка данных о телефоне...
            </div>
        );
    }
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-10">
                <PhoneDetail phone={phone} />
                <PhoneReviews phoneId={phone!.id} phoneName={phone.name} />
            </div>
        </div>
    );
}
