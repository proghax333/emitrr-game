import { api } from "@/lib/api";
import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query";

export type GetUserResult = {
  data: {
    id: number;
    name: string;
    username: string;
  };
};

export function useGetUserQuery(userId?: number, options: QueryOptions = {}) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await api.get<GetUserResult>(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
    ...options,
  });
}

export function useGetCurrentUserQuery(options: QueryOptions = {}) {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const res = await api.get<GetUserResult>(`/users/me`);
      return res.data;
    },
    ...options,
  });
}

export function useUpdateUserScoreMutation() {
  return useMutation({
    mutationFn: async ({
      userId,
      result,
    }: {
      userId: number;
      result: "win" | "lose";
    }) => {
      const res = await api.post(`/users/${userId}/score`, {
        result,
      });
      return res.data;
    },
  });
}
