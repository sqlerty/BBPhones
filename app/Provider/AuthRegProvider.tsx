'use client';

import { useEffect } from 'react';
import { useInitSession } from '@/app/stores/profileStore';

export const AuthRegProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const initializeAuth = useInitSession();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return <>{children}</>;
};
