import {
  CREATE_MESSAGE_ROUTE,
  MESSAGES_ROUTE,
} from "../constants/users.contants";
import Api from "./Api";

const Messages = {
  async getMessages({
    page,
    conversationId,
  }: {
    page: number;
    conversationId: number;
  }) {
    const res = await Api.get(MESSAGES_ROUTE(conversationId) + `?page=${page}`);

    if (res?.success) {
      return res?.data;
    }
    return [];
  },
  async createMessage({
    content,
    conversationId,
  }: {
    content: string;
    conversationId: number;
  }) {
    const res = await Api.post(CREATE_MESSAGE_ROUTE(conversationId), {
      content,
    });

    if (res?.success) {
      return res?.data;
    }
    return [];
  },
};

export default Messages;
