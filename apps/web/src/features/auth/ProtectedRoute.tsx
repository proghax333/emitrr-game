import { ReactNode } from "react";
import { useSession } from "../session/SessionProvider";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session } = useSession();

  if (session.status === "unknown") {
    return null;
  }

  if (session.status !== "active") {
    return <Navigate to="/login" />;
  }

  return children;
}
