import type { CardVariant } from "./type";

export const cardVariantClassMap: Record<CardVariant, string> = {
  default: "bg-bg-card border border-border",
  recommendation: "bg-primary-100",
};

export const cardBaseClass = "rounded-md p-16";
