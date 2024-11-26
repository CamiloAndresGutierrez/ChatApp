import { create } from "zustand";
import { createUserStore, IUserStore } from "./userStore";
import {
  createSocketSubscriptionStore,
  ISocketSubscriptionStore,
} from "./socketSubscription";

export const useBoundStore = create<IUserStore & ISocketSubscriptionStore>(
  (...a) => ({
    ...createUserStore(...a),
    ...createSocketSubscriptionStore(...a),
  })
);
