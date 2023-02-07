import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParamList } from "@cook/@types/AuthStackParamList";
import { SignIn } from "@cook/screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
