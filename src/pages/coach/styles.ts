import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// AI 코치 화면 스타일: 입력/응답 카드 레이아웃을 분리한다.
export const styles = {
  subtitle: tailwind(tokens.spacing.sectionGap),
  inputWrap: tailwind(tokens.spacing.contentGap),
  sendButtonWrap: tailwind(tokens.spacing.sectionGap),
  responseCard: tailwind(`${tokens.shadow.sm} ${tokens.spacing.sectionGap}`),
  responseSection: tailwind(tokens.spacing.contentGap),
};
