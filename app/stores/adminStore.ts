import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { Products, Categories, Users, Orders } from '@prisma/client';
import axios, { AxiosError } from 'axios';

type EntityData = Products | Categories | Users | Orders;

interface ApiError {
    error: string;
}

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

interface IDistributionBySegments {
    name: string;
    value: number;
}
interface ISegmentChartData {
    name: string;
    sales: number;
}
interface ISalesByDay {
    name: string;
    value: number;
}
interface ITopModel {
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
    salesByDay: ISalesByDay[];
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
        set({ isLoadingManage: true, currentEntity: entity, data: [] });
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
        const { currentEntity } = get();
        set({ isLoadingManage: true });
        try {
            const { data: newItem } = await axios.post<EntityData>(
                `/api/admin/${currentEntity}`,
                payload
            );
            set((state) => ({
                data: [newItem, ...state.data],
                isLoading: false,
            }));
            return true;
        } catch (err: unknown) {
            set({ isLoadingManage: false });
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiError>;
                alert(
                    serverError.response?.data?.error || 'Ошибка при создании'
                );
            }
            return false;
        }
    },
    updateItem: async (id, payload) => {
        const { currentEntity } = get();
        set({ isLoadingManage: true });
        try {
            const { data: updatedItem } = await axios.put<EntityData>(
                `/api/admin/${currentEntity}`,
                { id, ...payload }
            );
            set((state) => ({
                data: state.data.map((item) =>
                    item.id === id ? updatedItem : item
                ),
                isLoading: false,
            }));
            return true;
        } catch (err: unknown) {
            set({ isLoadingManage: false });
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiError>;
                alert(
                    serverError.response?.data?.error || 'Ошибка при обновлении'
                );
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
