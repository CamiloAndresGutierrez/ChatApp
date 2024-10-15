import { useQuery } from "@tanstack/react-query";
import { CONTACTS, CURRENT_USER } from "../constants/users.contants";
import { Users } from "../services/users";
import { IUser } from "../types/user";

export const useCurrentUser = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: [CURRENT_USER],
    queryFn: async () => {
      const currentUser = (await Users.currentUser()) as IUser;

      return currentUser;
    },
    enabled,
  });
};

export const useContacts = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: [CONTACTS],
    queryFn: async () => Users.getContacts(),
    enabled,
  });
};
