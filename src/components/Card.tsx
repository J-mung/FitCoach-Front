import React from "react";
import { View, ViewProps } from "react-native";
import { tailwind } from "../theme/tailwind";

type CardVariant = "default" | "recommendation";

type CardProps = ViewProps & {
  variant?: CardVariant;
};

const variantClassMap: Record<CardVariant, string> = {
  default: "bg-bg-card border border-border",
  recommendation: "bg-primary-100",
};

export function Card({ variant = "default", style, children, ...props }: CardProps) {
  const cardClass = `rounded-md p-16 ${variantClassMap[variant]}`;

  return (
    <View style={[tailwind(cardClass), style]} {...props}>
      {children}
    </View>
  );
}
