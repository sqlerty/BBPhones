import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { Products, Categories, Users, Orders } from '@prisma/client';
import axios from 'axios';

type EntityData = Products | Categories | Users | Orders;

interface IAdmin {
    adminTab: string;
    setAdminTab: (tab: string) => void;

    data: EntityData[];
    isLoadingManage: boolean;
    currentEntity: string;
    setEntity: (word: string) => void;

    fetchData: (entity: string) => Promise<void>;
    createItem: (payload: Record<string, unknown>) => Promise<boolean>;
    updateItem: (
        id: string,
        payload: Record<string, unknown>
    ) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
}

export interface IDistributionBySegments {
    name: string;
    value: number;
}
export interface ISegmentChartData {
    name: string;
    sales: number;
}

export interface ITopModel {
    name: string;
    value: number;
}

export interface IAdminStats {
    stats: {
        totalRevenue: number;
        totalOrders: number;
        productsCount: number;
        avgCheck: number;
    };
    salesByBrands: ISegmentChartData[];
    distributionBySegments: IDistributionBySegments[];
    topSellingModels: ITopModel[];
}

interface IAdminStatsStore {
    stats: IAdminStats | null;
    isLoadingStats: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

type IAdminStore = IAdmin & IAdminStatsStore;

const adminManageSlice: StateCreator<
    IAdminStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IAdmin
> = (set, get) => ({
    data: [],
    isLoadingManage: false,
    currentEntity: '',
    adminTab: '',
    setAdminTab: (tab) => {
        set({ adminTab: tab });
    },
    setEntity: (word) => {
        set({ currentEntity: word });
    },
    fetchData: async (entity) => {
        set({ isLoadingManage: true, currentEntity: entity });

        try {
            const { data } = await axios.get<EntityData[]>(
                `/api/admin/${entity}`
            );
            set({ data, isLoadingManage: false });
        } catch (err: unknown) {
            console.error('Fetch error:', err);
            set({ isLoadingManage: false });
        }
    },
    createItem: async (payload) => {
        const { currentEntity, fetchData } = get();
        set({ isLoadingManage: true });
        try {
            await axios.post(`/api/admin/${currentEntity}`, payload);
            await fetchData(currentEntity);
            return true;
        } catch (err: unknown) {
            set({ isLoadingManage: false });
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.error || 'Ошибка при создании');
            }
            return false;
        }
    },
    updateItem: async (id, payload) => {
        const { currentEntity, fetchData } = get();
        set({ isLoadingManage: true });
        try {
            await axios.put(`/api/admin/${currentEntity}`, { id, ...payload });
            await fetchData(currentEntity);
            return true;
        } catch (err: unknown) {
            set({ isLoadingManage: false });
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.error || 'Ошибка при обновлении');
            }
            return false;
        }
    },
    deleteItem: async (id) => {
        const { currentEntity, data } = get();
        if (!confirm('Вы уверены, что хотите удалить эту запись?')) return;
        try {
            await axios.delete(`/api/admin/${currentEntity}?id=${id}`);
            set({ data: data.filter((item) => item.id !== id) });
        } catch {
            alert('Не удалось удалить объект');
        }
    },
});

const adminStatsSlice: StateCreator<
    IAdminStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IAdminStatsStore
> = (set) => ({
    stats: null,
    isLoadingStats: false,
    error: null,
    fetchStats: async () => {
        set({ isLoadingStats: true, error: null });
        try {
            const { data } = await axios.get<IAdminStats>('/api/admin/stats');
            set({ stats: data, isLoadingStats: false });
        } catch (err: unknown) {
            let message = 'Не удалось загрузить статистику';
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error || message;
            }
            set({ error: message, isLoadingStats: false });
        }
    },
});

const useAdminStore = create<IAdminStore>()(
    devtools(
        persist(
            (...a) => ({
                ...adminManageSlice(...a),
                ...adminStatsSlice(...a),
            }),
            {
                name: 'admin-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    adminTab: state.adminTab,
                    data: state.data,
                    currentEntity: state.currentEntity,
                    stats: state.stats,
                }),
            }
        )
    )
);

export const useAdminTab = () => useAdminStore((state) => state.adminTab);
export const useData = () => useAdminStore((state) => state.data);
export const useEntity = () => useAdminStore((state) => state.currentEntity);
export const useAdminActions = () => {
    const {
        setAdminTab,
        fetchData,
        createItem,
        updateItem,
        deleteItem,
        setEntity,
    } = useAdminStore.getState();
    return {
        setAdminTab,
        fetchData,
        createItem,
        updateItem,
        deleteItem,
        setEntity,
    };
};

export const useStats = () => useAdminStore((state) => state.stats);
export const useIsStatsLoading = () =>
    useAdminStore((state) => state.isLoadingStats);
export const useStatsError = () => useAdminStore((state) => state.error);

export const useStatsActions = () => {
    const { fetchStats } = useAdminStore.getState();
    return { fetchStats };
};
