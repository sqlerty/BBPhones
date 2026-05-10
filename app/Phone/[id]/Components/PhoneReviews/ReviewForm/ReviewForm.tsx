'use client';
import { IRewiews, useReviewActions } from '@/app/stores/reviewStore';
import { useState } from 'react';
import { LuSend, LuStar } from 'react-icons/lu';

interface IRewiewForm {
    phoneId: string;
    reviews: IRewiews[];
}

export default function ReviewForm({ phoneId, reviews }: IRewiewForm) {
    const [rate, setRate] = useState(5);
    const [comment, setComment] = useState('');
    const { addReview } = useReviewActions();
    const averageRating = (
        reviews.reduce((sum, i) => sum + i.rating, 0) / reviews.length
    ).toFixed(1);
    const handleSubmit = (
        e: React.SubmitEvent,
        phoneId: string,
        rate: number,
        comment: string
    ) => {
        e.preventDefault();
        addReview(phoneId, rate, comment);
    };
    return (
        <div className="space-y-6 lg:col-span-1">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-2 text-5xl font-black text-gray-900">
                    {!isNaN(Number(averageRating)) ? averageRating : 0}
                </div>
                <div className="mb-2 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <LuStar
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(Number(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-500">
                    На основе {reviews.length} отзывов
                </p>
            </div>
            <div className="rounded-3xl border border-blue-100/50 bg-blue-50/50 p-6">
                <h3 className="mb-4 font-semibold text-gray-900">
                    Написать отзыв
                </h3>
                <form
                    onSubmit={(e) => handleSubmit(e, phoneId, rate, comment)}
                    className="space-y-4"
                >
                    <div>
                        <div className="mb-3 flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRate(star)}
                                    className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <LuStar
                                        className={`h-6 w-6 ${star <= rate ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <textarea
                            required
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Достоинства, недостатки, комментарий..."
                            className="w-full resize-none rounded-2xl border-gray-200 p-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <LuSend className="h-4 w-4" />
                        Отправить отзыв
                    </button>
                </form>
            </div>
        </div>
    );
}
