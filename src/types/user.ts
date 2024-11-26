export interface IUser {
    id: number | null,
    email: string,
    name: string,
    active: boolean | null,
    lastSignInAt?: string,
    currentSignInAt?: string,
}


export interface ConversationInfo {
    conversationId: number,
    createdAt: string,
    id: number,
    user: IUser
}