import { create,StateCreator } from 'zustand'
import axios from 'axios'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { isEmail } from 'validator';
import { User } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/BackendClient/supabaseForClient';
import { ProductWithCategory } from '@/types/database';



interface IUser {
  id: string
  email: string | undefined
}
interface IProfile{
    email:string;
    setEmail: (mail:string) => void;
    password: string;
    setPassword: (pass:string) => void;
    aPassword: string;
    setAPassword: (apass : string) => void;
    handleAuth: (email:string,password:string, router: AppRouterInstance) => Promise<void>;
    handleReg: (email:string,password:string,aPassword:string,router: AppRouterInstance) => Promise<void>;
    handleLogout: () => Promise<void>;
    isAuth:boolean;
    goToPage: (router: AppRouterInstance, path: string) => void;
    user: IUser | null;
    setUser: (user: User | null) => void;
    initializeFromSession: () => Promise<void>;
    headBtn:boolean;
    setHeadBtn: () => void;
}

export interface IFavorite {
    product_id: string;
}

export interface IOrder {
    id: string;
    total_price: number;
    status: string;
    created_at: string;
    items?: ProductWithCategory[];
}

export interface IUserContent{
    favoritePhonesId: string[]; 
    favoritePhones: ProductWithCategory[]; 
    orders: IOrder[];
    fetchUserData: () => Promise<void>; 
    toggleFavorite: (phone: ProductWithCategory) => Promise<void>;
    createOrder: (total: number, items: ProductWithCategory[], router: AppRouterInstance) => Promise<void>;
    fetchFavorites: () => Promise<void>;
}

type IProfileStore = IProfile & IUserContent ;

const serializeUser = (user: User): IUser => ({
  id: user.id,
  email: user.email,
})

type FavoriteResponse = {
    products: ProductWithCategory;
};

const ProfileAuthSlice : StateCreator<IProfileStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],IProfile> = ((set,get) => ({
    email:'',
    password:'',
    aPassword:'',
    isAuth:false,
    user: null,
    headBtn:false,
    setUser: (user: User | null) => {
        set({
            user: user ? serializeUser(user) : null,
            isAuth: !!user,
        })
    },
    
    setEmail : (mail) => {
        set({email: mail});
    },
    setPassword : (pass) => {
        set({password : pass});
    },
    setAPassword : (apass) => {
        set({aPassword:apass});
    },
    setHeadBtn: () => {
        set({headBtn: true});
    },
    initializeFromSession: async () => {
        try {
        const {data: { session }} = await supabaseBrowser.auth.getSession()

        if (session?.user) {
            set({user: serializeUser(session.user),isAuth: true})
            await get().fetchUserData;
        } else {
            set({ user: null, isAuth: false })
        }
        } catch (error) {
            console.error('Ошибка инициализации сессии:', error)
            set({ user: null, isAuth: false })
        }
    },
    handleAuth : async (email,password,router) => {
        if (!isEmail(email)){
            alert("Некорректный формат почты")
            return;
        }
        try {
            const {data,error} = await supabaseBrowser.auth.signInWithPassword({email,password});
            if(error){
                alert(`Ошибка: ${error.message}`);
                return;
            }
            if(data.user){
                set({isAuth: true, user:serializeUser(data.user),password:'',email:''})
                await get().fetchFavorites();
            }
            alert(`Успех: Вы вошли в систему!`);
            router.push('/');   
            router.refresh();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(`Ошибка: ${error.response.data.error}`);
            } else {
                alert('Произошла неизвестная ошибка');
            }
        }
    },
    handleReg : async (email,password,aPassword,router) => {
        if (!isEmail(email)){
            alert("Некорректный формат почты");
            return;
        }
        if(password.length <= 8 ){
            alert("Пароль слишком маленький!");
            return;
        }
        if (password !== aPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        try {
            const {data,error} = await supabaseBrowser.auth.signUp({email,password});
            if (error) {
                alert(`Ошибка: ${error.message}`);
                return;
            } 
            if(data.user){
                set({isAuth:true,user:serializeUser(data.user),password:'',aPassword:'',email:''})
                await get().fetchFavorites();
                alert(`Вы успешно зарегистрировались!`);
                router.push('/');
            }else{
                alert('Проверьте почту для подтверждения регистрации');
                router.push('/Authorization');
            }
            
        } catch {
            alert('Произошла неизвестная ошибка');
        }
    },
    handleLogout: async () => {
        try{
            const {error} = await supabaseBrowser.auth.signOut();
            if (error) {
                alert(`Ошибка: ${error.message}`);
                return;
            } 
            set({user: null,isAuth: false});

        }catch{
            alert(`Произошла неизвестная ошибка!`)
        }
    },

    goToPage: (router, path) => {
        router.push(path) 
    }
    
}))


const UserContentSlice: StateCreator<IProfileStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],IUserContent> = ((set,get) => ({
   favoritePhones: [],
   favoritePhonesId:[],
   orders: [],

   fetchUserData: async () => {
        const userId = get().user?.id;
        if(!userId) return;
        const { data: favs } = await supabaseBrowser.from('favorites').select('product_id').eq('user_id',userId);
        const { data: orders} = await supabaseBrowser.from('orders').select('*,order_items(*)').eq('user_id',userId);
        set({favoritePhonesId:favs?.map(f => f.product_id) || [],orders:orders || []});

   },
   fetchFavorites: async () => {
        const userId = get().user?.id;
        if (!userId) return;
        const { data, error } = await supabaseBrowser.from('favorites').select(`products(*)`).eq('user_id', userId).overrideTypes<FavoriteResponse[]>();
        if (error) {
            console.error(error);
            return;
        }
        if (data) {
            const fullFavs = data.map(item => item.products);
            set({ favoritePhones: fullFavs });
            
        }
   },
   toggleFavorite: async (phone) => {
        const { data: { user } } = await supabaseBrowser.auth.getUser();
        if (!user) {
            alert('Войдите, чтобы сохранять избранное');
            return;
        }

        const { favoritePhonesId, favoritePhones } = get();
        const isFavorite = favoritePhonesId.includes(phone.id);

        if (isFavorite) {
            const { error } = await supabaseBrowser.from('favorites').delete().eq('user_id', user.id).eq('product_id', phone.id);
            if (!error) {
                set({favoritePhonesId: favoritePhonesId.filter(id => id !== phone.id),favoritePhones: favoritePhones.filter(p => p.id !== phone.id)});
            }
            } else {
                const { error } = await supabaseBrowser.from('favorites').insert({ user_id: user.id, product_id: phone.id });
                if (!error) {
                    set({favoritePhonesId: [...favoritePhonesId, phone.id],favoritePhones: [...favoritePhones, phone]});
                }
            }
   },
   createOrder: async (totalmem,items,router) => {

   }
}));

const useProfileStore = create<IProfileStore>()(
    devtools(
        persist(
            (...a) => ({
                ...ProfileAuthSlice(...a),
                ...UserContentSlice(...a),
            }),{
                name: "auth-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({isAuth : state.isAuth, user:state.user,favoritePhones: state.favoritePhones,favoritePhonesId:state.favoritePhonesId})
            })
        )
)

export const useAuth = () => useProfileStore((state) => state.isAuth);

export const useEmail = () => useProfileStore((state) => state.email);
export const useSetEmail = () => useProfileStore((state) => state.setEmail);
export const usePassword = () => useProfileStore((state) => state.password);
export const useSetPassword = () => useProfileStore((state) => state.setPassword);
export const useAPassword = () => useProfileStore((state) => state.aPassword);
export const useSetAPassword = () => useProfileStore((state) => state.setAPassword);

export const setAuth = (email:string,password:string,router: AppRouterInstance) => useProfileStore.getState().handleAuth(email,password,router);
export const setReg = (email:string,password:string,aPassword:string,router: AppRouterInstance) =>  useProfileStore.getState().handleReg(email,password,aPassword,router);
export const setLogout = () => useProfileStore.getState().handleLogout();

export const useSetPage = () => useProfileStore((state) => state.goToPage);

export const useSetUser = () => useProfileStore((state) => state.setUser);
export const useUser = () => useProfileStore((state) => state.user);

export const useInitSession = () => useProfileStore((state) => state.initializeFromSession);

export const useHeadBtn = () => useProfileStore((state) => state.headBtn);
export const useSetHeadBtn = () => useProfileStore((state) => state.setHeadBtn);

export const useFetchUserData = () => useProfileStore((state) => state.fetchUserData);
export const useFetchFavorites = () => useProfileStore.getState().fetchFavorites();
export const useFavoritePhones = () => useProfileStore((state) => state.favoritePhones);
export const useFavoritePhonesId = () => useProfileStore((state) => state.favoritePhonesId);
export const useToggleFavorites = () => useProfileStore((state) => state.toggleFavorite);
export const useFavoriteLength = () => useProfileStore((state) => state.favoritePhonesId.length);