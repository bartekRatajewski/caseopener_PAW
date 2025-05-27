import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../api/api';

interface User {
    id: string;
    username: string;
    balance: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (newToken: string) => {
        try {
            console.log('📦 Sending token to profile endpoint:', newToken);
            localStorage.setItem('token', newToken);
            setToken(newToken);

            const userData = await getUserProfile(newToken);
            console.log('🎯 Logged in user profile:', userData);
            setUser(userData);
        } catch (err) {
            console.error('🔴 Error during login profile fetch:', err);
            logout();
            throw err; // Rzuć błąd dalej, żeby komponent Login mógł go obsłużyć
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateBalance = (newBalance: number) => {
        setUser(prev => prev ? { ...prev, balance: newBalance } : null);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                try {
                    setToken(savedToken);
                    const userData = await getUserProfile(savedToken);
                    console.log('🎯 Auto-loaded user profile:', userData);
                    setUser(userData);
                } catch (err) {
                    console.error('🔴 Error fetching profile on load:', err);
                    logout();
                }
            }
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};