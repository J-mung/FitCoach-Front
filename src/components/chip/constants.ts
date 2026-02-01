import type { ChipVariant } from "./type";

export const chipBaseClass = "rounded-full px-12 py-6";

export const chipVariantClassMap: Record<ChipVariant, string> = {
  default: "bg-bg-card border border-border",
  selected: "bg-primary-100 border border-primary-500",
};

export const chipTextClassMap: Record<ChipVariant, string> = {
  default: "text-text-secondary",
  selected: "text-primary-500 font-semibold",
};
