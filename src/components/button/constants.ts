import type { ButtonSize, ButtonVariant } from "./type";

export const buttonBaseClass = "items-center justify-center rounded-md";

export const buttonSizeClassMap: Record<ButtonSize, string> = {
  md: "py-12",
  lg: "py-16",
};

export const buttonVariantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-primary-500",
  secondary: "bg-bg-card border border-border",
  ghost: "bg-transparent",
};

export const buttonTextClassMap: Record<ButtonVariant, string> = {
  primary: "text-bg-card",
  secondary: "text-primary-500",
  ghost: "text-primary-500",
};
