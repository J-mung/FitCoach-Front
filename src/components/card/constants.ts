import type { ViewStyle } from "react-native";
import type { CardVariant } from "./type";
import { styles } from "./styles";

// 카드 variant 매핑: 스타일 객체를 제공한다.
export const cardVariantStyleMap: Record<CardVariant, ViewStyle> = {
  default: styles.variants.default,
  recommendation: styles.variants.recommendation,
};

export const cardBaseStyle = styles.base;
