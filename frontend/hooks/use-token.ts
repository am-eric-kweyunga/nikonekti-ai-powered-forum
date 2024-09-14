"use client";
import { useState, useCallback, useEffect } from 'react';

function useToken() {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    const getToken = useCallback(() => {
        try {
            const userToken = localStorage.getItem('nikSession');
            return userToken ? userToken : null;
        } catch (error) {
            console.error("Error fetching token:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const userToken = getToken();
        setToken(userToken);
    }, [getToken]);

    const saveToken = useCallback((userToken: string) => {
        try {
            localStorage.setItem('nikSession', userToken);
            setToken(userToken);
        } catch (error) {
            console.error("Error saving token:", error);
        }
    }, []);

    const removeToken = useCallback(() => {
        try {
            localStorage.removeItem('nikSession');
            setToken(null);
        } catch (error) {
            console.error("Error removing token:", error);
        }
    }, []);

    return {
        token,
        setToken: saveToken,
        removeToken,
        isLoading,
    };
}

export default useToken;
