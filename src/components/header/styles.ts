import { tailwind } from "@src/theme/tailwind";
import { tokens } from "@src/styles";

// 헤더 슬롯 정렬/폭을 토큰으로 관리한다.
export const styles = {
  leftSlot: tailwind(`${tokens.size.headerSlot} items-start`),
  rightSlot: tailwind(`${tokens.size.headerSlot} items-end`),
};
