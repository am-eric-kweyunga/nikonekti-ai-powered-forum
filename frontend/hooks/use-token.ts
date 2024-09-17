"use client";
import { useState, useCallback, useEffect } from 'react';

function useToken() {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<any | null>(null);

    const getToken = useCallback(() => {
        try {
            const userToken = localStorage.getItem('nikSession');
            if (userToken !== undefined) {
                const verify = async () => {
                    const res = await fetch('http://127.0.0.1:5050/api/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`
                        }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.msg === "Not enough segments") {
                            return null;
                        } else {
                            return userToken ? userToken : null;;
                        }
                    }
                    return null;
                };

                // function to verify token
                return verify();
            }
            return null;
        } catch (error) {
            console.error("Error fetching token:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const userToken = getToken();
        if (userToken) {
            setToken(userToken);
        }

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
