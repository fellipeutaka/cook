import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { clsx } from "clsx";

import { Spinner, SpinnerProps } from "../ui/Spinner";
import { Text, TextProps } from "./Text";

type RootProps = TouchableOpacityProps & {
  isLoading?: boolean;
  spinnerProps?: SpinnerProps;
};

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  spinnerProps,
  ...props
}: RootProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      className={clsx(
        "flex flex-row justify-center items-center bg-green-500 font-semibold rounded-lg px-8 h-14 w-full",
        { "opacity-30": disabled || isLoading },
        className
      )}
    >
      {isLoading ? <Spinner color="white" {...spinnerProps} /> : children}
    </TouchableOpacity>
  );
};

export function ButtonText(props: TextProps) {
  return <Text className="text-center font-bold" {...props} />;
}
