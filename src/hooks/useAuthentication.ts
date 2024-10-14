import { useMutation } from "@tanstack/react-query";
import { useBoundStore } from "../store";
import Api from "../services/Api";
import { IUser } from "../types/user";

export const useAuth = () => {
  const { updateUser } = useBoundStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Api.loginRequest({ email, password }),
    onSuccess: ({data, success}: {data: IUser, success: boolean}) => {
      if (success) {
        updateUser(data);
      }
      else {
        console.error('No data found')
      }
    },
  });
};
