import { AnimatePresence, motion } from 'motion/react';
import { LuStar } from 'react-icons/lu';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import { IRewiews } from '@/app/stores/reviewStore';
interface IRewiewsMap {
    reviews: IRewiews[];
}

export default function Reviews({ reviews }: IRewiewsMap) {
    return (
        <div className="flex flex-col gap-4 lg:col-span-2">
            <AnimatePresence mode="popLayout">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-12 w-12 items-center justify-center self-center rounded-full border-4 border-white bg-white shadow-xl shadow-blue-900/5">
                                        <Image
                                            src={
                                                review.user?.avatarUrl ||
                                                '/img/default-avatar.jpg'
                                            }
                                            alt="profile"
                                            width={600}
                                            height={600}
                                            className="h-full w-full rounded-full border-2 border-purple-100 object-contain"
                                        />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">
                                        {review.user?.name}
                                    </h4>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {formatDistanceToNow(
                                        new Date(review.createdAt),
                                        {
                                            addSuffix: true,
                                            locale: ru,
                                        }
                                    )}
                                </p>
                            </div>
                            <div className="flex rounded-lg bg-gray-50 px-2 py-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <LuStar
                                        key={star}
                                        className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="mb-4 text-sm leading-relaxed text-gray-700">
                            {review.comment}
                        </p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
