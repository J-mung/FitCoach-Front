import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import {
  inputBaseStyle,
  inputErrorHelperStyle,
  inputHelperStyle,
  inputLabelStyle,
  inputVariantStyleMap,
} from "./constants";
import type { InputProps } from "./type";
import { styles } from "./styles";

export function Input({
  label,
  helperText,
  variant = "default",
  style,
  editable = true,
  value,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = typeof value === "string" && value.length > 0;
  const isDisabled = !editable;
  // 상태 우선순위: disabled > error > focused > filled > default.
  const resolvedVariant = isDisabled
    ? "disabled"
    : variant === "error"
      ? "error"
      : isFocused
        ? "focused"
        : hasValue
          ? "filled"
          : variant;
  // 에러 여부에 따라 헬퍼 텍스트 스타일을 선택한다.
  const helperStyle = resolvedVariant === "error" ? inputErrorHelperStyle : inputHelperStyle;

  return (
    <View>
      {label ? <Text style={inputLabelStyle}>{label}</Text> : null}
      {/* base + 상태 variant + 외부 style 순서로 합성 */}
      <TextInput
        style={[
          inputBaseStyle,
          inputVariantStyleMap[resolvedVariant],
          isDisabled ? styles.disabledBackground : null,
          isDisabled ? styles.inputTextDisabled : styles.inputText,
          style,
        ]}
        editable={editable}
        value={value}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        accessibilityLabel={props.accessibilityLabel ?? label}
        accessibilityHint={props.accessibilityHint ?? (helperText || undefined)}
        {...props}
      />
      {helperText ? <Text style={helperStyle}>{helperText}</Text> : null}
    </View>
  );
}
