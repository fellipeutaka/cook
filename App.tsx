import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Routes } from "@cook/routes";
import { ReactQueryProvider } from "@cook/lib/reactQuery";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <StatusBar style="auto" backgroundColor="transparent" translucent />
        <Routes />
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
