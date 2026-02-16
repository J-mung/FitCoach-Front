import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 프로필 화면 입력/저장 섹션 스타일.
export const styles = {
  subtitle: tailwind(tokens.spacing.contentGap),
  formGap: tailwind(tokens.spacing.sectionGap),
  fieldGap: tailwind(tokens.spacing.contentGap),
  saveButtonWrap: tailwind(tokens.spacing.sectionGap),
  statusText: tailwind(tokens.spacing.contentGap),
};
