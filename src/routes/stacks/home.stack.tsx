import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@cook/@types/HomeStackParamList";
import { Home } from "@cook/screens/Home";
import { Recipe } from "@cook/screens/Recipe";

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="List" component={Home} />
      <Screen name="Recipe" component={Recipe} />
    </Navigator>
  );
}
