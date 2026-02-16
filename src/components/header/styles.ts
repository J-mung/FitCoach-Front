import { tailwind } from "@shared/theme/tailwind";
import { tokens } from "@shared/styles";

// 헤더 슬롯 정렬/폭을 토큰으로 관리한다.
export const styles = {
  leftSlot: tailwind(`${tokens.size.headerSlot} items-start`),
  rightSlot: tailwind(`${tokens.size.headerSlot} items-end`),
};
