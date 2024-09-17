"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useToken from "@/hooks/use-token";

interface TokenContextType {
    token: string | null | undefined;
    setToken: (userToken: string) => void;
    removeToken: () => void;
    isLoading: boolean;
}

// Creating the context
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// TokenProvider component
export const TokenProvider = ({ children }: { children: ReactNode }) => {
    const { token, setToken, removeToken, isLoading } = useToken();
    
    return (
        <TokenContext.Provider value={{ token, setToken, removeToken, isLoading }}>
            {children}
        </TokenContext.Provider>
    );
};

// Custom hook to use TokenContext
export const useTokenContext = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useTokenContext must be used within a TokenProvider");
    }
    return context;
};
