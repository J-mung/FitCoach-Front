import type { PressableProps } from "react-native";

export const BUTTON_VARIANTS = ["primary", "secondary", "ghost"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};
