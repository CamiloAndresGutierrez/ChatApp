import { V1 } from "./general.constants";

export const CURRENT_USER = 'current_user'
export const CONTACTS = 'CONTACTS'

export const USERS_ROUTE = `${V1}/users`
export const CURRENT_USER_ROUTE = `${USERS_ROUTE}/current`
export const CURRENT_USER_CONTACTS_ROUTE = `${USERS_ROUTE}/contacts`