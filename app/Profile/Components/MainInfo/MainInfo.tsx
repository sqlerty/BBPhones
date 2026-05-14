'use client';
import {
    useUser,
    useIsAdmin,
    useAuthActions,
    useFavoriteLength,
} from '@/app/stores/profileStore';
import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuChevronRight, LuShield, LuLogOut } from 'react-icons/lu';
import { useModalActions } from '@/app/stores/modalStore';
import Image from 'next/image';
import { useOrdersLength } from '@/app/stores/profileStore';
export default function MainInfo() {
    const user = useUser();
    const router = useRouter();
    const isAdmin = useIsAdmin();
    const { openModal } = useModalActions();
    const { handleLogout, setAdmin } = useAuthActions();
    const favoriteLength = useFavoriteLength();
    const ordersLength = useOrdersLength();
    return (
        <div className="flex w-md flex-col gap-5 rounded-2xl bg-white p-10 max-md:w-full">
            <div className="flex h-24 w-24 items-center justify-center self-center rounded-full border-4 border-white bg-white shadow-xl shadow-blue-900/5">
                <Image
                    src={
                        user?.avatarUrl ||
                        'https://www.magnific.com/free-vector/illustration-businessman_2606517.htm#fromView=keyword&page=1&position=6&uuid=1b19769d-cce1-4266-bbb0-bd446b4ed875&query=Default+avatar'
                    }
                    alt="profile"
                    width={600}
                    height={600}
                    className="h-full w-full rounded-full border-2 border-purple-100 object-contain"
                />
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold">
                    {user?.name ? user.name : 'Гость'}
                </h2>
                <p className="font-medium text-gray-500">{user?.email}</p>
            </div>
            <div className="flex justify-between gap-5">
                <div className="flex h-20 w-50 flex-col items-center justify-center rounded-2xl bg-gray-50 max-md:w-30">
                    <h2 className="text-2xl font-black">{ordersLength}</h2>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                        Заказов
                    </p>
                </div>
                <div className="flex h-20 w-50 flex-col items-center justify-center rounded-2xl bg-gray-50 max-md:w-30">
                    <h2 className="text-2xl font-black">{favoriteLength}</h2>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                        Избранных
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => openModal('Settings')}
                    className="group flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl p-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                    <div className="flex items-center gap-4">
                        <IoSettingsOutline className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                        <p>Настройки профиля</p>
                    </div>
                    <LuChevronRight className="h-4 w-4 text-gray-300" />
                </button>
                {user?.role == 'ADMIN' && (
                    <button
                        onClick={() => setAdmin(!isAdmin)}
                        className="group flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl p-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                        <div className="flex items-center gap-4">
                            <LuShield className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                            <p className="max-md:text-left">
                                Режим администратора
                            </p>
                        </div>
                        <LuChevronRight className="h-4 w-4 text-gray-300" />
                    </button>
                )}
                <button
                    onClick={() => handleLogout(router)}
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
