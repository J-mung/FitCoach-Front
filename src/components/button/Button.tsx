import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableStateCallbackType,
} from "react-native";
import {
  buttonBaseStyle,
  buttonSizeStyleMap,
  buttonTextStyleMap,
  buttonVariantStyleMap,
} from "./constants";
import type { ButtonProps } from "./type";
import { styles } from "./styles";

const primarySpinnerColor = "#FFFFFF";
const secondarySpinnerColor = "#4C8DFF";

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  style,
  hitSlop,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: ButtonProps) {
  // 로딩 중에는 비활성으로 처리하고 스피너를 표시한다.
  const isDisabled = disabled || loading;
  const spinnerColor = variant === "primary" ? primarySpinnerColor : secondarySpinnerColor;
  const resolvedHitSlop = hitSlop ?? { top: 6, bottom: 6, left: 10, right: 10 };
  const resolvedAccessibilityRole = accessibilityRole ?? "button";
  const resolvedAccessibilityLabel = accessibilityLabel ?? title;
  const resolvedAccessibilityHint =
    accessibilityHint ?? (loading ? "처리 중입니다. 잠시만 기다려주세요." : undefined);
  // Pressable 스타일은 상태 기반 style 함수도 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [
      buttonBaseStyle,
      buttonSizeStyleMap[size],
      buttonVariantStyleMap[variant],
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
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        // 텍스트는 기본 타이포 스타일 + variant 컬러를 적용한다.
        <Text style={[styles.textBase, styles.text[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}
