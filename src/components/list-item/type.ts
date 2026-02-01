import type { PressableProps, ViewStyle } from "react-native";

export type ListItemProps = PressableProps & {
  title: string;
  description?: string;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
};
