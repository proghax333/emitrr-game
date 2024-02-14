import { GetUserResult, useGetCurrentUserQuery } from "@/state/user";
import { ReactNode, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { SessionContext } from "./SessionContext";
import { inactive, login } from "./sessionSlice";

export type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const session = useAppSelector((state) => state.session);
  const { isLoading, isSuccess, isError, data, refetch } =
    useGetCurrentUserQuery({
      retry: 0,
    });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      dispatch(inactive());
      return;
    }

    if (isSuccess) {
      const user = (data as GetUserResult).data;

      dispatch(
        login({
          id: user.id,
          name: user.name,
          username: user.username,
        })
      );
    }
  }, [isLoading]);

  async function reload() {
    await refetch();
  }

  const value = {
    reload,
    session,
  };

  if (isLoading || session.status === "unknown") {
    return null;
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
