class LocalStorageActions {
    getAuthToken(): string {
        return localStorage.getItem('Authorization') || ''
    }
    setAuthToken(token: string) {
        localStorage.setItem('Authorization', token)
    }
    removeAuthToken() {
        localStorage.removeItem('Authorization')
    }
}

export default new LocalStorageActions()