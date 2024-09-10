import React from 'react';
import SessionProvider from '../../lib/provider';
import { Toaster } from "@/components/ui/toaster"

export default function SessionLayout({ children }: { children: React.ReactNode }) {

    return (
        <SessionProvider>
            {children}
            <Toaster />
        </SessionProvider>
    )
}
