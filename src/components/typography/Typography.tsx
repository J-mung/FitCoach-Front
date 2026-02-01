import React from "react";
import { Text } from "react-native";
import { tailwind } from "../../theme/tailwind";
import { typographyToneClassMap, typographyVariantClassMap } from "./constants";
import type { TypographyProps } from "./type";

export function Typography({
  variant = "bodyMd",
  tone = "primary",
  style,
  children,
  ...props
}: TypographyProps) {
  const baseClass = `font-sans ${typographyVariantClassMap[variant]} ${
    typographyToneClassMap[tone]
  }`;

  return (
    <Text style={[tailwind(baseClass), style]} {...props}>
      {children}
    </Text>
  );
}
