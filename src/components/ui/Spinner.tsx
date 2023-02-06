import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { green } from "tailwindcss/colors";

export type SpinnerProps = ActivityIndicatorProps;

export function Spinner({ size = "large", ...props }: SpinnerProps) {
  return <ActivityIndicator size={size} color={green[600]} {...props} />;
}
