import { create,StateCreator } from 'zustand'
import axios from 'axios'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { isEmail } from 'validator';
import { User } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/BackendClient/supabaseForClient';
interface IUser {
  id: string
  email: string | undefined
}
interface IAutoReg{
    email:string;
    setEmail: (mail:string) => void;
    password: string;
    setPassword: (pass:string) => void;
    aPassword: string;
    setAPassword: (apass : string) => void;
    handleAuth: (email:string,password:string, router: AppRouterInstance) => Promise<void>;
    handleReg: (email:string,password:string,aPassword:string,router: AppRouterInstance) => Promise<void>;
    isAuth:boolean;
    goToPage: (router: AppRouterInstance, path: string) => void;
    user: IUser | null;
    setUser: (user: User | null) => void;
    initializeFromSession: () => Promise<void>;
}
const serializeUser = (user: User): IUser => ({
  id: user.id,
  email: user.email,
})

const AuthoRegStore : StateCreator<IAutoReg,[["zustand/devtools",never],["zustand/persist",unknown]]> = ((set) => ({
    email:'',
    password:'',
    aPassword:'',
    isAuth:false,
    user: null,
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
    initializeFromSession: async () => {
        try {
        const {data: { session }} = await supabaseBrowser.auth.getSession()

        if (session?.user) {
            set({user: serializeUser(session.user),isAuth: true})
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
    goToPage: (router, path) => {
        router.push(path) 
    }
    
}))

const useAuthoRegStore = create<IAutoReg>()(
    devtools(
        persist(AuthoRegStore,{
                name: "auth-storage",
                storage:createJSONStorage(()=>localStorage),
                partialize: (state) => ({isAuth : state.isAuth, user:state.user})
            })
        )
)

export const useAuth = () => useAuthoRegStore((state) => state.isAuth);

export const useEmail = () => useAuthoRegStore((state) => state.email);
export const useSetEmail = () => useAuthoRegStore((state) => state.setEmail);
export const usePassword = () => useAuthoRegStore((state) => state.password);
export const useSetPassword = () => useAuthoRegStore((state) => state.setPassword);
export const useAPassword = () => useAuthoRegStore((state) => state.aPassword);
export const useSetAPassword = () => useAuthoRegStore((state) => state.setAPassword);

export const setAuth = (email:string,password:string,router: AppRouterInstance) => useAuthoRegStore.getState().handleAuth(email,password,router);
export const setReg = (email:string,password:string,aPassword:string,router: AppRouterInstance) =>  useAuthoRegStore.getState().handleReg(email,password,aPassword,router);

export const useSetPage = () => useAuthoRegStore((state) => state.goToPage);

export const useSetUser = () => useAuthoRegStore((state) => state.setUser);
export const useUser = () => useAuthoRegStore((state) => state.user);

export const useInitSession = () => useAuthoRegStore((state) => state.initializeFromSession);