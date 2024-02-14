import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export type LoginFormType = { login: string; password: string };

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginFormType) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
  });
}

export type SignupFormType = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function useSignupMutation() {
  return useMutation({
    mutationFn: async (data: SignupFormType) => {
      const res = await api.post("/auth/signup", data);
      return res.data;
    },
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      return res.data;
    },
  });
}
