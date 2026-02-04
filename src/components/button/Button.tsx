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
  ...props
}: ButtonProps) {
  // 로딩 중에는 비활성으로 처리하고 스피너를 표시한다.
  const isDisabled = disabled || loading;
  const spinnerColor = variant === "primary" ? primarySpinnerColor : secondarySpinnerColor;
  // Pressable 스타일은 상태 기반 style 함수도 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [
      buttonBaseStyle,
      buttonSizeStyleMap[size],
      buttonVariantStyleMap[variant],
      isDisabled ? styles.disabled : null,
      resolvedStyle,
    ];
  };

  return (
    <Pressable style={resolveStyle} disabled={isDisabled} {...props}>
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        // 텍스트는 기본 타이포 스타일 + variant 컬러를 적용한다.
        <Text style={[styles.textBase, styles.text[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}
