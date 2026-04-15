'use client';
import { LuPhone, LuMail, LuMapPin } from 'react-icons/lu';
import { useUser } from '@/app/stores/AuthoRegStore';
export default function Contacts() {
    const user = useUser();
    return (
        <div className="w-md rounded-2xl bg-white p-10">
            <h2 className="mb-5 text-xl font-bold">Контактные данные</h2>
            <div className="flex flex-col gap-5">
                <div className="flex w-full items-center gap-5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                        <LuPhone className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            Телефон
                        </span>
                        <p className="font-semibold text-gray-900">
                            +7 (999) 123-45-67
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center gap-5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                        <LuMail className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            Email
                        </span>
                        <p className="font-semibold text-gray-900">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="flex w-full items-center gap-5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                        <LuMapPin className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            Адрес доставки
                        </span>
                        <p className="font-semibold text-gray-900">
                            г. Москва, ул. Ленина, д. 10, кв. 25
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
