import { api } from "@/lib/api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useGetLeaderboardQuery(options: Partial<UseQueryOptions> = {}) {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await api.get("/leaderboard");
      return res.data;
    },
    ...options,
  });
}
