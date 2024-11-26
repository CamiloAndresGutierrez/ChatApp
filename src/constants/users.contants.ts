import { V1 } from "./general.constants";

export const CURRENT_USER = 'current_user'
export const CONTACTS = 'contacts'
export const MESSAGES = 'messages'

export const USERS_ROUTE = `${V1}/users`
export const CURRENT_USER_ROUTE = `${USERS_ROUTE}/current`
export const CURRENT_USER_CONTACTS_ROUTE = `${USERS_ROUTE}/contacts`

export const MESSAGES_ROUTE = (conversationId: number) => `${V1}/messages-list/${conversationId}`