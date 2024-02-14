import { useAppSelector } from "@/features/app/hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const session = useAppSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (session.status === "active") {
      navigate("/game");
    } else if (session.status !== "unknown") {
      navigate("/login");
    }
  }, [session.status]);

  return null;
}
