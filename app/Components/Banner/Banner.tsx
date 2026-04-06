import { FaArrowRight } from 'react-icons/fa6';
export default function Banner() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pt-25 pb-10">
                <div className="inline-flex w-68 items-center gap-2 rounded-full border border-blue-200/50 bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-700">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    </span>
                    Новинки 2026 года уже в продаже
                </div>
                <h1 className="w-120 text-5xl font-extrabold">
                    Технологии будущего в{' '}
                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        твоих руках
                    </span>
                </h1>
                <p className="max-w-lg text-lg text-gray-600">
                    Откройте для себя мир флагманских смартфонов. Лучшие цены,
                    официальная гарантия и быстрая доставка до вашей двери.
                </p>
                <div className="flex items-center gap-4">
                    <button className="group flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-gray-800">
                        В каталог
                        <FaArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
