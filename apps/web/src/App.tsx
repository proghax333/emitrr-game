import { Theme } from "@radix-ui/themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import GameMain from "./pages/game";
import { Provider } from "react-redux";
import { store } from "./features/app/store";
import HomePage from "./pages/home";
import LeaderboardPage from "./pages/leaderboard";

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
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/game",
    element: <GameMain />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <Theme appearance="dark" className="h-full font-poppins">
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  );
}
