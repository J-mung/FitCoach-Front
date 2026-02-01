import React from "react";
import { Text, TextInput, View } from "react-native";
import { tailwind } from "../../theme/tailwind";
import {
  inputBaseClass,
  inputErrorHelperClass,
  inputHelperClass,
  inputLabelClass,
  inputVariantClassMap,
} from "./constants";
import type { InputProps } from "./type";

export function Input({
  label,
  helperText,
  variant = "default",
  style,
  ...props
}: InputProps) {
  const containerClass = `${inputBaseClass} ${inputVariantClassMap[variant]}`;
  const helperClass = variant === "error" ? inputErrorHelperClass : inputHelperClass;

  return (
    <View>
      {label ? <Text style={tailwind(inputLabelClass)}>{label}</Text> : null}
      <TextInput style={[tailwind(containerClass), style]} {...props} />
      {helperText ? <Text style={tailwind(helperClass)}>{helperText}</Text> : null}
    </View>
  );
}
