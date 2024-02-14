import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="flex items-center flex-col">
        <p className="font-inter mt-4 font-thin">
          Welcome to the Exploding Kittens game!
        </p>
        <div className="flex gap-2">
          <Link
            to="/game/play"
            className="text-center bg-slate-700 p-4 rounded-sm shadow-md mt-2 text-sm"
          >
            Play Game
          </Link>
          <Link
            to="/game/leaderboard"
            className="text-center bg-slate-800 p-4 rounded-sm shadow-lg mt-2 text-sm"
          >
            Go to leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
