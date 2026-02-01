import React from "react";
import { View } from "react-native";
import { tailwind } from "../../theme/tailwind";
import { cardBaseClass, cardVariantClassMap } from "./constants";
import type { CardProps } from "./type";

export function Card({ variant = "default", style, children, ...props }: CardProps) {
  const cardClass = `${cardBaseClass} ${cardVariantClassMap[variant]}`;

  return (
    <View style={[tailwind(cardClass), style]} {...props}>
      {children}
    </View>
  );
}
