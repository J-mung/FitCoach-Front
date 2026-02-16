import type { OnboardingOptionGroup } from "@features/onboarding/api";

export type OnboardingFormState = {
  goalId: string | null;
  levelId: string | null;
  workoutsPerWeekId: string | null;
  sessionMinutesId: string | null;
  locationId: string | null;
  equipmentIds: string[];
};

export type StepConfig =
  | { type: "welcome" }
  | {
      type: "group";
      key:
        | "goal"
        | "level"
        | "workouts_per_week"
        | "session_minutes"
        | "location"
        | "equipment";
    }
  | { type: "summary" }
  | { type: "completion" };

export type GroupMap = Record<OnboardingOptionGroup["key"], OnboardingOptionGroup>;
