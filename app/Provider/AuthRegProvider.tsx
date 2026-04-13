'use client';

import { useEffect } from 'react';
import { supabaseBrowser } from '@/BackendClient/supabaseForClient';
import { useSetUser, useInitSession } from '@/app/stores/AuthoRegStore';

export const AuthRegProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const setUser = useSetUser();
    const initSession = useInitSession();

    useEffect(() => {
        initSession();
        const {
            data: { subscription },
        } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, [initSession, setUser]);

    return <>{children}</>;
};
