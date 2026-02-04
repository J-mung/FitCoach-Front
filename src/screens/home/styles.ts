import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 홈 화면 스타일: 레이아웃/간격을 토큰으로 관리한다.
export const styles = {
  subtitle: tailwind(`${tokens.spacing.subtitleTop} ${tokens.spacing.subtitleBottom}`),
  cardShadow: tailwind(tokens.shadow.sm),
  cardTitle: tailwind(tokens.spacing.cardTitleGap),
  // 홈 화면 토글 UI 정렬/간격.
  toggleRow: tailwind(`${tokens.spacing.subtitleTop} ${tokens.layout.rowBetween}`),
  toggleLabel: tailwind(tokens.spacing.toggleGap),
};
