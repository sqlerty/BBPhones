import { LuMonitor, LuCpu, LuCamera, LuBattery } from 'react-icons/lu';
import { ProductWithCategory } from '@/types/database';
export interface ISpecs {
    phone: ProductWithCategory | null;
}

export default function PhoneSpecs({ phone }: ISpecs) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 p-4 text-center transition-colors hover:bg-blue-50">
                <LuMonitor className="h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-500">
                    {phone?.specs?.screen}
                </span>
            </div>
            <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 p-4 text-center transition-colors hover:bg-blue-50">
                <LuCpu className="h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-600" />
                <span className="w-full px-1 text-xs font-medium text-gray-500">
                    {phone?.specs?.processor}
                </span>
            </div>
            <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 p-4 text-center transition-colors hover:bg-blue-50">
                <LuCamera className="h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-500">
                    {phone?.specs?.camera}
                </span>
            </div>
            <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 p-4 text-center transition-colors hover:bg-blue-50">
                <LuBattery className="h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-500">
                    {phone?.specs?.battery}
                </span>
            </div>
        </div>
    );
}
