import { createContext } from "react";
import { SessionState } from "./sessionSlice";

export type SessionContextType = {
  session: SessionState;
  reload: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextType>({
  reload: async () => {},
  session: {} as any,
});
