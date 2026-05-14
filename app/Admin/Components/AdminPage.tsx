'use client';
import { useAdminActions, useAdminTab } from '@/app/stores/adminStore';
import { motion } from 'motion/react';
import { useActiveModal } from '@/app/stores/modalStore';
import Management from './Mangement/Management';
import Stats from './Stats/Stats';
import AdminModal from '@/app/modals/AdminModal/AdminModal';
export default function AdminPage() {
    const { setAdminTab } = useAdminActions();
    const adminTab = useAdminTab();
    const activeModal = useActiveModal();
    return (
        <div className="mx-auto max-w-7xl px-5 py-10">
            <h1 className="mb-10 text-2xl font-bold">Панель администратора</h1>
            <div className="flex border-b border-gray-100 pt-2">
                <button
                    onClick={() => setAdminTab('Analytics')}
                    className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 px-4 py-5 font-bold transition-colors sm:flex-none sm:px-8 ${
                        adminTab === 'Analytics'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    <span className="sm:inline">Аналитика</span>
                    {adminTab === 'Analytics' && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                        />
                    )}
                </button>
                <button
                    onClick={() => setAdminTab('Management')}
                    className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 px-4 py-5 font-bold transition-colors sm:flex-none sm:px-8 ${
                        adminTab === 'Management'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    Управление
                    {adminTab === 'Management' && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                        />
                    )}
                </button>
            </div>
            {adminTab === 'Management' && <Management />}
            {adminTab === 'Analytics' && <Stats />}
            {activeModal === 'Admin' && <AdminModal />}
        </div>
    );
}
