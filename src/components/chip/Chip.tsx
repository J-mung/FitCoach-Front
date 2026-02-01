import React from "react";
import {
  Pressable,
  Text,
  type PressableStateCallbackType,
} from "react-native";
import { tailwind } from "../../theme/tailwind";
import { chipBaseClass, chipTextClassMap, chipVariantClassMap } from "./constants";
import type { ChipProps } from "./type";

export function Chip({ label, variant = "default", style, ...props }: ChipProps) {
  const containerClass = `${chipBaseClass} ${chipVariantClassMap[variant]}`;
  const textClass = `font-sans text-body-sm ${chipTextClassMap[variant]}`;
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [tailwind(containerClass), resolvedStyle];
  };

  return (
    <Pressable style={resolveStyle} {...props}>
      <Text style={tailwind(textClass)}>{label}</Text>
    </Pressable>
  );
}
