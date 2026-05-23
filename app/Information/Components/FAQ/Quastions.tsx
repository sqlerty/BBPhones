'use client';
import { AnimatePresence, motion } from 'motion/react';
import { LuChevronDown } from 'react-icons/lu';
import { faqData } from '../infoData';
import { TbMessageQuestion } from 'react-icons/tb';
import { useState } from 'react';

export default function Quastions() {
    const [openInfo, setOpenInfo] = useState<number | null>(0);
    const toggleInfo = (id: number) => {
        setOpenInfo(openInfo === id ? null : id);
    };
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
        >
            <div className="mb-10 text-center">
                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-gray-900">
                    <TbMessageQuestion className="h-8 w-8 text-blue-600" />{' '}
                    Частые вопросы
                </h2>
            </div>
            <div className="space-y-5">
                {faqData.map((item) => (
                    <div
                        key={item.id}
                        className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                            openInfo === item.id
                                ? 'border-blue-200 ring-4 ring-blue-50'
                                : 'border-gray-100 hover:border-gray-200'
                        }`}
                    >
                        <button
                            onClick={() => toggleInfo(item.id)}
                            className="flex w-full items-center justify-between p-5"
                        >
                            <span className="flex items-center gap-4 text-lg font-semibold text-gray-900">
                                <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                                        openInfo === item.id
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-50 text-gray-400'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                </span>
                                {item.question}
                            </span>
                            <LuChevronDown
                                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                                    openInfo === item.id
                                        ? 'rotate-180 text-blue-600'
                                        : ''
                                }`}
                            />
                        </button>
                        <AnimatePresence>
                            {openInfo === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <div className="border-t border-gray-50 px-6 pt-2 pb-6 pl-22 leading-relaxed text-gray-600">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
