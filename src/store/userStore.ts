import { StateCreator } from "zustand";
import { IUser } from "../types/user";
import { Users } from "../services/users";
import localStorage from "../utils/localStorage";

const INITIAL_USER_STATE = {
  id: null,
  name: "",
  email: "",
  active: null,
};

interface State {
  user: IUser;
  isLoadingUser: boolean;
}

interface Actions {
  removeUser: () => void;
  updateUser: (user: IUser) => void;
  refetchCurrentUser: () => void;
}

export type IUserStore = State & Actions;

export const createUserStore: StateCreator<IUserStore> = (set) => ({
  user: INITIAL_USER_STATE,
  isLoadingUser: false,
  removeUser: () => set({ user: INITIAL_USER_STATE }),
  updateUser: (user: IUser) => set({ user }),
  refetchCurrentUser: async () => {
    set({ isLoadingUser: true });
    try {
      const currentUser = (await Users.currentUser()) as IUser;

      return set({ user: currentUser });
    } catch (e) {
      localStorage.removeAuthToken();
      return set({ user: INITIAL_USER_STATE });
    } finally {
      return set({ isLoadingUser: false });
    }
  },
});
