import React from 'react';
import SessionProvider from '../../lib/provider';

export default function SessionLayout({ children }: { children: React.ReactNode }) {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
