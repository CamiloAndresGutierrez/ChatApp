import { useMutation, useQuery } from "@tanstack/react-query";
import { CONTACTS, CURRENT_USER } from "../constants/users.contants";
import { Users } from "../services/users";
import { ConversationInfo, IUser } from "../types/user";
import Messages from "../services/messages.services";
import { IMessage } from "../types/messages";

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
    queryFn: async (): Promise<ConversationInfo[] | null> =>
      Users.getContacts(),
    enabled,
  });
};

export const useMessages = ({
  enabled,
  conversationId,
  page = 1,
}: {
  enabled: boolean;
  conversationId: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: [conversationId, page],
    queryFn: async (): Promise<IMessage[] | null> =>
      Messages.getMessages({
        page,
        conversationId,
      }),
    enabled,
  });
};

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: ({
      conversationId,
      content,
    }: {
      conversationId: number;
      content: string;
    }) =>
      Messages.createMessage({
        conversationId,
        content,
      }),
  });
};
