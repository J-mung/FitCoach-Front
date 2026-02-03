import type { EdgeInsets } from "react-native-safe-area-context";

export const tabBarLabelStyle = { fontSize: 11 } as const;

export function getTabBarStyle(insets: EdgeInsets) {
  return {
    height: 49 + insets.bottom,
    paddingBottom: insets.bottom,
  } as const;
}
