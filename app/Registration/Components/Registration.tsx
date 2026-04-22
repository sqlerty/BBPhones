'use client';
import { useRouter } from 'next/navigation';
import {
    setReg,
    useSetEmail,
    useSetPassword,
    useEmail,
    usePassword,
    useAPassword,
    useSetAPassword,
    useSetPage,
} from '@/app/stores/profileStore';
export default function Registration() {
    const email = useEmail();
    const password = usePassword();
    const aPassword = useAPassword();

    const setEmail = useSetEmail();
    const setPassword = useSetPassword();
    const setAPassword = useSetAPassword();

    const router = useRouter();
    const goToPage = useSetPage();
    const handleReg = (e: React.SubmitEvent) => {
        e.preventDefault();
        setReg(email, password, aPassword, router);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <form
                onSubmit={handleReg}
                className="mx-auto flex h-120 w-md flex-col gap-10 rounded-2xl bg-purple-800 p-5 text-white"
            >
                <h1 className="text-center text-2xl">Регистрация</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label>Email:</label>
                        <input
                            type="e-mail"
                            className="h-10 w-full rounded bg-white p-5 text-purple-800 focus:outline-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="h-10 w-full rounded bg-white p-5 text-purple-800 focus:outline-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Повторите пароль:</label>
                        <input
                            type="password"
                            name="aPassword"
                            value={aPassword}
                            className="h-10 w-full rounded bg-white p-5 text-purple-800 focus:outline-0"
                            onChange={(e) => setAPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="h-10 w-40 cursor-pointer rounded-2xl bg-white text-center text-purple-800 transition-all duration-200 ease-in-out hover:border hover:border-white hover:bg-purple-700 hover:text-white"
                    >
                        Зарегистрироваться
                    </button>
                    <button
                        type="button"
                        onClick={() => goToPage(router, '/Authorization')}
                        className="h-10 w-40 cursor-pointer rounded-2xl bg-white text-center text-purple-800 transition-all duration-200 ease-in-out hover:border hover:border-white hover:bg-purple-700 hover:text-white"
                    >
                        Авторизация
                    </button>
                </div>
            </form>
        </div>
    );
}
