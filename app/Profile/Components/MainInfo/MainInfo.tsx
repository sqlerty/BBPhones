'use client';
import { useUser, setLogout } from '@/app/stores/AuthoRegStore';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuChevronRight, LuShield, LuLogOut } from 'react-icons/lu';
export default function MainInfo() {
    const user = useUser();
    const handleLogout = setLogout;
    return (
        <div className="flex w-md flex-col gap-5 rounded-2xl bg-white p-10">
            <div className="flex h-24 w-24 items-center justify-center self-center rounded-full border-4 border-white bg-white shadow-xl shadow-blue-900/5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-4xl font-bold text-white">
                    {user?.email?.toUpperCase().charAt(0)}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">Гость</h2>
                <p className="font-medium text-gray-500">{user?.email}</p>
            </div>
            <div className="flex justify-between gap-5">
                <div className="flex h-20 w-50 flex-col items-center justify-center rounded-2xl bg-gray-50">
                    <h2 className="text-2xl font-black">3</h2>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                        Заказов
                    </p>
                </div>
                <div className="flex h-20 w-50 flex-col items-center justify-center rounded-2xl">
                    <h2 className="text-2xl font-black">0</h2>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                        Избранных
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <button className="group flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl p-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <div className="flex items-center gap-4">
                        <IoSettingsOutline className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                        <p>Настройки профиля</p>
                    </div>
                    <LuChevronRight className="h-4 w-4 text-gray-300" />
                </button>
                <button className="group flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl p-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
                    <div className="flex items-center gap-4">
                        <LuShield className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                        <p>Режим администратора</p>
                    </div>
                    <LuChevronRight className="h-4 w-4 text-gray-300" />
                </button>
                <button
                    onClick={handleLogout}
                    className="flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl p-3 font-medium text-rose-600 transition-colors hover:bg-gray-50"
                >
                    <div className="flex items-center gap-4">
                        <LuLogOut className="h-5 w-5" />
                        <p>Выйти из аккаунта</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
