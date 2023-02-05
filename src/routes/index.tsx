import { useSelectColor } from "@cook/hooks/useSelectColor";
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { Else, If, Then } from "react-if";
import { zinc } from "tailwindcss/colors";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@cook/hooks/useAuth";

export function Routes() {
  const { user } = useAuth();
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
      <If condition={Boolean(user)}>
        <Then>
          <AppRoutes />
        </Then>
        <Else>
          <AuthRoutes />
        </Else>
      </If>
    </NavigationContainer>
  );
}
