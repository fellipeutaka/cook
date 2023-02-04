import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export function Spinner({ size = "large", ...props }: ActivityIndicatorProps) {
  return <ActivityIndicator size={size} {...props} />;
}
