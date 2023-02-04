import { useSelectColor } from "@cook/hooks/useSelectColor";
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { zinc } from "tailwindcss/colors";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const select = useSelectColor();
  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: select(zinc[900], zinc[50]),
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  );
}
