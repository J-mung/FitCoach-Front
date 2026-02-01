import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";
import { tailwind } from "../theme/tailwind";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonSize = "md" | "lg";

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const baseClass = "items-center justify-center rounded-md";

const sizeClassMap: Record<ButtonSize, string> = {
  md: "py-12",
  lg: "py-16",
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-primary-500",
  secondary: "bg-bg-card border border-border",
  ghost: "bg-transparent",
};

const textClassMap: Record<ButtonVariant, string> = {
  primary: "text-bg-card",
  secondary: "text-primary-500",
  ghost: "text-primary-500",
};

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
  const containerClass = `${baseClass} ${sizeClassMap[size]} ${variantClassMap[variant]} ${
    isDisabled ? "opacity-50" : ""
  }`;
  const textClass = `font-sans text-body-md font-semibold ${textClassMap[variant]}`;

  return (
    <Pressable
      style={[tailwind(containerClass), style]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#4C8DFF"}
        />
      ) : (
        <Text style={tailwind(textClass)}>{title}</Text>
      )}
    </Pressable>
  );
}
