import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@cook/@types/RootStackParamList";
import { Home } from "@cook/screens/Home";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
