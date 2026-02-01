import type { ViewProps } from "react-native";

export const CARD_VARIANTS = ["default", "recommendation"] as const;
export type CardVariant = (typeof CARD_VARIANTS)[number];

export type CardProps = ViewProps & {
  variant?: CardVariant;
};
