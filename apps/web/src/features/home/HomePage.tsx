import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="h-full w-full">
      <div className="flex w-full items-center flex-col pt-8">
        <h2 className="font-oswald font-bold text-4xl border-4 p-2">
          Cats Game
        </h2>
        <p className="font-inter mt-12">Welcome to the cats game.</p>
        <Link
          to="/game"
          className="text-center bg-blue-600 p-2 rounded-md shadow-md mt-2 text-sm"
        >
          New Game
        </Link>
      </div>
    </main>
  );
}
