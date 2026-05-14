import { IoPhonePortraitOutline } from 'react-icons/io5';

export default function Footer() {
    return (
        <div className="mt-auto border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-5 py-10 max-md:py-5">
                <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-5">
                    <div className="flex flex-col gap-5 max-md:gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <IoPhonePortraitOutline className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold">BBPhones</h2>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                            Современный интернет-магазин смартфонов. Мы
                            предлагаем лучшие девайсы с гарантией качества и
                            быстрой доставкой по всей стране.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-5 font-semibold text-gray-900">
                            Связаться с нами
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li className="flex items-center gap-2">
                                <span className="text-gray-400">Телефон:</span>
                                <a
                                    href="tel:88005553535"
                                    className="font-medium text-gray-900 transition-colors hover:text-blue-600"
                                >
                                    8 (800) 555-35-35
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-gray-400">Email:</span>
                                <a
                                    href="mailto:hello@smartmarket.ru"
                                    className="font-medium text-gray-900 transition-colors hover:text-blue-600"
                                >
                                    hello@smartmarket.ru
                                </a>
                            </li>
                            <li className="pt-2">
                                <p className="text-xs text-gray-400">
                                    Ежедневно с 9:00 до 21:00
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-gray-100 pt-8 max-md:mt-4 max-md:pt-4 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © 2026 BBPhones. Все права защищены.
                    </p>
                </div>
            </div>
        </div>
    );
}
