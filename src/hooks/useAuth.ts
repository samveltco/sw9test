import { useState, useEffect } from 'react';
import { authService, User } from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const authenticated = authService.isAuthenticated();
        const currentUser = authService.getCurrentUser();
        
        setIsAuthenticated(authenticated);
        setUser(currentUser);
        setIsLoading(false);
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await authService.login(email, password);
            if (result.success && result.user) {
                setUser(result.user);
                setIsAuthenticated(true);
                return { success: true, user: result.user };
            }
            return { success: false, message: result.message };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };

    const register = async (userData: Omit<User, 'id' | 'createdAt'>) => {
        try {
            const result = await authService.register(userData);
            if (result.success && result.user) {
                setUser(result.user);
                setIsAuthenticated(true);
                return { success: true, user: result.user };
            }
            return { success: false, message: result.message };
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUser = (updatedData: Partial<User>) => {
        const success = authService.updateUser(updatedData);
        if (success) {
            const updatedUser = authService.getCurrentUser();
            setUser(updatedUser);
        }
        return success;
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        checkAuth
    };
}; 