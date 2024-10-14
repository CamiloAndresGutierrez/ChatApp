import { StateCreator } from "zustand";
import { IUser } from "../types/user";
import { Users } from "../services/users";

const INITIAL_USER_STATE = {
  id: null,
  name: "",
  email: "",
  active: null,
};

interface State {
  user: IUser;
}

interface Actions {
  removeUser: () => void;
  updateUser: (user: IUser) => void;
  refetchCurrentUser: () => void;
}

export type IUserStore = State & Actions;

export const createUserStore: StateCreator<IUserStore> = (set) => ({
  user: INITIAL_USER_STATE,
  removeUser: () => set({ user: INITIAL_USER_STATE }),
  updateUser: (user: IUser) => set({ user }),
  refetchCurrentUser: async () => {
    const currentUser = (await Users.currentUser()) as IUser;
    return set({ user: currentUser });
  },
});
