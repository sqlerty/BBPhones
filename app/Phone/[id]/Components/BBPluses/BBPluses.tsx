import { LuShieldCheck, LuTruck, LuRotateCcw } from 'react-icons/lu';

export default function BBPluses() {
    return (
        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <LuShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                    Гарантия 1 год
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <LuTruck className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                    Доставка завтра
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50">
                    <LuRotateCcw className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                    Возврат 14 дней
                </span>
            </div>
        </div>
    );
}
