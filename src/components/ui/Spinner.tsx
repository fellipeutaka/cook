import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { green } from "tailwindcss/colors";

export function Spinner({ size = "large", ...props }: ActivityIndicatorProps) {
  return <ActivityIndicator size={size} color={green[600]} {...props} />;
}
