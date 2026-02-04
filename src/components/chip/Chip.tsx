import React from "react";
import {
  Pressable,
  Text,
  type PressableStateCallbackType,
} from "react-native";
import { chipBaseStyle, chipTextStyleMap, chipVariantStyleMap } from "./constants";
import { styles } from "./styles";
import type { ChipProps } from "./type";

export function Chip({ label, variant = "default", style, ...props }: ChipProps) {
  // Pressable은 상태 기반 스타일 함수를 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [chipBaseStyle, chipVariantStyleMap[variant], resolvedStyle];
  };

  return (
    <Pressable style={resolveStyle} {...props}>
      {/* 기본 텍스트 스타일 + variant 스타일을 합성 */}
      <Text style={[styles.textBase, chipTextStyleMap[variant]]}>{label}</Text>
    </Pressable>
  );
}
