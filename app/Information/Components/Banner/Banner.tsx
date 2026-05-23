'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { LuStore } from 'react-icons/lu';
export default function Banner() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20 flex flex-col items-center gap-12 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row md:p-12"
        >
            <div className="flex-1 space-y-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 font-medium text-blue-600">
                    <LuStore className="h-5 w-5" />
                    <span>BBPhones</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                    Мы делаем технологии доступными
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                    SmartMarket — это не просто магазин электроники. Мы команда
                    энтузиастов, которые любят современные гаджеты и хотят,
                    чтобы покупка нового устройства приносила только радость.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                    Наша миссия — предоставить лучший сервис на рынке, честные
                    цены и квалифицированную поддержку каждому клиенту,
                    независимо от бюджета покупки.
                </p>
            </div>
            <div className="relative w-full flex-1">
                <div className="absolute inset-0 z-0 scale-105 rotate-3 rounded-3xl bg-blue-100" />
                <Image
                    src="/img/phones.jpg"
                    alt="Внутри нашего магазина"
                    loading="eager"
                    width={500}
                    height={300}
                    className="relative z-10 aspect-video h-auto w-full rounded-3xl object-cover shadow-lg"
                />
            </div>
        </motion.section>
    );
}
