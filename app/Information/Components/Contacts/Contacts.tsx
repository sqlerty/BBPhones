'use client';
import { motion } from 'motion/react';
import { BsGeoAlt } from 'react-icons/bs';
import { contactData } from '../infoData';

export default function Contacts() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="mb-10 text-center">
                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-gray-900">
                    <BsGeoAlt className="h-8 w-8 text-blue-600" /> Наши контакты
                </h2>
            </div>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                {contactData.map((item, index) => (
                    <div key={index}>
                        <div className="group rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                                <item.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <p className="text-lg font-medium text-gray-600">
                                {item.value}
                            </p>
                            <p className="mt-2 text-sm text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative mt-10 h-112.5 overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-sm">
                <div className="pointer-events-none absolute top-6 left-6 z-10 max-w-sm rounded-2xl border border-gray-100 bg-white/90 px-6 py-4 shadow-lg backdrop-blur max-md:hidden">
                    <h3 className="mb-1 text-lg font-bold text-gray-900">
                        BBPhones
                    </h3>
                    <p className="flex items-start gap-2 text-sm text-gray-600">
                        <BsGeoAlt className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                        г. Великий Новгород, ул. Большая Санкт-Петербургская
                        улица, 39к1
                    </p>
                </div>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=31.262588%2C58.538679&mode=whatshere&source=serp_navig&whatshere%5Bpoint%5D=31.261948%2C58.538715&whatshere%5Bzoom%5D=17&z=17.6"
                    width="100%"
                    height="100%"
                    className="pointer-events-auto rounded-xl"
                    allowFullScreen={true}
                    title="Карта расположения магазина"
                ></iframe>
            </div>
        </motion.section>
    );
}
