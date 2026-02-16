import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 온보딩 화면 스타일: 토큰 기반으로 조합한다.
export const styles = {
  container: tailwind(`${tokens.layout.full} ${tokens.color.surface}`),
  // 헤더/콘텐츠 좌우 패딩은 분리해서 관리한다.
  headerContent: tailwind(`${tokens.spacing.screenX} ${tokens.spacing.sectionGap}`),
  divider: tailwind(`h-[1px] ${tokens.color.border}`),
  contentContainer: tailwind(`${tokens.layout.full} ${tokens.spacing.screenX}`),
  header: tailwind(tokens.spacing.sectionGap),
  title: tailwind(tokens.spacing.titleGap),
  step: tailwind(tokens.spacing.sectionGap),
  body: tailwind(tokens.layout.full),
  contentGap: tailwind(tokens.spacing.contentGap),
  // 선택지 레이아웃(줄바꿈 허용).
  choiceWrap: tailwind(`${tokens.layout.rowCenter} flex-wrap ${tokens.spacing.choiceTop}`),
  // 칩 간격.
  chipItem: tailwind(tokens.spacing.chipGap),
  // 요약 행/라벨 간격.
  summaryRow: tailwind(tokens.spacing.summaryRowGap),
  summaryLabel: tailwind(tokens.spacing.summaryLabelGap),
  // 하단 CTA 영역 여백.
  footer: tailwind(tokens.spacing.footerTop),
  // 단계 표시 영역.
  indicatorRow: tailwind("w-full"),
  indicatorTrack: tailwind(
    `${tokens.layout.full} ${tokens.size.progressBar} ${tokens.radius.full} ${tokens.color.dot}`
  ),
  indicatorFill: tailwind(
    `${tokens.size.progressBar} ${tokens.radius.full} ${tokens.color.dotActive}`
  ),
  // CTA 버튼 영역.
  ctaRow: tailwind(tokens.layout.rowCenter),
  ctaButtonPrimary: tailwind(tokens.layout.full),
  ctaButtonSecondary: tailwind(`${tokens.layout.full} ${tokens.spacing.ctaGap}`),
};
