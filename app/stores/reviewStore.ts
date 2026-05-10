import { create, StateCreator } from 'zustand';
import axios from 'axios';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface IRewiews {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: { name: string | null; email: string; avatarUrl: string };
}

interface IRewiewsStore {
    reviews: IRewiews[];
    isReviewsLoading: boolean;
    fetchReviews: (productId: string) => Promise<void>;
    addReview: (
        productId: string,
        rating: number,
        comment: string
    ) => Promise<boolean>;
}

const reviewStore: StateCreator<
    IRewiewsStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
    reviews: [],
    isReviewsLoading: false,
    fetchReviews: async (productId) => {
        set({ isReviewsLoading: true });
        try {
            const { data } = await axios.get(
                `/api/reviews?productId=${productId}`
            );
            set({ reviews: data, isReviewsLoading: false });
        } catch {
            alert('Ошибка загрузки отзывов!');
            set({ isReviewsLoading: false });
        }
    },
    addReview: async (productId, rating, comment) => {
        try {
            const { data } = await axios.post('/api/reviews', {
                productId,
                rating,
                comment,
            });
            set((state) => ({ reviews: [data, ...state.reviews] }));
            alert('Спасибо за отзыв!');
            return true;
        } catch {
            alert('Не удалось добавить отзыв!');
            return false;
        }
    },
});

const useReviewStore = create<IRewiewsStore>()(
    devtools(
        persist(reviewStore, {
            name: 'review-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                reviews: state.reviews,
            }),
        })
    )
);

export const useReviews = () => useReviewStore((state) => state.reviews);
export const useReviewsLoading = () =>
    useReviewStore((state) => state.isReviewsLoading);

export const useReviewActions = () => {
    const { fetchReviews, addReview } = useReviewStore.getState();
    return { fetchReviews, addReview };
};
