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
  return (
    <main className="h-full w-full">
      <div className="flex w-full items-center justify-center flex-col pt-8">
        <h2 className="font-oswald font-bold text-4xl border-4 p-2">
          Leaderboard
        </h2>
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
              <LeaderboardRow
                data={{
                  rank: 1,
                  name: "Atmanand Nagpure",
                  score: 100,
                }}
              />
              <LeaderboardRow
                data={{
                  rank: 2,
                  name: "Jacker Packer Some Company Co.",
                  score: 50,
                }}
              />
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
