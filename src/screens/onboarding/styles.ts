import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 온보딩 화면 스타일: 토큰 기반으로 조합한다.
export const styles = {
  container: tailwind(
    `${tokens.layout.full} ${tokens.color.surface} ${tokens.spacing.screenX} ${tokens.spacing.screenTop}`
  ),
  header: tailwind(tokens.spacing.sectionGap),
  title: tailwind(tokens.spacing.titleGap),
  step: tailwind(tokens.spacing.sectionGap),
  body: tailwind(tokens.layout.full),
  // 하단 CTA 영역 여백.
  footer: tailwind(tokens.spacing.footerTop),
  // 단계 표시 영역.
  indicatorRow: tailwind(tokens.layout.rowCenter),
  indicatorDot: tailwind(
    `${tokens.size.dot} ${tokens.radius.full} ${tokens.color.dot} ${tokens.spacing.dotGap}`
  ),
  indicatorDotActive: tailwind(tokens.color.dotActive),
  // CTA 버튼 영역.
  ctaRow: tailwind(tokens.layout.rowCenter),
  ctaButtonPrimary: tailwind(tokens.layout.full),
  ctaButtonSecondary: tailwind(`${tokens.layout.full} ${tokens.spacing.ctaGap}`),
};
