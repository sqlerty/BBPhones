'use client';
import { useRouter } from 'next/navigation';
import {
    setAuth,
    useSetEmail,
    useSetPassword,
    useEmail,
    usePassword,
    useSetPage,
} from '@/app/stores/AuthoRegStore';
export default function Auth() {
    const router = useRouter();
    const goToPage = useSetPage();
    const setEmail = useSetEmail();
    const setPassword = useSetPassword();
    const email = useEmail();
    const password = usePassword();
    const submitAuth = (e: React.SubmitEvent) => {
        e.preventDefault();
        setAuth(email, password, router);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <form
                onSubmit={submitAuth}
                className="mx-auto flex h-90 w-md flex-col gap-10 rounded-2xl bg-purple-800 p-5 text-white"
            >
                <h1 className="text-center text-2xl">Авторизация</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="h-10 w-full rounded bg-white p-5 text-purple-800 focus:outline-0"
                            placeholder="you@example.com"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="h-10 w-full rounded bg-white p-5 text-purple-800 focus:outline-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="h-10 w-30 cursor-pointer rounded-2xl bg-white text-center text-purple-800 transition-all duration-200 ease-in-out hover:border hover:border-white hover:bg-purple-700 hover:text-white"
                    >
                        Войти
                    </button>
                    <button
                        type="button"
                        onClick={() => goToPage(router, '/Registration')}
                        className="h-10 w-30 cursor-pointer rounded-2xl bg-white text-center text-purple-800 transition-all duration-200 ease-in-out hover:border hover:border-white hover:bg-purple-700 hover:text-white"
                    >
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
}
