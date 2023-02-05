import { forwardRef } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";

import { clsx } from "clsx";
import colors from "tailwindcss/colors";

export const Root = ({ className, ...props }: ViewProps) => (
  <View
    {...props}
    className={clsx(
      "p-3 flex-row items-center rounded-xl bg-zinc-200 dark:bg-zinc-800 border-2 border-transparent focus:border-green-500",
      className
    )}
  />
);

export const Input = forwardRef<TextInput, TextInputProps>(
  ({ className, ...props }, ref) => (
    <TextInput
      {...props}
      placeholderTextColor={colors.zinc[400]}
      className={clsx("flex-1 dark:text-white", className)}
      ref={ref}
    />
  )
);
