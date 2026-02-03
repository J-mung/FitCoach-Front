import type { ButtonSize, ButtonVariant } from "./type";
import {
  buttonContainerBaseClass,
  buttonGhostClass,
  buttonGhostTextClass,
  buttonPrimaryClass,
  buttonPrimaryTextClass,
  buttonSecondaryClass,
  buttonSecondaryTextClass,
  buttonSizeLgClass,
  buttonSizeMdClass,
} from "./styles";

export const buttonBaseClass = buttonContainerBaseClass;

export const buttonSizeClassMap: Record<ButtonSize, string> = {
  md: buttonSizeMdClass,
  lg: buttonSizeLgClass,
};

export const buttonVariantClassMap: Record<ButtonVariant, string> = {
  primary: buttonPrimaryClass,
  secondary: buttonSecondaryClass,
  ghost: buttonGhostClass,
};

export const buttonTextClassMap: Record<ButtonVariant, string> = {
  primary: buttonPrimaryTextClass,
  secondary: buttonSecondaryTextClass,
  ghost: buttonGhostTextClass,
};
