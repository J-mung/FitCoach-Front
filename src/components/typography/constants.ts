import type { TypographyTone, TypographyVariant } from "./type";
import {
  typographyBodyMdClass,
  typographyBodySmClass,
  typographyCaptionClass,
  typographyTitleLgClass,
  typographyTitleMdClass,
  typographyToneDisabledClass,
  typographyTonePrimaryClass,
  typographyToneSecondaryClass,
} from "./styles";

export const typographyVariantClassMap: Record<TypographyVariant, string> = {
  titleLg: typographyTitleLgClass,
  titleMd: typographyTitleMdClass,
  bodyMd: typographyBodyMdClass,
  bodySm: typographyBodySmClass,
  caption: typographyCaptionClass,
};

export const typographyToneClassMap: Record<TypographyTone, string> = {
  primary: typographyTonePrimaryClass,
  secondary: typographyToneSecondaryClass,
  disabled: typographyToneDisabledClass,
};
