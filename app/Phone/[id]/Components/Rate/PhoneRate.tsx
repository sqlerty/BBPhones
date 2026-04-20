import { FaStar } from 'react-icons/fa';
import { ISpecs } from '../PhoneSpecs/PhoneSpecs';
export default function PhoneRate({ phone }: ISpecs) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-amber-100 bg-amber-50 px-3 py-1.5">
                <FaStar className="mr-1.5 h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-900">4.7</span>
            </div>
            <a
                href="#reviews"
                className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600"
            >
                100 отзывов
            </a>
            <span className="hidden text-gray-300 sm:inline">•</span>
            <span className="text-sm font-medium text-gray-500">
                Артикул: SM-{phone?.category_id.slice(15)}
            </span>
        </div>
    );
}
