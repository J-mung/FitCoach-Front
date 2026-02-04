import type { ViewStyle, TextStyle } from "react-native";
import type { ButtonSize, ButtonVariant } from "./type";
import { styles } from "./styles";

// 버튼 스타일 매핑: size/variant별 스타일 객체를 제공한다.
export const buttonBaseStyle = styles.base;

export const buttonSizeStyleMap: Record<ButtonSize, ViewStyle> = {
  md: styles.sizes.md,
  lg: styles.sizes.lg,
};

export const buttonVariantStyleMap: Record<ButtonVariant, ViewStyle> = {
  primary: styles.variants.primary,
  secondary: styles.variants.secondary,
  ghost: styles.variants.ghost,
};

export const buttonTextStyleMap: Record<ButtonVariant, TextStyle> = {
  primary: styles.text.primary,
  secondary: styles.text.secondary,
  ghost: styles.text.ghost,
};
