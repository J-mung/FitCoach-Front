import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles";

// 헤더 기본 레이아웃/타이포 스타일.
export const headerBaseStyle = tailwind(
  `${tokens.layout.rowBetween} ${tokens.color.card} ${tokens.border.bottom} ${tokens.color.border} ${tokens.spacing.contentX}`
);
export const headerTitleStyle = tailwind(
  `${tokens.typography.fontBase} ${tokens.typography.titleMd} ${tokens.color.textPrimary}`
);
export const headerHeight = 44;
