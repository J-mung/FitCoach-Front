import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 프로필 화면 입력/저장 섹션 스타일.
export const styles = {
  scroll: tailwind(tokens.layout.full),
  subtitle: tailwind(tokens.spacing.contentGap),
  formGap: tailwind(tokens.spacing.sectionGap),
  fieldGap: tailwind(tokens.spacing.contentGap),
  sectionTitle: tailwind(tokens.spacing.contentGap),
  optionSection: tailwind(tokens.spacing.sectionGap),
  optionDescription: tailwind(tokens.spacing.contentGap),
  choiceWrap: tailwind(`${tokens.layout.rowCenter} flex-wrap ${tokens.spacing.choiceTop}`),
  chipItem: tailwind(tokens.spacing.chipGap),
  saveButtonWrap: tailwind(tokens.spacing.sectionGap),
};
