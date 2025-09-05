import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const authenticated = authService.isAuthenticated();
        
        setIsAuthenticated(authenticated);
        setIsLoading(false);
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await authService.login(email, password);
            if (result.success) {
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: result.message };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };

    
    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth
    };
}; 