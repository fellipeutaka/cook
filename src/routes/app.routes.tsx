import type { RootTabsParamList } from "@cook/@types/RootTabsParamList";
import { Favorites } from "@cook/screens/Favorites";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Heart, House } from "phosphor-react-native";
import { green, zinc } from "tailwindcss/colors";
import { HomeStack } from "./stacks/home.stack";

const { Navigator, Screen } = createBottomTabNavigator<RootTabsParamList>();

export function AppRoutes() {
  return (
    <Navigator
      safeAreaInsets={{
        bottom: 8,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingVertical: 4,
          backgroundColor: zinc[900],
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: green[600],
      }}
    >
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, ...props }) => (
            <House weight="fill" {...props} />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused, ...props }) => (
            <Heart weight="fill" {...props} />
          ),
        }}
      />
    </Navigator>
  );
}
