import type { OnboardingOptionGroup } from "@features/onboarding/api";

export type OnboardingAnswerValue = string | string[] | null;

export type OnboardingFormState = Record<string, OnboardingAnswerValue>;

export type StepConfig =
  | { type: "welcome" }
  | { type: "group"; key: string }
  | { type: "summary" }
  | { type: "completion" };

export type GroupMap = Record<OnboardingOptionGroup["key"], OnboardingOptionGroup>;
