import React from "react";
import { View } from "react-native";
import { cardBaseStyle, cardVariantStyleMap } from "./constants";
import type { CardProps } from "./type";

export function Card({ variant = "default", style, children, ...props }: CardProps) {
  // 기본 스타일 + variant 스타일 순서로 적용한다.
  const variantStyle = cardVariantStyleMap[variant];
  return (
    <View style={[cardBaseStyle, variantStyle, style]} {...props}>
      {children}
    </View>
  );
}
