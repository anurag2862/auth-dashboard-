'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await authAPI.getProfile();
                setUser(response.data.data);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const response = await authAPI.login({ email, password });
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        setUser(user);
        router.push('/dashboard');
        return response.data;
    };

    const signup = async (name, email, password) => {
        const response = await authAPI.signup({ name, email, password });
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        setUser(user);
        router.push('/dashboard');
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
