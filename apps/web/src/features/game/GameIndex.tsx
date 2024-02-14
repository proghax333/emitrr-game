import { Link, Outlet } from "react-router-dom";
import { useSession } from "../session/SessionProvider";

export function GameIndex() {
  const { session } = useSession();

  return (
    <main className="h-full bg-slate-900 w-full">
      <div className="h-full flex flex-col items-center">
        <div className="h-full py-8 pt-2 w-full max-w-2xl bg-slate-800">
          <div className="flex items-center px-6 pt-2">
            <Link
              to="/game"
              className="font-oswald font-bold text-2xl border-4 p-2"
            >
              Cat Game
            </Link>

            <div className="ml-6">
              <ul className="flex gap-2 flex-wrap">
                <li>
                  <Link
                    to="/game"
                    className="p-2 px-4 bg-slate-700 min-w-20 inline-block text-center text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/game/play"
                    className="p-2 px-4 bg-slate-700 min-w-20 inline-block text-center text-sm"
                  >
                    Play
                  </Link>
                </li>
                <li>
                  <Link
                    to="/game/leaderboard"
                    className="p-2 px-4 bg-slate-700 min-w-20 inline-block text-center text-sm"
                  >
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ml-auto">
              <Link
                to="/logout"
                className="p-2 px-4 bg-slate-700 min-w-20 inline-block text-center text-sm"
              >
                Logout ({session.user?.username})
              </Link>
            </div>
          </div>
          <hr className="mt-4" />

          <Outlet />
        </div>
      </div>
    </main>
  );
}
