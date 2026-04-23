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

export interface IFavoriteSlice{
    favoritePhonesId: string[]; 
    favoritePhones: ProductWithCategory[]; 
    toggleFavorite: (phone: ProductWithCategory) => Promise<void>;
    fetchFavorites: () => Promise<void>;
    activeTab: string;
    setActiveTab: (word:string) => void;
}

export interface ICartItem {
    id: string;       
    name: string;      
    price: number;     
    image: string;    
    quantity: number;  
    category?: string; 
    ram: number;
    storage:number;
}

export interface ICart {
    cart: ICartItem[];
    cartTotalQuantity: number; 
    isCartLoading: boolean;
    fetchCart: () => Promise<void>; 
    addToCart: (phone: ProductWithCategory ) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, delta: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

type IProfileStore = IProfile & IFavoriteSlice & ICart ;

const serializeUser = (user: User): IUser => ({
  id: user.id,
  email: user.email,
})


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
            await get().fetchFavorites;
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
                await get().fetchCart();
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
type FavoriteRow = {
    products: ProductWithCategory | null;
};

const FavoriteSlice: StateCreator<IProfileStore,[["zustand/devtools",never],["zustand/persist",unknown]],[],IFavoriteSlice> = ((set,get) => ({
   favoritePhones: [],
   favoritePhonesId:[],
activeTab: "",
   fetchFavorites: async () => {
        const userId = get().user?.id;
        if (!userId) return;

        const { data, error } = await supabaseBrowser.from('favorites').select('products(*)').eq('user_id', userId);

        if (error) return console.error(error);

        if (data) {
            const rows = (data as unknown) as FavoriteRow[];
            const products = rows.map(r => r.products).filter((p): p is ProductWithCategory => p !== null);

            set({ favoritePhones: products,favoritePhonesId: products.map(p => p.id) });
        }
    },

    toggleFavorite: async (phone) => {
        const userId = get().user?.id;
        if (!userId) return alert("Войдите в аккаунт");
        const { favoritePhonesId, favoritePhones } = get();
        const isFavorite = favoritePhonesId.includes(phone.id);

        const nextIds = isFavorite ? favoritePhonesId.filter(id => id !== phone.id) : [...favoritePhonesId, phone.id];
        const nextItems = isFavorite ? favoritePhones.filter(p => p.id !== phone.id) : [...favoritePhones, phone];

        set({ favoritePhonesId: nextIds, favoritePhones: nextItems });

        if (isFavorite) {
            const { error } = await supabaseBrowser.from('favorites').delete().eq('user_id', userId).eq('product_id', phone.id);
            if (error) {
                set({ favoritePhonesId, favoritePhones });
                alert("Не удалось удалить из избранного");
            }
        } else {
            const { error } = await supabaseBrowser.from('favorites').insert({ user_id: userId, product_id: phone.id });

            if (error) {
                set({ favoritePhonesId, favoritePhones });
                alert("Не удалось добавить в избранное");
            }
        }
    },
    setActiveTab: (word) =>{
        if(word == "orders"){
            set({activeTab: "orders"});
        }
        if(word == "favorites"){
            set({activeTab: "favorites"});
        }
    },
    
}));

interface ICartResponse {
    quantity: number;
    products: ProductWithCategory | null; 
}
const createCartSlice: StateCreator<IProfileStore, [["zustand/devtools", never], ["zustand/persist", unknown]], [], ICart> = (set, get) => ({
    cart: [],
    cartTotalQuantity: 0, 
    isCartLoading: true,
    fetchCart: async () => {
        const { user, isAuth } = get();
        if (!isAuth || !user) return;
        const { data, error } = await supabaseBrowser.from('cart').select(`quantity, products (*)`).eq('user_id', user.id);
        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            const rows = (data as unknown) as ICartResponse[];
            const formattedCart: ICartItem[] = rows.map((item) => {
                    if (!item.products) return null;
                    return {
                        id: item.products.id,
                        name: item.products.name,
                        price: Number(item.products.price),
                        image: item.products.images[0],
                        ram: item.products.ram,
                        storage:item.products.storage,
                        quantity: item.quantity,
                    }}).filter((item): item is ICartItem => item !== null);
          
            set({ cart: formattedCart});
           
        }
    },

    addToCart: async (phone) => {
        const { isAuth, user, cart } = get();
        const existingItem = cart.find(item => item.id === phone.id);
        
        let newCart;
        if (existingItem) {newCart = cart.map(item => item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            newCart = [...cart, { 
                id: phone.id, 
                name: phone.name, 
                price: phone.price, 
                image: phone.images[0], 
                quantity: 1 ,
                ram:phone.ram,
                storage:phone.storage
            }];
        }
        
        
        set({ cart: newCart });

        if (isAuth && user) {
            await supabaseBrowser.from('cart').upsert({user_id: user.id,product_id: phone.id,quantity: existingItem ? existingItem.quantity + 1 : 1});
        }
    },

    updateQuantity: async (id, delta) => {
        const { isAuth, user, cart } = get();
        const newCart = cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
        set({ cart: newCart });

        if (isAuth && user) {   
            const item = newCart.find(i => i.id === id);
            if (item) {
                await supabaseBrowser.from('cart').update({ quantity: item.quantity }).eq('user_id', user.id).eq('product_id', id);
                set({cartTotalQuantity: item.quantity});
            }
        }
    },

    removeFromCart: async (id) => {
        const { isAuth, user, cart } = get();
        set({ cart: cart.filter(item => item.id !== id) });
        if (isAuth && user) {
            await supabaseBrowser.from('cart').delete().eq('user_id', user.id).eq('product_id', id);
        }
    },

    clearCart: async () => {
        const { isAuth, user } = get();
        set({ cart: [] });
        if (isAuth && user) {
            await supabaseBrowser.from('cart').delete().eq('user_id', user.id);
        }
    }
});


const useProfileStore = create<IProfileStore>()(
    devtools(
        persist(
            (...a) => ({
                ...ProfileAuthSlice(...a),
                ...FavoriteSlice(...a),
                ...createCartSlice(...a),
            }),{
                name: "profile-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({isAuth : state.isAuth, user:state.user,favoritePhones: state.favoritePhones,favoritePhonesId:state.favoritePhonesId,cart: state.cart})
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

export const useActiveTab = () => useProfileStore((state) => state.activeTab);
export const useSetActiveTab= () => useProfileStore((state) => state.setActiveTab);

export const useFetchUserData = () => useProfileStore.getState().fetchFavorites();
export const useFetchFavorites = () => useProfileStore.getState().fetchFavorites();
export const useFavoritePhones = () => useProfileStore((state) => state.favoritePhones);
export const useFavoritePhonesId = () => useProfileStore((state) => state.favoritePhonesId);
export const useToggleFavorites = () => useProfileStore((state) => state.toggleFavorite);
export const useFavoriteLength = () => useProfileStore((state) => state.favoritePhonesId.length);

export const useCart = () => useProfileStore((state) => state.cart);
export const useRemoveCart = () => useProfileStore((state) => state.removeFromCart);
export const useFetchCart = () => useProfileStore.getState().fetchCart();
export const useAddToCart = () => useProfileStore((state) => state.addToCart);
export const useClearCart = () => useProfileStore((state) => state.clearCart);
export const useCartAmount = () => useProfileStore((state) => state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
export const useUpdateQuantity = () => useProfileStore((state) => state.updateQuantity);
export const useCartCount = () => useProfileStore((state) => state.cart.reduce((total, p) => total + p.quantity, 0));
