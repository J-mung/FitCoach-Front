import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 인풋 스타일: 기본/에러 상태와 라벨/헬퍼 텍스트를 분리한다.
export const styles = {
  containerBase: tailwind(
    `${tokens.color.card} ${tokens.border.base} ${tokens.radius.md} ${tokens.spacing.inputPaddingX} ${tokens.spacing.inputPaddingY} ${tokens.typography.bodyMd}`
  ),
  border: {
    default: tailwind(tokens.color.border),
    focused: tailwind(tokens.color.borderPrimary),
    error: tailwind(tokens.color.borderPrimary),
    disabled: tailwind(tokens.color.border),
    filled: tailwind(tokens.color.border),
  },
  inputText: tailwind(tokens.color.textPrimary),
  inputTextDisabled: tailwind(tokens.color.textDisabled),
  disabledBackground: tailwind("bg-slate-100"),
  label: tailwind(
    `${tokens.typography.fontBase} ${tokens.typography.bodySm} ${tokens.color.textSecondary} ${tokens.spacing.inputLabelBottom}`
  ),
  helper: {
    default: tailwind(
      `${tokens.typography.fontBase} ${tokens.typography.caption} ${tokens.color.textSecondary} ${tokens.spacing.inputHelperTop}`
    ),
    error: tailwind(
      `${tokens.typography.fontBase} ${tokens.typography.caption} ${tokens.color.textBrand} ${tokens.spacing.inputHelperTop}`
    ),
  },
};
