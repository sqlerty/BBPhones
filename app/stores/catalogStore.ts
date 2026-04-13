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
}

const CatalogStore: StateCreator<ICatalogStore,[["zustand/devtools",never],["zustand/persist",unknown]]> = ((set,get) => ({
    phones: [],
    loading: true,
    searchWord:"",
    searchedPhones:[],
    
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

    }

}));

const useCatalogStore = create<ICatalogStore>()(
        devtools(
            persist(CatalogStore, {
                name: "phone-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({phones: state.phones})
            })
        )
);


//Телефоны
export const usePhones = () => useCatalogStore((state) => state.phones);
export const useLoading = () => useCatalogStore((state) => state.loading);
export const fetchPhones = () => useCatalogStore.getState().fetchPhones();

//Поиск
export const setSearchedPhones = (word:string) => useCatalogStore.getState().setSearch(word);
export const useSearchWord = () => useCatalogStore((state) => state.searchWord);
export const useSearchedPhones = () => useCatalogStore((state) => state.searchedPhones);
