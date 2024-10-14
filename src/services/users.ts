import { CURRENT_USER_ROUTE } from "../constants/users.contants";
import Api from "./Api"

export const Users = {
    currentUser: async () => {
        const { success, data } = await Api.get(CURRENT_USER_ROUTE);
        if (success) {
            return data
        }
        return null
    }
}