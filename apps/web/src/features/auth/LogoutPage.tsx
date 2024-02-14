import { useLogoutMutation } from "@/state/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { logout } from "../session/sessionSlice";

export function LogoutPage() {
  const logoutMutation = useLogoutMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    logoutMutation.mutateAsync().then(() => {
      dispatch(logout());
      navigate("/");
    });
  }, []);

  return <div className="p-12">Logging out...</div>;
}
