import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles";

// 타이포그래피 스타일: 폰트/톤 규칙을 분리한다.
export const styles = {
  base: tailwind(tokens.typography.fontBase),
  variants: {
    titleLg: tailwind(`${tokens.typography.titleLg} ${tokens.typography.weightBold}`),
    titleMd: tailwind(`${tokens.typography.titleMd} ${tokens.typography.weightSemibold}`),
    bodyMd: tailwind(tokens.typography.bodyMd),
    bodySm: tailwind(tokens.typography.bodySm),
    caption: tailwind(tokens.typography.caption),
  },
  tones: {
    primary: tailwind(tokens.color.textPrimary),
    secondary: tailwind(tokens.color.textSecondary),
    disabled: tailwind(tokens.color.textDisabled),
  },
};
