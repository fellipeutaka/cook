import { useContext } from "react";

import { AuthContext } from "@cook/contexts/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
