import { StateCreator } from "zustand";
import { IMessage } from "../types/messages";

interface State {
  messages: IMessage[];
}

interface Actions {
  addMessage: (message: IMessage) => void;
  removeMessage: () => void;
}

export type MessagesStore = State & Actions;

export const createSocketSubscriptionStore: StateCreator<MessagesStore> = (
  set
) => ({
  messages: [],
  addMessage: (message: IMessage) => set((state) => ({ messages: [...state.messages, message]})),
  removeMessage: () => {},
});
