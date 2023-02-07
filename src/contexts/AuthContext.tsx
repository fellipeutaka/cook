import { useState, createContext, ReactNode, useEffect } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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
    const subscription = auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const { exists } = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (!exists) {
          await firestore().collection("users").doc(user.uid).set({
            favorites: [],
          });
        }
      }
    });

    return subscription;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
