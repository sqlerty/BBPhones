import { create,StateCreator } from 'zustand'
import axios from 'axios'
import { ProductWithCategory } from '@/types/database'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface ICatalogStore{
    phones: ProductWithCategory[];
    loading: boolean;
    fetchPhones: () => Promise<void>;
    searchWord: string;
    searchedPhones:ProductWithCategory[];
    setSearch:(word:string) => void;
    infoPhone: ProductWithCategory | null ;
    setInfoPhone: (phone:ProductWithCategory) => void;
}

interface IFilter{
    filterPhones : ProductWithCategory[];
    isFilter: boolean;
    categoryFilter: string;
    brandFilter: string[] ;
    priceRange: [number,number];
    setBrands: (brand:string ) => void;
    setCategory: (category:string) => void;
    setPriceRange: (maxRange:number) => void;
    setFilter: () => void;
    setFilterPhones: () => void;
    clearFilters: () => void;
    
}

type IBBPStore = ICatalogStore & IFilter ;

const CatalogStoreSlice: StateCreator<IBBPStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],ICatalogStore> = ((set,get) => ({
    phones: [],
    loading: true,
    searchWord:"",
    searchedPhones:[],
    infoPhone: null,
    
    
    fetchPhones: async () => {
        try{
            const response = await axios.get<ProductWithCategory[]>('api/phones');
            set({ phones: response.data });
        }catch(err){
            alert(`Произошла ошибка в принятии данных!: ${err}`);
            return;
        }finally{
            set({ loading: false });
        }
    },
    setSearch: (word:string) => {
        set({searchWord : word});
        const {phones} = get();
        let result = phones;
        if(word && word !==""){
            result = phones.filter((phone) => phone.name.toLowerCase().startsWith(word.toLowerCase()) || phone.name.toLowerCase().includes(word.toLowerCase()));
        }
        set({searchedPhones : result});

    },
    setInfoPhone: (phone) => {
        const { phones } = get();
        let res;
        if(phone !== null ){
            res = phones.find((p) => p.id == phone.id);
        }
        if(!res){
            alert("Не удалось найти телефон!")
        }
        set({infoPhone: res!});
    }

}));

const FilterSlice: StateCreator<IBBPStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],IFilter> = ((set,get) => ({
    isFilter:false,
    filterPhones: [],
    categoryFilter:"all",
    brandFilter:[],
    priceRange:[0,150000],
    setFilter: () => {
        set({isFilter: !get().isFilter});
    },
    setBrands: (brand) => {
        set((prev) => ({brandFilter: prev.brandFilter.includes(brand) ? prev.brandFilter.filter((b) => b !== brand) : [...prev.brandFilter,brand]}));
        get().setFilterPhones();
    },
    setCategory: (category) => {
        set({categoryFilter: category});
        get().setFilterPhones();
    },
    setPriceRange: (maxRange) => {
        set({priceRange: [0,maxRange]});
        get().setFilterPhones();
    },
    setFilterPhones: () => {
        const {categoryFilter,brandFilter,priceRange,phones} = get();

        let result = [...phones];

        if (categoryFilter !== "all") {
            result = result.filter((phone) => {
                const price = Number(phone.price);
                if (categoryFilter === "flagman") return price >= 40000;
                if (categoryFilter === "middle") return price < 40000 && price > 20000;
                if (categoryFilter === "budget") return price <= 20000;
                return true;
            });
        }
        if (brandFilter.length > 0) {
            result = result.filter((phone) => brandFilter.includes(phone.categories?.name ?? ""));
        }

        result = result.filter((phone) => {
            const price = Number(phone.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        set({ filterPhones: result });
    },
    clearFilters: () => {
        set({categoryFilter: "all",brandFilter: [],priceRange: [0,150000]});
        get().setFilterPhones();
    }

}));


export const usePhoneStore = create<IBBPStore>()(
        devtools(
            persist(
                (...a) => ({
                    ...CatalogStoreSlice(...a),
                    ...FilterSlice(...a),
                    
                }), {
                name: "bbshop-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({phones: state.phones,filterPhones:state.filterPhones})
            })
        )
);


//Телефоны
export const usePhones = () => usePhoneStore((state) => state.phones);
export const useLoading = () => usePhoneStore((state) => state.loading);
export const fetchPhones = () => usePhoneStore.getState().fetchPhones();

//Поиск
export const setSearchedPhones = (word:string) => usePhoneStore.getState().setSearch(word);
export const useSearchWord = () => usePhoneStore((state) => state.searchWord);
export const useSearchedPhones = () => usePhoneStore((state) => state.searchedPhones);

//Страница товра
export const useInfoPhone = () => usePhoneStore((state) => state.infoPhone);
export const useSetInfoPhone = () => usePhoneStore((state) => state.setInfoPhone);

export const useIsFilter = () => usePhoneStore((state) => state.isFilter);
export const useSetFilter = () => usePhoneStore((state) => state.setFilter);
export const useFilterPhones = () => usePhoneStore((state) => state.filterPhones);
export const useSetBrands = () => usePhoneStore((state) => state.setBrands);
export const useSetCategory = () => usePhoneStore((state) => state.setCategory);
export const useSetPriceRange = () => usePhoneStore((state) => state.setPriceRange);
export const useSelectedCategory = () => usePhoneStore((state) => state.categoryFilter);
export const useSelectedBrands = () => usePhoneStore((state) => state.brandFilter);
export const usePriceRange = () => usePhoneStore((state) => state.priceRange);
export const useClearFilters = () => usePhoneStore((state) => state.clearFilters);