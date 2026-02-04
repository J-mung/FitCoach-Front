import React from "react";
import { Text } from "react-native";
import { typographyToneStyleMap, typographyVariantStyleMap } from "./constants";
import type { TypographyProps } from "./type";
import { styles } from "./styles";

export function Typography({
  variant = "bodyMd",
  tone = "primary",
  style,
  children,
  ...props
}: TypographyProps) {
  // 기본 폰트 + variant + tone 순서로 합성한다.
  const variantStyle = typographyVariantStyleMap[variant];
  const toneStyle = typographyToneStyleMap[tone];

  return (
    // 외부에서 전달된 style은 마지막에 적용한다.
    <Text style={[styles.base, variantStyle, toneStyle, style]} {...props}>
      {children}
    </Text>
  );
}
