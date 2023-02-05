import { useState, createContext, ReactNode, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthContextProps = {
  user: FirebaseAuthTypes.User | null;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscription = auth().onAuthStateChanged(setUser);

    return subscription;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
