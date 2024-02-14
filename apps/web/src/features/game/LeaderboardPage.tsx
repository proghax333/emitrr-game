import { useGetLeaderboardQuery } from "@/state/game";
import { ReactNode } from "react";

function LeaderboardRow({ data }: any) {
  return (
    <tr>
      <td className="text-right">{data.rank}</td>
      <td className="text-left px-4">{data.name}</td>
      <td className="text-right">{data.score}</td>
    </tr>
  );
}

export function LeaderboardPage() {
  const { isLoading, isSuccess, isError, data } = useGetLeaderboardQuery({
    refetchInterval: 1000,
  });

  let contents: ReactNode = null;

  if (isLoading) {
    return null;
  }

  if (isError) {
    contents = <div></div>;
  } else if (isSuccess && data) {
    contents = (
      <div className="flex w-full items-center justify-center flex-col">
        <h1 className="font-oswald text-3xl font-bold my-2 underline">
          Leaderboard
        </h1>
        <div className="mt-2">
          <table className="border-spacing-2 w-full max-w-xl">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {(data as any).data.map(
                (
                  user: {
                    id: number;
                    name: string;
                    username: string;
                    score: number;
                  },
                  index: number
                ) => {
                  return (
                    <LeaderboardRow
                      key={`entry-leaderboard-${user.id}`}
                      data={{
                        rank: index + 1,
                        name: user.name,
                        score: user.score,
                      }}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <main className="h-full w-full">{contents}</main>;
}
