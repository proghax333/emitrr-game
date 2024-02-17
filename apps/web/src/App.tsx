import { Theme } from "@radix-ui/themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import GameMain from "./pages/game";
import { store } from "./features/app/store";
import HomePage from "./pages/home";
import LeaderboardPage from "./pages/leaderboard";
import LogoutPage from "./pages/logout";
import { SessionProvider } from "./features/session/SessionProvider";
import { GameIndex } from "./features/game/GameIndex";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/game",
    element: (
      <ProtectedRoute>
        <GameIndex />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "play",
        element: <GameMain />,
      },
      {
        path: "leaderboard",
        element: <LeaderboardPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Theme appearance="dark" className="h-full font-poppins">
          <SessionProvider>
            <RouterProvider router={router} />
          </SessionProvider>
        </Theme>
      </Provider>
    </QueryClientProvider>
  );
}
