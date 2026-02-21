import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 홈 화면 스타일: 레이아웃/간격을 토큰으로 관리한다.
export const styles = {
  subtitle: tailwind(tokens.spacing.sectionGap),
  cardShadow: tailwind(tokens.shadow.sm),
  cardTitle: tailwind(tokens.spacing.contentGap),
  recommendationSummary: tailwind(tokens.spacing.contentGap),
  reasonList: tailwind(tokens.spacing.contentGap),
  reasonItem: tailwind("px-0 py-2 border-b border-border"),
  quickActionCard: tailwind(`${tokens.shadow.sm} ${tokens.spacing.sectionGap}`),
  quickActionText: tailwind(tokens.spacing.contentGap),
  // 홈 화면 토글 UI 정렬/간격.
  toggleRow: tailwind(`${tokens.spacing.sectionGap} ${tokens.layout.rowBetween}`),
  toggleLabel: tailwind(tokens.spacing.toggleGap),
};
