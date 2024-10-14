import { create } from "zustand";
import { createUserStore, IUserStore } from "./userStore";

export const useBoundStore = create<IUserStore>((...a) => ({
  ...createUserStore(...a),
}));
