import type { TextProps } from "react-native";

export const TYPOGRAPHY_VARIANTS = [
  "titleLg",
  "titleMd",
  "bodyMd",
  "bodySm",
  "caption",
] as const;

export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];

export const TYPOGRAPHY_TONES = ["primary", "secondary", "disabled"] as const;

export type TypographyTone = (typeof TYPOGRAPHY_TONES)[number];

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  tone?: TypographyTone;
};
