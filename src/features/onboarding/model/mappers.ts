import type { OnboardingOptionGroup } from "@features/onboarding/api";
import type { GroupMap, OnboardingFormState, StepConfig } from "./types";

// 단계 진입 가능 여부를 계산한다.
export const canProceedStep = (
  step: StepConfig,
  group: OnboardingOptionGroup | null,
  formState: OnboardingFormState
) => {
  if (step.type === "welcome" || step.type === "summary" || step.type === "completion") {
    return true;
  }
  if (!group) {
    return false;
  }
  const value = formState[group.key];
  if (group.selectionType === "multi") {
    return Array.isArray(value) && value.length > 0;
  }
  return typeof value === "string" && value.length > 0;
};

// 단일 선택 상태를 갱신한다.
export const mapSelectSingle = (
  formState: OnboardingFormState,
  key: string,
  value: string
): OnboardingFormState => ({
  ...formState,
  [key]: value,
});

// 다중 선택 상태를 통째로 갱신한다.
export const mapSetMulti = (
  formState: OnboardingFormState,
  key: string,
  values: string[]
): OnboardingFormState => ({
  ...formState,
  [key]: values,
});

// 다중 선택 항목을 토글한다.
export const mapToggleMulti = (
  formState: OnboardingFormState,
  key: string,
  value: string
): OnboardingFormState => {
  const current = formState[key];
  const selected = Array.isArray(current) ? current : [];
  const isSelected = selected.includes(value);
  return {
    ...formState,
    [key]: isSelected ? selected.filter((item) => item !== value) : [...selected, value],
  };
};

// 그룹 배열을 빠른 조회용 맵으로 변환한다.
export const mapGroupMap = (groups: OnboardingOptionGroup[]): GroupMap =>
  groups.reduce<GroupMap>((acc, group) => {
    acc[group.key] = group;
    return acc;
  }, {} as GroupMap);
