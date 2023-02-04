import { useColorScheme } from "react-native";

export function useSelectColor() {
  const colorScheme = useColorScheme();
  return function (darkColor: string, whiteColor: string) {
    return colorScheme === "dark" ? darkColor : whiteColor;
  };
}
