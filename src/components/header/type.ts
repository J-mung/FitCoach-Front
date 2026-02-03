import type { ViewProps, ViewStyle } from "react-native";

export type HeaderProps = ViewProps & {
  title: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
};
