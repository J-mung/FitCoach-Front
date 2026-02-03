import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableStateCallbackType,
} from "react-native";
import { tailwind } from "../../theme/tailwind";
import {
  buttonBaseClass,
  buttonSizeClassMap,
  buttonTextClassMap,
  buttonVariantClassMap,
} from "./constants";
import type { ButtonProps } from "./type";
import { buttonDisabledClass } from "./styles";

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
  } ${isDisabled ? buttonDisabledClass : ""}`;
  const textClass = `font-sans text-body-md font-semibold ${buttonTextClassMap[variant]}`;
  const spinnerColor = variant === "primary" ? primarySpinnerColor : secondarySpinnerColor;
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [tailwind(containerClass), resolvedStyle];
  };

  return (
    <Pressable style={resolveStyle} disabled={isDisabled} {...props}>
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={tailwind(textClass)}>{title}</Text>
      )}
    </Pressable>
  );
}
