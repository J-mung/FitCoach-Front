import type { OnboardingOptionGroup } from "@src/queries";

export type OnboardingFormState = {
  goalId: string | null;
  experienceId: string | null;
  equipmentId: string | null;
  focusAreaIds: string[];
};

export type StepConfig =
  | { type: "welcome" }
  | { type: "group"; key: "goal" | "experience" | "equipment" | "focus_area" }
  | { type: "summary" }
  | { type: "completion" };

export type GroupMap = Record<OnboardingOptionGroup["key"], OnboardingOptionGroup>;
