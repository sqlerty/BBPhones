import Image from 'next/image';
import { LuArrowLeft } from 'react-icons/lu';
import PhoneRate from './Rate/PhoneRate';
import PhoneSpecs from './PhoneSpecs/PhoneSpecs';
import BBPluses from './BBPluses/BBPluses';
import TotalCost from './TotalCost/TotalCost';
import Link from 'next/link';
import { ProductWithCategory } from '@/app/stores/catalogStore';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
interface IDetail {
    phone: ProductWithCategory | null;
}

export default function PhoneDetail({ phone }: IDetail) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide
            ? phone!.images.length - 1
            : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === phone!.images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <div>
            <Link
                href={'/'}
                className="group flex w-fit items-center gap-2 font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
                <LuArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Назад в каталог
            </Link>
            <div className="mt-10 flex w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm max-md:flex-col">
                <div className="flex w-1/2 flex-col items-center justify-center gap-4 max-md:w-full">
                    <div className="group relative aspect-square w-full overflow-hidden rounded-4xl">
                        <Image
                            src={phone?.images[currentIndex] || ''}
                            alt="Product image"
                            fill
                            priority
                            className="object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 text-black opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white"
                        >
                            <IoIosArrowBack size={24} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 text-black opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white"
                        >
                            <IoIosArrowForward size={24} />
                        </button>
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                            {phone?.images.map((_: string, index: number) => (
                                <div
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        currentIndex === index
                                            ? 'w-6 bg-black'
                                            : 'w-1.5 bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {phone!.images.length > 1 && (
                        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
                            {phone?.images.map((img: string, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${
                                        currentIndex === index
                                            ? 'border-purple-600'
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumb ${index}`}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex w-1/2 flex-col gap-7 bg-white p-10 max-md:w-full">
                    <div>
                        <p className="mb-2 text-sm font-bold text-blue-600 uppercase">
                            {phone?.category.name}
                        </p>
                        <h3 className="text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                            {phone?.name}
                        </h3>
                    </div>
                    <PhoneRate phone={phone} />
                    <p className="text-lg leading-relaxed text-gray-600">
                        {phone?.description}
                    </p>
                    <PhoneSpecs phone={phone} />
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="font-medium text-gray-500">
                                Конфигурация памяти:
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex cursor-pointer flex-col rounded-xl border-2 border-blue-600 bg-white px-5 py-3">
                                <span className="font-bold text-gray-900">
                                    {phone?.storage} ГБ
                                </span>
                                <span className="text-xs text-gray-500">
                                    {phone?.ram} RAM
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TotalCost phone={phone} />
                        <BBPluses />
                    </div>
                </div>
            </div>
        </div>
    );
}
