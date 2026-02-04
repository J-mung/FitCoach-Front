import type { TextStyle } from "react-native";
import type { TypographyTone, TypographyVariant } from "./type";
import { styles } from "./styles";

// Typography variant/tone 매핑: 스타일 객체를 참조한다.
export const typographyVariantStyleMap: Record<TypographyVariant, TextStyle> = {
  titleLg: styles.variants.titleLg,
  titleMd: styles.variants.titleMd,
  bodyMd: styles.variants.bodyMd,
  bodySm: styles.variants.bodySm,
  caption: styles.variants.caption,
};

export const typographyToneStyleMap: Record<TypographyTone, TextStyle> = {
  primary: styles.tones.primary,
  secondary: styles.tones.secondary,
  disabled: styles.tones.disabled,
};
