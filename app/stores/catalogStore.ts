import { create, StateCreator } from 'zustand';
import axios from 'axios';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Phones, Brands } from '@prisma/client';
import { ProductSpecs } from '@/types/database';

export type PhonesWithBrand = Omit<Phones, 'specs'> & {
    brand: Brands;
    specs: ProductSpecs;
};

interface ICatalogStore {
    phones: PhonesWithBrand[];
    loading: boolean;
    fetchPhones: () => Promise<void>;
    searchWord: string;
    searchedPhones: PhonesWithBrand[];
    setSearch: (word: string) => void;
    infoPhone: PhonesWithBrand | null;
    setInfoPhone: (phone: PhonesWithBrand) => void;
}

interface IFilter {
    filterPhones: PhonesWithBrand[];
    condition: string;
    isFilter: boolean;
    categoryFilter: string;
    brandFilter: string[];
    priceRange: [number, number];
    sort: string;
    setCondition: (word: string) => void;
    setSort: (word: string) => void;
    setBrands: (brand: string) => void;
    setCategory: (category: string) => void;
    setPriceRange: (maxRange: number) => void;
    setFilter: () => void;
    setFilterPhones: () => void;
    clearFilters: () => void;
}

type IBBPStore = ICatalogStore & IFilter;

const CatalogStoreSlice: StateCreator<
    IBBPStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    ICatalogStore
> = (set, get) => ({
    phones: [],
    loading: true,
    searchWord: '',
    searchedPhones: [],
    infoPhone: null,

    fetchPhones: async () => {
        try {
            const response = await axios.get<PhonesWithBrand[]>('api/phones');

            set({ phones: response.data, filterPhones: response.data });
        } catch (err) {
            alert(`Произошла ошибка в принятии данных!: ${err}`);
            return;
        } finally {
            set({ loading: false });
        }
    },
    setSearch: (word: string) => {
        set({ searchWord: word });
        const { phones } = get();
        let result = phones;
        if (word && word !== '') {
            result = phones.filter(
                (phone) =>
                    phone.name.toLowerCase().startsWith(word.toLowerCase()) ||
                    phone.name.toLowerCase().includes(word.toLowerCase())
            );
        }
        set({ searchedPhones: result });
    },
    setInfoPhone: (phone) => {
        const { phones } = get();
        let res;
        if (phone !== null) {
            res = phones.find((p) => p.id == phone.id);
        }
        if (!res) {
            alert('Не удалось найти телефон!');
        }
        set({ infoPhone: res! });
    },
});

const FilterSlice: StateCreator<
    IBBPStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IFilter
> = (set, get) => ({
    condition: '',
    isFilter: false,
    filterPhones: [],
    categoryFilter: 'all',
    brandFilter: [],
    priceRange: [0, 200000],

    sort: 'new',
    setCondition: (word) => {
        set({ condition: word });
        get().setFilterPhones();
    },
    setFilter: () => {
        set({ isFilter: !get().isFilter });
    },
    setBrands: (brand) => {
        set((prev) => ({
            brandFilter: prev.brandFilter.includes(brand)
                ? prev.brandFilter.filter((b) => b !== brand)
                : [...prev.brandFilter, brand],
        }));
        get().setFilterPhones();
    },
    setCategory: (category) => {
        set({ categoryFilter: category });
        get().setFilterPhones();
    },
    setPriceRange: (maxRange) => {
        set({ priceRange: [0, maxRange] });
        get().setFilterPhones();
    },
    setSort: (word) => {
        set({ sort: word });
        get().setFilterPhones();
    },
    setFilterPhones: () => {
        const {
            categoryFilter,
            brandFilter,
            priceRange,
            phones,
            sort,
            condition,
        } = get();
        set({ filterPhones: phones });
        let result = [...phones];

        if (categoryFilter !== 'all') {
            result = result.filter((phone) => {
                const price = Number(phone.price);
                if (categoryFilter === 'flagman') return price >= 40000;
                if (categoryFilter === 'middle')
                    return price < 40000 && price > 20000;
                if (categoryFilter === 'budget') return price <= 20000;
                return true;
            });
        }
        if (brandFilter.length > 0) {
            result = result.filter((phone) =>
                brandFilter.includes(phone.brand.name ?? '')
            );
        }
        if (condition) {
            switch (condition) {
                case 'new':
                    result = result.filter((res) => res.condition == 'NEW');
                    break;
                case 'used':
                    result = result.filter((res) => res.condition == 'USED');
                    break;
            }
        }
        result = result.filter((phone) => {
            const price = Number(phone.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        switch (sort) {
            case 'new':
                result = [...result].sort(
                    (a, b) => Number(a.createdAt) - Number(b.createdAt)
                );
                break;
            case 'asc':
                result = [...result].sort(
                    (a, b) => Number(a.price) - Number(b.price)
                );
                break;
            case 'desc':
                result = [...result].sort(
                    (a, b) => Number(b.price) - Number(a.price)
                );
                break;
            case 'rate':
                result = [...result].sort(
                    (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
                );
                break;
        }

        set({ filterPhones: result });
    },
    clearFilters: () => {
        set({
            categoryFilter: 'all',
            brandFilter: [],
            priceRange: [0, 150000],
        });
        get().setFilterPhones();
    },
});

export const usePhoneStore = create<IBBPStore>()(
    devtools(
        persist(
            (...a) => ({
                ...CatalogStoreSlice(...a),
                ...FilterSlice(...a),
            }),
            {
                name: 'bbshop-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    phones: state.phones,
                    filterPhones: state.filterPhones,
                    infoPhone: state.infoPhone,
                    isFilter: state.isFilter,
                }),
            }
        )
    )
);

//Телефоны
export const usePhones = () => usePhoneStore((state) => state.phones);
export const useLoading = () => usePhoneStore((state) => state.loading);

//Поиск
export const useSearchWord = () => usePhoneStore((state) => state.searchWord);
export const useSearchedPhones = () =>
    usePhoneStore((state) => state.searchedPhones);

//Страница товра
export const useInfoPhone = () => usePhoneStore((state) => state.infoPhone);

export const useIsFilter = () => usePhoneStore((state) => state.isFilter);
export const useFilterPhones = () =>
    usePhoneStore((state) => state.filterPhones);

export const useCondition = () => usePhoneStore((state) => state.condition);
export const useSelectedCategory = () =>
    usePhoneStore((state) => state.categoryFilter);
export const useSelectedBrands = () =>
    usePhoneStore((state) => state.brandFilter);
export const usePriceRange = () => usePhoneStore((state) => state.priceRange);
export const useClearFilters = () =>
    usePhoneStore((state) => state.clearFilters);

export const useSort = () => usePhoneStore((state) => state.sort);

export const useCatalogActions = () => {
    const {
        fetchPhones,
        setSearch,
        setInfoPhone,
        setFilter,
        setBrands,
        setCategory,
        setSort,
        setPriceRange,
        clearFilters,
        setCondition,
    } = usePhoneStore.getState();
    return {
        fetchPhones,
        setSearch,
        setInfoPhone,
        setFilter,
        setBrands,
        setCategory,
        setSort,
        setPriceRange,
        clearFilters,
        setCondition,
    };
};
