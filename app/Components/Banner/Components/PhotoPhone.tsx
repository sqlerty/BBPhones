'use client';
import { motion } from 'motion/react';
import { LuStar } from 'react-icons/lu';
import Image from 'next/image';

export default function PhotoPhone() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
        >
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-blue-100 to-indigo-50 opacity-50 blur-3xl" />
            <Image
                src="/img/phone.jfif"
                alt="Latest Smartphones"
                className="w-full -rotate-2 rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:rotate-0"
                width={400}
                height={600}
            />
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-md"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <LuStar className="h-6 w-6 fill-current" />
                </div>
                <div>
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-500">Средний рейтинг</div>
                </div>
            </motion.div>
        </motion.div>
    );
}
