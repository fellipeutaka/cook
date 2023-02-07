import { useEffect, useState } from "react";

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export function useFavorites(user: FirebaseAuthTypes.User | null) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = firestore()
      .collection("users")
      .doc(user?.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.data();
        if (data) {
          setFavorites(data.favorites);
        }
        setIsLoading(false);
      });

    return subscription;
  }, []);

  return { favorites, isLoading };
}
