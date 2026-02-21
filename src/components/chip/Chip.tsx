import React from "react";
import {
  Pressable,
  Text,
  type PressableStateCallbackType,
} from "react-native";
import { chipBaseStyle, chipTextStyleMap, chipVariantStyleMap } from "./constants";
import { styles } from "./styles";
import type { ChipProps } from "./type";

export function Chip({
  label,
  variant = "default",
  disabled = false,
  style,
  hitSlop,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: ChipProps) {
  const isDisabled = disabled || variant === "disabled";
  const resolvedVariant = isDisabled ? "disabled" : variant;
  const resolvedHitSlop = hitSlop ?? { top: 6, bottom: 6, left: 8, right: 8 };
  const resolvedAccessibilityRole = accessibilityRole ?? "button";
  const resolvedAccessibilityLabel = accessibilityLabel ?? label;
  const resolvedAccessibilityHint =
    accessibilityHint ?? (isDisabled ? "비활성화된 항목입니다." : undefined);
  // Pressable은 상태 기반 스타일 함수를 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [
      chipBaseStyle,
      chipVariantStyleMap[resolvedVariant],
      state.pressed && !isDisabled ? styles.pressed : null,
      isDisabled ? styles.disabled : null,
      resolvedStyle,
    ];
  };

  return (
    <Pressable
      style={resolveStyle}
      disabled={isDisabled}
      hitSlop={resolvedHitSlop}
      accessibilityRole={resolvedAccessibilityRole}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityHint={resolvedAccessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
      {...props}
    >
      {/* 기본 텍스트 스타일 + variant 스타일을 합성 */}
      <Text style={[styles.textBase, chipTextStyleMap[resolvedVariant]]}>{label}</Text>
    </Pressable>
  );
}
