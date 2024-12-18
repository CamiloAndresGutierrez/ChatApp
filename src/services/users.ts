import {
  CURRENT_USER_CONTACTS_ROUTE,
  CURRENT_USER_ROUTE,
} from "../constants/users.contants";
import { ConversationInfo } from "../types/user";
import Api from "./Api";

export const Users = {
  currentUser: async () => {
    const { success, data } = await Api.get(CURRENT_USER_ROUTE);
    if (success) {
      return data;
    }
    return null;
  },
  getContacts: async (): Promise<ConversationInfo[] | null> => {
    const { success, data } = await Api.get(CURRENT_USER_CONTACTS_ROUTE);
    if (success) {
      return data;
    }
    return null;
  },
};
