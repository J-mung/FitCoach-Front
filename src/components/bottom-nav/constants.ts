import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 하단 네비게이션 레이아웃/텍스트 스타일.
export const bottomNavContainerStyle = tailwind(
  `flex-row items-center justify-around ${tokens.color.card} ${tokens.border.top} ${tokens.color.border} ${tokens.spacing.navPaddingX}`
);
export const bottomNavItemBaseStyle = tailwind(tokens.layout.center);
export const bottomNavLabelStyle = tailwind(
  `${tokens.typography.fontBase} ${tokens.typography.caption}`
);
export const bottomNavActiveTextStyle = tailwind(tokens.color.textBrand);
export const bottomNavInactiveTextStyle = tailwind(tokens.color.textSecondary);
// iOS 기본 탭바 높이에 맞춘 고정 높이.
export const bottomNavHeight = 49;
