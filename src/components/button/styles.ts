import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 버튼 스타일: 공통/사이즈/톤을 분리한다.
export const styles = {
  base: tailwind(`${tokens.layout.center} ${tokens.radius.md} min-h-11`),
  sizes: {
    md: tailwind(tokens.spacing.buttonPaddingMd),
    lg: tailwind(tokens.spacing.buttonPaddingLg),
  },
  variants: {
    primary: tailwind(tokens.color.primary),
    secondary: tailwind(`${tokens.color.card} ${tokens.border.base} ${tokens.color.border}`),
    ghost: tailwind(tokens.color.transparent),
  },
  textBase: tailwind(
    `${tokens.typography.fontBase} ${tokens.typography.bodyMd} ${tokens.typography.weightSemibold}`
  ),
  text: {
    primary: tailwind(tokens.color.textOnPrimary),
    secondary: tailwind(tokens.color.textBrand),
    ghost: tailwind(tokens.color.textBrand),
  },
  disabled: tailwind(tokens.opacity.disabled),
  pressed: tailwind(tokens.opacity.pressed),
};
