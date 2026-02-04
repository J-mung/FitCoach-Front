import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 리스트 아이템 스타일: 컨테이너/타이포/간격을 분리한다.
export const styles = {
  container: tailwind(
    `${tokens.layout.rowBetween} ${tokens.color.card} ${tokens.border.bottom} ${tokens.color.border} ${tokens.spacing.listItemPaddingX} ${tokens.spacing.listItemPaddingY}`
  ),
  content: tailwind(tokens.layout.full),
  title: tailwind(
    `${tokens.typography.fontBase} ${tokens.typography.bodyMd} ${tokens.color.textPrimary}`
  ),
  description: tailwind(
    `${tokens.typography.fontBase} ${tokens.typography.bodySm} ${tokens.color.textSecondary} ${tokens.spacing.listItemDescTop}`
  ),
  rightSpacing: tailwind(tokens.spacing.listItemRightGap),
};
