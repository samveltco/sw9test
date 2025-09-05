import axios from 'axios'

class AuthService {
    private readonly STORAGE_KEY = 'jwtToken';

    // async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string; user?: User }> {
    //     try {
    //         const existingUsers = this.getUsers();
    //         const userExists = existingUsers.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
            
    //         if (userExists) {
    //             return { success: false, message: 'User with this email already exists' };
    //         }

    //         const newUser: User = {
    //             ...userData,
    //             id: this.generateId(),
    //             createdAt: new Date().toISOString()
    //         };

    //         const updatedUsers = [...existingUsers, newUser];
    //         this.saveUsers(updatedUsers);

    //         const token = this.generateToken();
    //         const authData: AuthData = { user: newUser, token };
    //         this.saveAuthData(authData);

    //         return { success: true, message: 'Registration successful', user: newUser };
    //     } catch (error) {
    //         return { success: false, message: 'Registration failed' };
    //     }
    // }

    async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await axios.post(`/api/auth/login`, { email, password });
            const data = response.data;

            if (!data.success || !data.token || !data.message) {
                return { success: false, message: 'Invalid server response' };
            }


            localStorage.setItem(this.STORAGE_KEY, data.token);

            return { success: true, message: 'Login successful' };
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            return { success: false, message };
        }
    }
    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.STORAGE_KEY);
    }

}

export const authService = new AuthService();