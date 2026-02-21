import type { TextInputProps } from "react-native";

export const INPUT_VARIANTS = [
  "default",
  "focused",
  "error",
  "disabled",
  "filled",
] as const;
export type InputVariant = (typeof INPUT_VARIANTS)[number];

export type InputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  variant?: InputVariant;
};
