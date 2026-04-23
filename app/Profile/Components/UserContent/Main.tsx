'use client';
import { LuPackage, LuHeart } from 'react-icons/lu';
import { useActiveTab, useSetActiveTab } from '@/app/stores/profileStore';
import { motion } from 'motion/react';
import UserFavorites from './UserFavorites/UserFavorites';

export default function UserContent() {
    const activeTab = useActiveTab();
    const setActiveTab = useSetActiveTab();

    return (
        <div className="flex h-auto w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="flex border-b border-gray-100 px-2 pt-2 sm:px-6">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 px-4 py-5 font-bold transition-colors sm:flex-none sm:px-8 ${
                        activeTab === 'orders'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    <LuPackage className="h-5 w-5" />
                    <span className="hidden sm:inline">История заказов</span>
                    <span className="sm:hidden">Заказы</span>
                    {activeTab === 'orders' && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 px-4 py-5 font-bold transition-colors sm:flex-none sm:px-8 ${
                        activeTab === 'favorites'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    <LuHeart className="h-5 w-5" />
                    Избранное
                    {activeTab === 'favorites' && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                        />
                    )}
                </button>
            </div>
            {activeTab == 'favorites' && <UserFavorites />}
        </div>
    );
}
