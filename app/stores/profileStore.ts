import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { isEmail } from 'validator';
import axios, { AxiosError } from 'axios';
import { PhonesWithBrand } from './catalogStore';

interface IUser {
    id: string;
    email: string | undefined;
    avatarUrl: string;
    name: string;
    role: string;
}
interface IProfile {
    handleAuth: (
        email: string,
        password: string,
        router: AppRouterInstance
    ) => Promise<void>;
    handleReg: (
        email: string,
        password: string,
        aPassword: string,
        router: AppRouterInstance
    ) => Promise<void>;
    handleLogout: (router: AppRouterInstance) => Promise<void>;
    isAdmin: boolean;
    setAdmin: (admin: boolean) => void;
    isAuth: boolean;
    goToPage: (router: AppRouterInstance, path: string) => void;
    user: IUser | null;
    updateProfile: (formData: FormData) => Promise<void>;
    initializeFromSession: () => Promise<void>;
    headBtn: boolean;
    setHeadBtn: () => void;
}

export interface IFavorite {
    phone_id: string;
}
interface ApiError {
    error: string;
}
export interface IOrder {
    id: string;
    total_price: number;
    status: string;
    created_at: string;
    items?: PhonesWithBrand[];
}

export interface IFavoriteSlice {
    favoritePhonesId: string[];
    favoritePhones: PhonesWithBrand[];
    toggleFavorite: (phone: PhonesWithBrand) => Promise<void>;
    fetchFavorites: () => Promise<void>;
    activeTab: string;
    setActiveTab: (word: string) => void;
}

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    brand?: string;
    ram: number;
    storage: number;
    slug: string;
}

export interface ICart {
    cart: ICartItem[];
    cartTotalQuantity: number;
    isCartLoading: boolean;
    fetchCart: () => Promise<void>;
    addToCart: (phone: PhonesWithBrand) => Promise<void>;
    removeFromCart: (phoneId: string) => Promise<void>;
    updateQuantity: (phoneId: string, delta: number) => Promise<void>;
    clearCart: () => Promise<void>;
    createOrder: (addres: string, phone: string) => Promise<void>;
}

export interface IOrder {
    id: string;
    totalAmount: number;
    orderStatus: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
    orderItems: {
        id: string;
        quantity: number;
        price: number;
        phone: PhonesWithBrand;
    }[];
}

interface IOrderStore {
    orders: IOrder[];
    isOrdersLoading: boolean;
    fetchOrders: () => Promise<void>;
}

type IProfileStore = IProfile & IFavoriteSlice & ICart & IOrderStore;

const ProfileAuthSlice: StateCreator<
    IProfileStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IProfile
> = (set, get) => ({
    isAuth: false,
    isAdmin: false,
    user: null,
    headBtn: false,
    setAdmin: (admin) => {
        set({ isAdmin: admin });
    },
    setHeadBtn: () => {
        set({ headBtn: true });
    },
    initializeFromSession: async () => {
        try {
            const { data } = await axios.get('/api/auth/init');
            set({ isAuth: true, user: data });
            await Promise.all([
                get().fetchFavorites(),
                get().fetchCart(),
                get().fetchOrders(),
            ]);
        } catch {
            set({ isAuth: false, user: null });
        }
    },

    handleAuth: async (email, password, router) => {
        if (!isEmail(email)) return alert('Некорректный формат почты');

        try {
            const { data } = await axios.post('/api/auth/login', {
                email,
                password,
            });
            alert(`Успех: ${data.message}`);
            set({ isAuth: true, user: data.user });
            await Promise.all([get().fetchFavorites(), get().fetchCart()]);
            router.push('/');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const serverError = err as AxiosError<ApiError>;
                alert(
                    `Ошибка: ${serverError.response?.data?.error || 'Неверные данные'}`
                );
            } else {
                alert('Ошибка при входе');
            }
        }
    },
    updateProfile: async (formData: FormData) => {
        try {
            const { data } = await axios.post('/api/profile/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            set({ user: data });
            alert('Профиль обновлен!');
        } catch {
            alert('Ошибка при сохранении');
        }
    },
    handleReg: async (email, password, aPassword, router) => {
        if (!isEmail(email)) {
            alert('Некорректный формат почты');
            return;
        }
        if (password.length <= 8) {
            alert('Пароль слишком маленький!');
            return;
        }
        if (password !== aPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        try {
            const response = await axios.post('api/auth/register', {
                email,
                password,
            });

            if (response.status === 200) {
                alert(`Успех: ${response.data.message}`);
                await get().handleAuth(email, password, router);
            } else {
                alert(`Ошибка: ${response.data.message}`);
                return;
            }
        } catch {
            alert('Произошла неизвестная ошибка');
        }
    },
    handleLogout: async (router) => {
        try {
            await axios.post('/api/auth/logout');
            set({ user: null, isAuth: false, cart: [], favoritePhones: [] });
            router.push('/');
        } catch {
            alert(`Произошла неизвестная ошибка!`);
        }
    },

    goToPage: (router, path) => {
        router.push(path);
    },
});

const FavoriteSlice: StateCreator<
    IProfileStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IFavoriteSlice
> = (set, get) => ({
    favoritePhones: [],
    favoritePhonesId: [],
    activeTab: '',
    fetchFavorites: async () => {
        try {
            const { data } = await axios.get('/api/favorites');
            const phones = data as PhonesWithBrand[];
            set({
                favoritePhones: phones,
                favoritePhonesId: phones.map((p) => p.id),
            });
        } catch {
            console.error('Ошибка загрузки избранного');
        }
    },

    toggleFavorite: async (phone) => {
        const { isAuth, favoritePhonesId, favoritePhones } = get();
        if (!isAuth) return alert('Войдите в аккаунт');
        const isFav = favoritePhonesId.includes(phone.id);
        const nextIds = isFav
            ? favoritePhonesId.filter((id) => id !== phone.id)
            : [...favoritePhonesId, phone.id];
        const nextPhones = isFav
            ? favoritePhones.filter((p) => p.id !== phone.id)
            : [...favoritePhones, phone];
        set({ favoritePhonesId: nextIds, favoritePhones: nextPhones });
        try {
            await axios.post('/api/favorites', { phoneId: phone.id });
        } catch {
            set({ favoritePhonesId, favoritePhones });
            alert('Ошибка при сохранении');
        }
    },
    setActiveTab: (word) => {
        set({ activeTab: word });
    },
});

const CartSlice: StateCreator<
    IProfileStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    ICart
> = (set, get) => ({
    cart: [],
    cartTotalQuantity: 0,
    isCartLoading: true,
    fetchCart: async () => {
        const { isAuth } = get();
        if (!isAuth) return;

        try {
            const { data } = await axios.get('/api/cart');
            set({ cart: data });
        } catch {
            alert('Ошибка загрузки корзины');
        }
    },

    addToCart: async (phone) => {
        const { cart, isAuth } = get();
        if (!isAuth) return alert('Войдите в аккаунт');
        const existing = cart.find((i) => i.id === phone.id);

        const newCart = existing
            ? cart.map((i) =>
                  i.id === phone.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [
                  ...cart,
                  {
                      id: phone.id,
                      name: phone.name,
                      price: Number(phone.price),
                      image: phone.images[0],
                      slug: phone.slug,
                      ram: phone.ram,
                      storage: phone.storage,
                      quantity: 1,
                  },
              ];

        set({ cart: newCart });

        if (isAuth) {
            try {
                const nextQty = existing ? existing.quantity + 1 : 1;
                await axios.post('/api/cart', {
                    phoneId: phone.id,
                    quantity: nextQty,
                });
            } catch {
                console.error('Ошибка синхронизации корзины');
            }
        }
    },

    updateQuantity: async (id, delta) => {
        const { cart, isAuth } = get();
        const item = cart.find((i) => i.id === id);
        if (!item) return;

        const newQty = Math.max(1, item.quantity + delta);
        const newCart = cart.map((i) =>
            i.id === id ? { ...i, quantity: newQty } : i
        );

        set({ cart: newCart });

        if (isAuth) {
            try {
                await axios.post('/api/cart', {
                    phoneId: id,
                    quantity: newQty,
                });
            } catch {
                console.error('Ошибка обновления количества');
            }
        }
    },

    removeFromCart: async (id) => {
        const { cart, isAuth } = get();
        set({ cart: cart.filter((i) => i.id !== id) });

        if (isAuth) {
            try {
                await axios.delete(`/api/cart?productId=${id}`);
            } catch {
                console.error('Ошибка удаления');
            }
        }
    },

    clearCart: async () => {
        const { isAuth } = get();
        set({ cart: [] });

        if (isAuth) {
            try {
                await axios.delete('/api/cart');
            } catch {
                console.error('Ошибка очистки');
            }
        }
    },
    createOrder: async (address, phone) => {
        try {
            const { data } = await axios.post('/api/orders', {
                address,
                phone,
            });

            if (data.confirmationUrl) {
                window.location.href = data.confirmationUrl;
            }
            await get().clearCart();
        } catch {
            alert('Не удалось провести платеж!');
        }
    },
});

const OrderSlice: StateCreator<
    IProfileStore,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    IOrderStore
> = (set) => ({
    orders: [],
    isOrdersLoading: false,
    fetchOrders: async () => {
        set({ isOrdersLoading: true });
        try {
            const { data } = await axios.get(`/api/orders/history`);
            set({ orders: data, isOrdersLoading: false });
        } catch {
            alert('Ошибка загрузки отзывов!');
            set({ isOrdersLoading: false });
        }
    },
});

export const useProfileStore = create<IProfileStore>()(
    devtools(
        persist(
            (...a) => ({
                ...ProfileAuthSlice(...a),
                ...FavoriteSlice(...a),
                ...CartSlice(...a),
                ...OrderSlice(...a),
            }),
            {
                name: 'profile-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    isAuth: state.isAuth,
                    user: state.user,
                    favoritePhones: state.favoritePhones,
                    favoritePhonesId: state.favoritePhonesId,
                    cart: state.cart,
                    orders: state.orders,
                    activeTab: state.activeTab,
                    isAdmin: state.isAdmin,
                }),
            }
        )
    )
);

export const useAuth = () => useProfileStore((state) => state.isAuth);

export const useSetPage = () => useProfileStore((state) => state.goToPage);

export const useUser = () => useProfileStore((state) => state.user);

export const useInitSession = () =>
    useProfileStore((state) => state.initializeFromSession);

export const useHeadBtn = () => useProfileStore((state) => state.headBtn);
export const useSetHeadBtn = () => useProfileStore((state) => state.setHeadBtn);

export const useActiveTab = () => useProfileStore((state) => state.activeTab);

export const useFavoritePhones = () =>
    useProfileStore((state) => state.favoritePhones);
export const useFavoritePhonesId = () =>
    useProfileStore((state) => state.favoritePhonesId);
export const useFavoriteLength = () =>
    useProfileStore((state) => state.favoritePhonesId.length);

export const useCart = () => useProfileStore((state) => state.cart);
export const useCartAmount = () =>
    useProfileStore((state) =>
        state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

export const useCartCount = () =>
    useProfileStore((state) =>
        state.cart.reduce((total, p) => total + p.quantity, 0)
    );

export const useOrders = () => useProfileStore((state) => state.orders);
export const useOrdersLength = () =>
    useProfileStore((state) => state.orders.length);
export const useOrdersLoading = () =>
    useProfileStore((state) => state.isOrdersLoading);

export const useOrderActions = () => {
    const { fetchOrders } = useProfileStore.getState();
    return { fetchOrders };
};

export const useIsAdmin = () => useProfileStore((state) => state.isAdmin);

export const useAuthActions = () => {
    const { handleAuth, handleReg, handleLogout, updateProfile, setAdmin } =
        useProfileStore.getState();
    return { handleAuth, handleReg, handleLogout, updateProfile, setAdmin };
};

export const useCartActions = () => {
    const {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        createOrder,
    } = useProfileStore.getState();
    return {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        createOrder,
    };
};

export const useFavoriteActions = () => {
    const { toggleFavorite, fetchFavorites, setActiveTab } =
        useProfileStore.getState();
    return { toggleFavorite, fetchFavorites, setActiveTab };
};
