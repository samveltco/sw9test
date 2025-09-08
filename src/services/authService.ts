class AuthService {
    private readonly STORAGE_KEY = 'jwtToken';

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.STORAGE_KEY);
    }

}

export const authService = new AuthService();