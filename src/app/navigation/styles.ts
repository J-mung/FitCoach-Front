import type { EdgeInsets } from "react-native-safe-area-context";

export const tabBarLabelStyle = { fontSize: 12 } as const;

export function getTabBarStyle(insets: EdgeInsets) {
  // 홈 인디케이터 영역만큼 패딩을 확보해 탭 바가 잘리지 않도록 한다.
  return {
    height: 49 + insets.bottom,
    paddingBottom: insets.bottom,
  } as const;
}
