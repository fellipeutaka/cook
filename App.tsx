import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@cook/routes";
import { ReactQueryProvider } from "@cook/lib/reactQuery";
import { AuthProvider } from "@cook/contexts/AuthContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <AuthProvider>
          <StatusBar style="auto" backgroundColor="transparent" translucent />
          <Routes />
        </AuthProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
