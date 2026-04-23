'use client';

import { useEffect } from 'react';
import { supabaseBrowser } from '@/BackendClient/supabaseForClient';
import {
    useSetUser,
    useInitSession,
    useFetchFavorites,
    useFetchCart,
} from '@/app/stores/profileStore';

export const AuthRegProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const setUser = useSetUser();
    const initSession = useInitSession();
    const fetchFavorites = useFetchFavorites;
    const fetchProducts = useFetchCart();
    useEffect(() => {
        initSession();
        const {
            data: { subscription },
        } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user);
                await fetchFavorites();
                await fetchProducts;
            } else {
                setUser(null);
            }
        });
        return () => subscription.unsubscribe();
    }, [initSession, setUser, fetchFavorites, fetchProducts]);

    return <>{children}</>;
};
