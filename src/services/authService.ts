export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    streetAddress: string;
    suite: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    userType: 'client' | 'contractor';
    password: string;
    createdAt: string;
}

export interface AuthData {
    user: User;
    token: string;
}

class AuthService {
    private readonly STORAGE_KEY = 'vaylant_auth';
    private readonly USERS_KEY = 'vaylant_users';

    async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string; user?: User }> {
        try {
            const existingUsers = this.getUsers();
            const userExists = existingUsers.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
            
            if (userExists) {
                return { success: false, message: 'User with this email already exists' };
            }

            const newUser: User = {
                ...userData,
                id: this.generateId(),
                createdAt: new Date().toISOString()
            };

            const updatedUsers = [...existingUsers, newUser];
            this.saveUsers(updatedUsers);

            const token = this.generateToken();
            const authData: AuthData = { user: newUser, token };
            this.saveAuthData(authData);

            return { success: true, message: 'Registration successful', user: newUser };
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
        try {
            const users = this.getUsers();
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (!user) {
                return { success: false, message: 'User not found' };
            }

            if (user.password !== password) {
                return { success: false, message: 'Invalid password' };
            }

            const token = this.generateToken();
            const authData: AuthData = { user, token };
            this.saveAuthData(authData);

            return { success: true, message: 'Login successful', user };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    }

    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    isAuthenticated(): boolean {
        const authData = this.getAuthData();
        return !!(authData && authData.token && authData.user);
    }

    getCurrentUser(): User | null {
        const authData = this.getAuthData();
        return authData?.user || null;
    }

    getToken(): string | null {
        const authData = this.getAuthData();
        return authData?.token || null;
    }

    updateUser(updatedData: Partial<User>): boolean {
        try {
            const authData = this.getAuthData();
            if (!authData) return false;

            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.id === authData.user.id);
            
            if (userIndex === -1) return false;

            users[userIndex] = { ...users[userIndex], ...updatedData };
            this.saveUsers(users);

            const updatedUser = users[userIndex];
            const updatedAuthData: AuthData = { ...authData, user: updatedUser };
            this.saveAuthData(updatedAuthData);

            return true;
        } catch (error) {
            return false;
        }
    }

    private getUsers(): User[] {
        try {
            const usersData = localStorage.getItem(this.USERS_KEY);
            return usersData ? JSON.parse(usersData) : [];
        } catch {
            return [];
        }
    }

    private saveUsers(users: User[]): void {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Failed to save users:', error);
        }
    }

    private getAuthData(): AuthData | null {
        try {
            const authData = localStorage.getItem(this.STORAGE_KEY);
            return authData ? JSON.parse(authData) : null;
        } catch {
            return null;
        }
    }

    private saveAuthData(authData: AuthData): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
        } catch (error) {
            console.error('Failed to save auth data:', error);
        }
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private generateToken(): string {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2);
    }
}

export const authService = new AuthService(); 