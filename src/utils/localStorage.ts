class LocalStorageActions {
    getAuthToken(): string {
        return localStorage.getItem('Authorization') || ''
    }
    setAuthToken(token: string) {
        localStorage.setItem('Authorization', token)
    }
}

export default new LocalStorageActions()