// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../api/api';

interface AuthContextType {
    token: string | null;
    user: any;
    login: (token: string, user: any) => void; // ← Zmienione
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (token) {
            getUserProfile(token)
                .then(setUser)
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token');
                });
        }
    }, [token]);

    const login = (token: string, user: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    };


    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
