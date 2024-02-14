import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="h-full w-full">
      <div className="flex w-full items-center flex-col pt-8">
        <h2 className="font-oswald font-bold text-4xl border-4 p-2">
          Cats Game
        </h2>
        <p className="font-inter mt-12">Welcome to the cats game.</p>
        <div className="flex gap-2">
          <Link
            to="/game"
            className="text-center bg-slate-700 p-4 rounded-sm shadow-md mt-2 text-sm"
          >
            New Game
          </Link>
          <Link
            to="/leaderboard"
            className="text-center bg-slate-800 p-4 rounded-sm shadow-md mt-2 text-sm"
          >
            Go to leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
