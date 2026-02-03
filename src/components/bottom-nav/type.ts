import type { PressableProps, ViewStyle } from "react-native";

export type BottomNavItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
};

export type BottomNavProps = {
  items: BottomNavItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  containerStyle?: ViewStyle;
} & Pick<PressableProps, "disabled">;
