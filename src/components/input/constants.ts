import type { InputVariant } from "./type";

export const inputBaseClass =
  "bg-bg-card border rounded-md px-12 py-10 text-body-md";

export const inputVariantClassMap: Record<InputVariant, string> = {
  default: "border-border",
  error: "border-primary-500",
};

export const inputLabelClass = "font-sans text-body-sm text-text-secondary mb-6";
export const inputHelperClass = "font-sans text-caption text-text-secondary mt-6";
export const inputErrorHelperClass = "font-sans text-caption text-primary-500 mt-6";
