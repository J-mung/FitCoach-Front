import type { TextStyle, ViewStyle } from "react-native";
import type { InputVariant } from "./type";
import { styles } from "./styles";

// 인풋 variant 매핑: 기본/에러 테두리 스타일을 제공한다.
export const inputBaseStyle = styles.containerBase;

export const inputVariantStyleMap: Record<InputVariant, ViewStyle> = {
  default: styles.border.default,
  focused: styles.border.focused,
  error: styles.border.error,
  disabled: styles.border.disabled,
  filled: styles.border.filled,
};

export const inputLabelStyle: TextStyle = styles.label;
export const inputHelperStyle: TextStyle = styles.helper.default;
export const inputErrorHelperStyle: TextStyle = styles.helper.error;
