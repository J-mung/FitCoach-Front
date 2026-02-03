import type { InputVariant } from "./type";
import {
  inputContainerClass,
  inputDefaultBorderClass,
  inputErrorBorderClass,
  inputErrorHelperClass,
  inputHelperClass,
  inputLabelClass,
} from "./styles";

export const inputBaseClass = inputContainerClass;

export const inputVariantClassMap: Record<InputVariant, string> = {
  default: inputDefaultBorderClass,
  error: inputErrorBorderClass,
};

export { inputLabelClass, inputHelperClass, inputErrorHelperClass };
