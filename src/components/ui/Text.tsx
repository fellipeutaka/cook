import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { clsx } from "clsx";

export type TextProps = RNTextProps;

export function Text({ className, ...props }: TextProps) {
  return <RNText className={clsx("dark:text-white", className)} {...props} />;
}
