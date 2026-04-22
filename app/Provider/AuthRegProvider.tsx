'use client';

import { useEffect } from 'react';
import { supabaseBrowser } from '@/BackendClient/supabaseForClient';
import {
    useSetUser,
    useInitSession,
    useFetchUserData,
} from '@/app/stores/profileStore';

export const AuthRegProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const setUser = useSetUser();
    const initSession = useInitSession();
    const fetchUserData = useFetchUserData();

    useEffect(() => {
        initSession();
        const {
            data: { subscription },
        } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user);
                await fetchUserData();
            } else {
                setUser(null);
            }
        });
        return () => subscription.unsubscribe();
    }, [initSession, setUser, fetchUserData]);

    return <>{children}</>;
};
