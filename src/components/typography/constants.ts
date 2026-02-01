import type { TypographyTone, TypographyVariant } from "./type";

export const typographyVariantClassMap: Record<TypographyVariant, string> = {
  titleLg: "text-title-lg font-bold",
  titleMd: "text-title-md font-semibold",
  bodyMd: "text-body-md",
  bodySm: "text-body-sm",
  caption: "text-caption",
};

export const typographyToneClassMap: Record<TypographyTone, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  disabled: "text-text-disabled",
};
