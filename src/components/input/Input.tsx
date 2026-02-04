import React from "react";
import { Text, TextInput, View } from "react-native";
import {
  inputBaseStyle,
  inputErrorHelperStyle,
  inputHelperStyle,
  inputLabelStyle,
  inputVariantStyleMap,
} from "./constants";
import type { InputProps } from "./type";

export function Input({
  label,
  helperText,
  variant = "default",
  style,
  ...props
}: InputProps) {
  // 에러 여부에 따라 헬퍼 텍스트 스타일을 선택한다.
  const helperStyle = variant === "error" ? inputErrorHelperStyle : inputHelperStyle;

  return (
    <View>
      {label ? <Text style={inputLabelStyle}>{label}</Text> : null}
      {/* base + variant + 외부 style 순서로 합성 */}
      <TextInput style={[inputBaseStyle, inputVariantStyleMap[variant], style]} {...props} />
      {helperText ? <Text style={helperStyle}>{helperText}</Text> : null}
    </View>
  );
}
