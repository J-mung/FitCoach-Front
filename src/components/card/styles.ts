import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 카드 스타일: 기본/추천 타입을 분리한다.
export const styles = {
  base: tailwind(`${tokens.radius.md} ${tokens.spacing.cardPadding}`),
  variants: {
    default: tailwind(`${tokens.color.card} ${tokens.border.base} ${tokens.color.border}`),
    recommendation: tailwind(tokens.color.primarySoft),
  },
};
