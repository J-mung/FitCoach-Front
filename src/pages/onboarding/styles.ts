import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 온보딩 화면 전역 스타일.
export const styles = {
  container: tailwind(`${tokens.layout.full} ${tokens.color.surface}`),
  headerShell: tailwind("px-6 pt-2"),
  welcomeHeaderRow: tailwind(`${tokens.layout.rowBetween} py-3`),
  stepHeaderRow: tailwind(`${tokens.layout.rowBetween} py-2`),
  stepBackButton: tailwind("w-8 h-8 items-center justify-center"),
  indicatorRow: tailwind("w-full py-2"),
  indicatorTrack: tailwind(`w-full h-2 rounded-full bg-slate-200`),
  indicatorFill: tailwind(`h-2 rounded-full bg-primary-500`),

  contentContainer: tailwind(`${tokens.layout.full} px-6`),
  body: tailwind(`${tokens.layout.full} pt-6`),
  stepContent: tailwind(tokens.layout.full),
  summaryScroll: tailwind(tokens.layout.full),
  summaryScrollContent: tailwind("pb-8"),

  contentGap: tailwind("mt-3"),
  footer: tailwind("pt-4 pb-2"),
  ctaRow: tailwind(tokens.layout.rowCenter),
  ctaButtonPrimary: tailwind(tokens.layout.full),
  ctaButtonSecondary: tailwind(`${tokens.layout.full} mr-3`),

  // Welcome
  welcomeContent: tailwind(`${tokens.layout.full} pt-12 pb-4`),
  welcomeTextBlock: tailwind("mt-10"),
  welcomeSpacer: tailwind(tokens.layout.full),
  welcomeTitle: tailwind("text-4xl leading-tight text-center"),
  welcomeDescription: tailwind("mt-5 text-center text-base"),
  welcomeBottomMeta: tailwind("pb-6"),
  welcomeDotsRow: tailwind("flex-row justify-center items-center"),
  welcomeDot: tailwind("w-2 h-2 rounded-full bg-slate-300 border border-slate-400 mx-1"),
  welcomeDotActive: tailwind("bg-primary-500"),
  welcomeLoginText: tailwind("text-center mt-6"),

  // Group option card
  optionList: tailwind("mt-6"),
  optionCard: tailwind(
    "flex-row items-center justify-between rounded-md border border-border bg-white px-4 py-4 mb-3 shadow-sm"
  ),
  optionCardSelected: tailwind("border-primary-500 bg-primary-100"),
  optionTextBlock: tailwind("flex-1 pr-3"),
  optionTitle: tailwind("text-text-primary"),
  optionTitleSelected: tailwind("text-primary-500 font-semibold"),
  optionHelperText: tailwind("mt-1"),
  radioOuter: tailwind("h-6 w-6 rounded-full border-2 border-slate-300 items-center justify-center"),
  radioOuterSelected: tailwind("border-primary-500"),
  radioInner: tailwind("h-3 w-3 rounded-full bg-primary-500"),

  // Equipment
  locationGrid: {
    ...tailwind("flex-row justify-between mt-4 mb-6"),
  },
  locationCard: {
    ...tailwind("rounded-md border border-border bg-white items-center justify-center py-5 shadow-sm"),
    width: "48%" as const,
  },
  groupSubTitle: tailwind("mb-3"),
  equipmentGrid: {
    ...tailwind("flex-row flex-wrap justify-between"),
  },
  equipmentCard: {
    ...tailwind("rounded-md border border-border bg-white items-center justify-center py-3 mb-3 shadow-sm"),
    width: "48%" as const,
  },
  noticeBox: tailwind("mt-4 rounded-md border border-border bg-blue-100 px-4 py-3"),

  // Summary
  summaryScheduleSection: tailwind("mb-6"),
  summaryPlanTitle: tailwind("mb-4"),
  summaryPlanCard: tailwind("rounded-md border border-border bg-white px-4 py-3 mb-4"),
  summaryPlanRow: tailwind("py-2 border-b border-border"),
  summaryPlanTextBlock: tailwind("mb-2"),
  summaryPlanValue: tailwind("mt-1"),
  summaryEditBox: tailwind("mt-2 mb-2"),
  summaryEditOptionWrap: {
    ...tailwind("flex-row flex-wrap justify-between"),
  },
  summaryEditOption: {
    ...tailwind("rounded-md border border-border bg-white items-center justify-center py-3 mb-2"),
    width: "48%" as const,
  },
  summaryEditActionRow: tailwind("items-end mt-2"),

  // Completion
  completionContainer: tailwind(`${tokens.layout.full} items-center justify-center px-6`),
  completionTitle: tailwind("text-center text-4xl leading-tight"),
  completionDescription: tailwind("text-center mt-4"),
  completionCircleOuter: tailwind("w-28 h-28 rounded-full border-8 border-blue-200 items-center justify-center mt-10"),
  completionCircleInner: tailwind("w-20 h-20 rounded-full border-4 border-primary-500 items-center justify-center"),
  completionIconText: tailwind("text-xl"),
  completionCaption: tailwind("mt-8 italic"),
  completionBottomBlock: tailwind("w-full absolute bottom-14"),
  completionBottomLabel: tailwind("mb-2 text-caption"),
  completionProgressTrack: tailwind("w-full h-1 rounded-full bg-blue-100"),
  completionProgressFill: tailwind("h-1 rounded-full bg-primary-500 w-2/3"),
};
