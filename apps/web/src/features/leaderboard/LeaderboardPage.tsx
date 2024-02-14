import { useGetLeaderboardQuery } from "@/state/game";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
  const { isLoading, isSuccess, isError, data, error } = useGetLeaderboardQuery(
    {
      refetchInterval: 1000,
    }
  );

  let contents: ReactNode = null;

  if (isLoading) {
    return null;
  }

  if (isError) {
    contents = <div></div>;
  } else if (isSuccess && data) {
    contents = (
      <div className="flex w-full items-center justify-center flex-col pt-8">
        <div className="flex items-center gap-2">
          <Link
            to="/home"
            className="font-oswald font-bold text-4xl border-4 p-2"
          >
            Cat Game
          </Link>
          <Link
            to="/leaderboard"
            className="font-oswald font-bold text-4xl  p-2"
          >
            Leaderboard
          </Link>
        </div>
        <div className="mt-8 ">
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
                      data={{
                        key: `entry-${user.id}`,
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

  console.log(data);

  return <main className="h-full w-full">{contents}</main>;
}
