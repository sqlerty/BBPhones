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
    cartLength: number;
}

interface ILikesStore{
    activeTab: string;
    setActiveTab: (word:string) => void;
    favoritePhones: ProductWithCategory[] ;
    setFavoritePhones: (phone:ProductWithCategory) => void;

}

type IBBPStore = ICatalogStore & ICartStore & ILikesStore;

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
    cartLength: 0 ,
    setCartPhones: (phone) => {
        const {phones} = get();
        const filtPhones = phones.filter((p) => phone.id == p.id);
        set((state) => ({cartPhones: [...state.cartPhones,...filtPhones]}))
        const {cartPhones} = get();
        set({cartLength: cartPhones.length})
    },
    deleteCartPhones: () => {
        set({cartPhones: []});
    },
    deletePhone: (phone) => {
        const {cartPhones} = get();
        const filtPhones = cartPhones.filter((p) => phone.id !== p.id);
        const {cartLength} = get();
        set({cartPhones: filtPhones,cartLength:cartLength-1})
        
    }
}));

const LikeStoreSlice: StateCreator<IBBPStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],ILikesStore> = ((set,get) => ({
    activeTab: "",
    favoritePhones: [],
    setActiveTab: (word) =>{
        if(word == "orders"){
            set({activeTab: "orders"});
        }
        if(word == "favorites"){
            set({activeTab: "favorites"});
        }
    },
    setFavoritePhones:(phone) => {
        const {favoritePhones} = get();
        if(favoritePhones.includes(phone)){
            set({favoritePhones: favoritePhones.filter((p) => p.id !== phone.id) })
        }else{
            set((state) => ({favoritePhones: [...state.favoritePhones,phone]}))
        }
    },
    
}));

export const usePhoneStore = create<IBBPStore>()(
        devtools(
            persist(
                (...a) => ({
                    ...CatalogStoreSlice(...a),
                    ...CartStoreSlice(...a),
                    ...LikeStoreSlice(...a),
                    
                }), {
                name: "bbshop-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({phones: state.phones,cartPhones: state.cartPhones,favoritePhones:state.favoritePhones})
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
export const useCartLength = () => usePhoneStore((state) => state.cartLength);

//Страница товра
export const useInfoPhone = () => usePhoneStore((state) => state.infoPhone);
export const useSetInfoPhone = () => usePhoneStore((state) => state.setInfoPhone);

//Понравившиеся
export const useActiveTab = () => usePhoneStore((state) => state.activeTab);
export const useSetActiveTab = () => usePhoneStore((state) => state.setActiveTab);
export const useFavoritePhones = () => usePhoneStore((state) => state.favoritePhones);
export const useSetFavoritePhones = () => usePhoneStore((state) => state.setFavoritePhones);
