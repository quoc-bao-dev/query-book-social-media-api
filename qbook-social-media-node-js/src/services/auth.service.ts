class AuthService {
    async login(email: string, password: string) {
        return {
            token: 'token',
        };
    }
}

export default new AuthService();
