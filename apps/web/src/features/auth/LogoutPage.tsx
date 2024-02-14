import { useLogoutMutation } from "@/state/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
  const logoutMutation = useLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    logoutMutation.mutateAsync().then(() => navigate("/"));
  }, []);

  return <div className="p-12">Logging out...</div>;
}
