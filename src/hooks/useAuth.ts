import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import {loginUser, logoutUser} from "../store/actions/authActions";
import {useDispatch} from "react-redux";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

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
            const result = await dispatch<any>(loginUser({ email, password }, window.history));
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
        dispatch<any>(logoutUser());
        setIsAuthenticated(false)
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth
    };
}; 