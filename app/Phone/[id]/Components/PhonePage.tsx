'use client';
import Link from 'next/link';
import { useInfoPhone } from '@/app/stores/catalogStore';
import Image from 'next/image';
import { LuArrowLeft } from 'react-icons/lu';
import PhoneRate from './Rate/PhoneRate';
import PhoneSpecs from './PhoneSpecs/PhoneSpecs';
import BBPluses from './BBPluses/BBPluses';
import TotalCost from './TotalCost/TotalCost';

export default function PhonePage() {
    const phone = useInfoPhone();
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl p-5">
                <Link
                    href={'/'}
                    className="group flex w-fit items-center gap-2 font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                    <LuArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Назад в каталог
                </Link>
                <div className="mt-10 flex w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex w-1/2 items-center justify-center p-10">
                        {phone?.images[0] && (
                            <Image
                                src={phone?.images[0]}
                                alt="phone"
                                width={500}
                                height={500}
                                className="object-center"
                            />
                        )}
                    </div>
                    <div className="flex w-1/2 flex-col gap-7 bg-white p-10">
                        <div>
                            <p className="mb-2 text-sm font-bold text-blue-600 uppercase">
                                {phone?.categories?.name}
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
        </div>
    );
}
