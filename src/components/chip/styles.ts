import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 칩 스타일: 선택 상태에 따른 배경/텍스트를 분리한다.
export const styles = {
  base: tailwind(
    `${tokens.radius.full} ${tokens.spacing.chipPaddingX} ${tokens.spacing.chipPaddingY} ${tokens.shadow.sm}`
  ),
  variants: {
    default: tailwind(`${tokens.color.card} ${tokens.border.base} ${tokens.color.border}`),
    selected: tailwind(`${tokens.color.primarySoft} ${tokens.border.base} ${tokens.color.borderPrimary}`),
    disabled: tailwind(`${tokens.color.card} ${tokens.border.base} ${tokens.color.border}`),
  },
  textBase: tailwind(`${tokens.typography.fontBase} ${tokens.typography.bodySm}`),
  text: {
    default: tailwind(tokens.color.textSecondary),
    selected: tailwind(`${tokens.color.textBrand} ${tokens.typography.weightSemibold}`),
    disabled: tailwind(tokens.color.textDisabled),
  },
  disabled: tailwind(tokens.opacity.disabled),
  pressed: tailwind(tokens.opacity.pressed),
};
