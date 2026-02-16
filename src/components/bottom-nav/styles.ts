import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles/index";

// 하단 네비게이션 스타일: 눌림/아이콘 간격을 관리한다.
export const styles = {
  itemPressed: tailwind(tokens.opacity.pressed),
  iconSpacing: tailwind(tokens.spacing.bottomNavIconGap),
};
