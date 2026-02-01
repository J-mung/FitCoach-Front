import React from "react";
import { Text, TextProps } from "react-native";
import { tailwind } from "../theme/tailwind";

type TypographyVariant =
  | "titleLg"
  | "titleMd"
  | "bodyMd"
  | "bodySm"
  | "caption";

type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  tone?: "primary" | "secondary" | "disabled";
};

const variantClassMap: Record<TypographyVariant, string> = {
  titleLg: "text-title-lg font-bold",
  titleMd: "text-title-md font-semibold",
  bodyMd: "text-body-md",
  bodySm: "text-body-sm",
  caption: "text-caption",
};

const toneClassMap = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  disabled: "text-text-disabled",
};

export function Typography({
  variant = "bodyMd",
  tone = "primary",
  style,
  children,
  ...props
}: TypographyProps) {
  const baseClass = `font-sans ${variantClassMap[variant]} ${toneClassMap[tone]}`;

  return (
    <Text style={[tailwind(baseClass), style]} {...props}>
      {children}
    </Text>
  );
}
