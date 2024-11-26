import { StateCreator } from "zustand";
import localStorage from "../utils/localStorage";
import { IMessage } from "../types/messages";
import camelcaseKeys from "camelcase-keys";

export interface SubscriptionMessage {
  type: string;
  identifier: string;
  message: number | string | IMessage;
}

interface State {
  socketSubscriptionSuccess: boolean;
  subscription: SubscriptionMessage[];
  isLoading: boolean;
  socketConnection: WebSocket | undefined;
  messages: IMessage[];
}

interface Actions {
  createSubscription: () => void;
  removeSubscription: () => void;
}

export type ISocketSubscriptionStore = State & Actions;

export const createSocketSubscriptionStore: StateCreator<
  ISocketSubscriptionStore
> = (set) => ({
  subscription: [],
  socketConnection: undefined,
  socketSubscriptionSuccess: false,
  subscriptionMessage: [],
  messages: [],
  isLoading: false,
  // Create a subscription to the WebSocket
  createSubscription: () => {
    const authToken = localStorage.getAuthToken();
    const ws = new WebSocket(`ws://localhost:3000/cable?token=${authToken}`);

    set({ socketConnection: ws });

    const subscribeMessage = {
      command: "subscribe",
      identifier: JSON.stringify({ channel: "ConversationsChannel" }),
    };

    // Open the WebSocket connection and send the subscription request
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };

    // Handle incoming messages and update state on successful connection
    ws.onmessage = (event) => {
      const response: SubscriptionMessage = JSON.parse(event.data);

      if (
        response.identifier &&
        JSON.parse(response.identifier).channel === "ConversationsChannel"
      ) {
        if (response.type === "confirm_subscription") {
          // Confirmed subscription
          set({
            subscription: [response],
            socketSubscriptionSuccess: true,
          });
        } else if (
          response.type !== "ping" &&
          typeof response.message !== "string" &&
          typeof response.message !== "number"
        ) {

          const messages = camelcaseKeys(response.message)
          set((state) => ({
            messages: [...state.messages, messages],
          }));
        }
      }
    };

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle WebSocket closure
    ws.onclose = () => {
      set({ socketSubscriptionSuccess: false, subscription: undefined });
    };
  },

  // Remove the subscription and close the WebSocket
  removeSubscription: () => {
    // Send unsubscribe command
    const unsubscribeMessage = {
      command: "unsubscribe",
      identifier: JSON.stringify({ channel: "ConversationsChannel" }),
    };

    set((state) => {
      state.socketConnection?.send(JSON.stringify(unsubscribeMessage));
      return {
        subscription: undefined,
        socketSubscriptionSuccess: false,
      };
    });
  },
});
