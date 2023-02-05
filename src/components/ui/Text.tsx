import { Text as RNText, TextProps } from "react-native";
import { clsx } from "clsx";

export function Text({ className, ...props }: TextProps) {
  return <RNText className={clsx("dark:text-white", className)} {...props} />;
}
