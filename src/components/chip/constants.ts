import type { ChipVariant } from "./type";
import {
  chipContainerClass,
  chipDefaultClass,
  chipDefaultTextClass,
  chipSelectedClass,
  chipSelectedTextClass,
} from "./styles";

export const chipBaseClass = chipContainerClass;

export const chipVariantClassMap: Record<ChipVariant, string> = {
  default: chipDefaultClass,
  selected: chipSelectedClass,
};

export const chipTextClassMap: Record<ChipVariant, string> = {
  default: chipDefaultTextClass,
  selected: chipSelectedTextClass,
};
