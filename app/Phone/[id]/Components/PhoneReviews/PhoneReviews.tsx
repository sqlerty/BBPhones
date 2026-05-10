import { useReviews } from '@/app/stores/reviewStore';
import { FaRegCommentAlt } from 'react-icons/fa';
import ReviewForm from './ReviewForm/ReviewForm';
import Reviews from './Reviews/Reviews';

interface IRewiewPhone {
    phoneId: string;
    phoneName: string;
}

export default function PhoneReviews({ phoneId, phoneName }: IRewiewPhone) {
    const reviews = useReviews();
    return (
        <div className="pt-10">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <FaRegCommentAlt className="h-6 w-6 text-blue-600" />
                Отзывы о товаре {phoneName}
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <ReviewForm reviews={reviews} phoneId={phoneId} />
                <Reviews reviews={reviews} />
            </div>
        </div>
    );
}
