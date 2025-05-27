import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../api/api';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (newToken: string) => {
        console.log('📦 Sending token to profile endpoint:', newToken);

        localStorage.setItem('token', newToken);
        setToken(newToken);
        getUserProfile(newToken)
            .then((data) => {
                console.log('🎯 Logged in user profile:', data);
                setUser(data);
            })
            .catch((err) => {
                console.error('🔴 Error during login profile fetch:', err);
                setUser(null);
            });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            getUserProfile(savedToken)
                .then((data) => {
                    console.log('🎯 Auto-loaded user profile:', data);
                    setUser(data);
                })
                .catch((err) => {
                    console.error('🔴 Error fetching profile on load:', err);
                    logout();
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
