import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles";

// 레이아웃 기본 스타일: 화면 배경과 내부 패딩.
export const styles = {
  shell: tailwind(`${tokens.layout.full} ${tokens.color.screen}`),
  statusBar: tailwind(tokens.color.card),
  content: tailwind(`${tokens.layout.full} ${tokens.spacing.contentX} ${tokens.spacing.contentTop}`),
};
