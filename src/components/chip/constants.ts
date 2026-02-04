import type { TextStyle, ViewStyle } from "react-native";
import type { ChipVariant } from "./type";
import { styles } from "./styles";

// 칩 variant 매핑: 스타일 객체를 제공한다.
export const chipBaseStyle = styles.base;

export const chipVariantStyleMap: Record<ChipVariant, ViewStyle> = {
  default: styles.variants.default,
  selected: styles.variants.selected,
};

export const chipTextStyleMap: Record<ChipVariant, TextStyle> = {
  default: styles.text.default,
  selected: styles.text.selected,
};
