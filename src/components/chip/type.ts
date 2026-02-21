import type { PressableProps } from "react-native";

export const CHIP_VARIANTS = ["default", "selected", "disabled"] as const;
export type ChipVariant = (typeof CHIP_VARIANTS)[number];

export type ChipProps = PressableProps & {
  label: string;
  variant?: ChipVariant;
};
