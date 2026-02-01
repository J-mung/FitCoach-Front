import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { tailwind } from "../../theme/tailwind";
import {
  buttonBaseClass,
  buttonSizeClassMap,
  buttonTextClassMap,
  buttonVariantClassMap,
} from "./constants";
import type { ButtonProps } from "./type";

const primarySpinnerColor = "#FFFFFF";
const secondarySpinnerColor = "#4C8DFF";

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const containerClass = `${buttonBaseClass} ${buttonSizeClassMap[size]} ${
    buttonVariantClassMap[variant]
  } ${isDisabled ? "opacity-50" : ""}`;
  const textClass = `font-sans text-body-md font-semibold ${buttonTextClassMap[variant]}`;
  const spinnerColor = variant === "primary" ? primarySpinnerColor : secondarySpinnerColor;

  return (
    <Pressable
      style={[tailwind(containerClass), style]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={tailwind(textClass)}>{title}</Text>
      )}
    </Pressable>
  );
}
