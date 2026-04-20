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

interface ICartStore{
    cartPhones: ProductWithCategory[];
    setCartPhones: (phone:ProductWithCategory) => void;
    deleteCartPhones: () => void;
    deletePhone:(phone:ProductWithCategory) => void;
}

type IBBPStore = ICatalogStore & ICartStore;

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

const CartStoreSlice: StateCreator<IBBPStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],ICartStore> = ((set,get) => ({
    cartPhones: [],
    setCartPhones: (phone) => {
        const {phones} = get();
        const filtPhones = phones.filter((p) => phone.id == p.id);
        set((state) => ({cartPhones: [...state.cartPhones,...filtPhones]}))
    },
    deleteCartPhones: () => {
        set({cartPhones: []});
    },
    deletePhone: (phone) => {
        const {cartPhones} = get();
        const filtPhones = cartPhones.filter((p) => phone.id !== p.id);
        set({cartPhones: filtPhones})
    }
}));

export const usePhoneStore = create<IBBPStore>()(
        devtools(
            persist(
                (...a) => ({
                    ...CatalogStoreSlice(...a),
                    ...CartStoreSlice(...a),
                }), {
                name: "bbshop-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({phones: state.phones,cartPhones: state.cartPhones})
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

//Корзина
export const useCart = () => usePhoneStore((state) => state.cartPhones);
export const useSetCart = () => usePhoneStore((state) => state.setCartPhones);
export const useDelCart = () => usePhoneStore((state) => state.deleteCartPhones);
export const useDeletePhone = () => usePhoneStore((state) => state.deletePhone);

export const useInfoPhone = () => usePhoneStore((state) => state.infoPhone);
export const useSetInfoPhone = () => usePhoneStore((state) => state.setInfoPhone);