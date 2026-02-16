import { useMemo, useState } from "react";
import type { OnboardingOptionsResponse } from "@features/onboarding/api";
import type { GroupMap, OnboardingFormState } from "./types";
import { STEP_FLOW, TOTAL_STEPS } from "./constants";

type UseOnboardingFlowParams = {
  data?: OnboardingOptionsResponse;
  isLoading: boolean;
  isError: boolean;
  onComplete: () => void;
};

export function useOnboardingFlow({
  data,
  isLoading,
  isError,
  onComplete,
}: UseOnboardingFlowParams) {
  // 온보딩 진행 단계와 입력 상태.
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<OnboardingFormState>({
    goalId: null,
    experienceId: null,
    equipmentId: null,
    focusAreaIds: [],
  });

  // 데이터 로드 전에는 기본 단계 정보를 가드한다.
  const groups = data?.groups ?? [];
  const totalSteps = STEP_FLOW.length || TOTAL_STEPS;
  const activeStep = STEP_FLOW[step] ?? STEP_FLOW[0];
  const activeGroup =
    activeStep.type === "group" ? groups.find((group) => group.key === activeStep.key) : null;

  // CTA 상태 계산.
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  // 필수 입력이 없으면 다음/완료 버튼을 비활성화한다.
  const canProceed =
    activeStep.type === "welcome" ||
    (activeStep.type === "group" &&
      activeGroup &&
      ((activeStep.key === "goal" && !!formState.goalId) ||
        (activeStep.key === "experience" && !!formState.experienceId) ||
        (activeStep.key === "equipment" && !!formState.equipmentId) ||
        (activeStep.key === "focus_area" && formState.focusAreaIds.length > 0))) ||
    activeStep.type === "summary" ||
    activeStep.type === "completion";
  // 로딩/에러 상태에서는 진행 버튼을 비활성화한다.
  const isCtaDisabled = isLoading || isError || !canProceed;

  // 다음 단계로 이동하거나 마지막 단계에서 완료 처리한다.
  const handleNext = () => {
    if (isLoading || isError || !canProceed) {
      return;
    }
    if (isLastStep) {
      onComplete();
      return;
    }
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  // 이전 단계로 이동한다.
  const handlePrev = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  // 선택 상태 업데이트 유틸(단일/복수 선택).
  const handleSelectGoal = (value: string) => {
    setFormState((prev) => ({ ...prev, goalId: value }));
  };

  const handleSelectExperience = (value: string) => {
    setFormState((prev) => ({ ...prev, experienceId: value }));
  };

  const handleSelectEquipment = (value: string) => {
    setFormState((prev) => ({ ...prev, equipmentId: value }));
  };

  const handleToggleFocus = (value: string) => {
    setFormState((prev) => {
      // 집중 부위는 복수 선택을 허용한다.
      const isSelected = prev.focusAreaIds.includes(value);
      return {
        ...prev,
        focusAreaIds: isSelected
          ? prev.focusAreaIds.filter((item) => item !== value)
          : [...prev.focusAreaIds, value],
      };
    });
  };

  const groupMap = useMemo<GroupMap | null>(() => {
    if (!data) {
      return null;
    }
    return data.groups.reduce<GroupMap>((acc, group) => {
      acc[group.key] = group;
      return acc;
    }, {} as GroupMap);
  }, [data]);

  return {
    step,
    setStep,
    formState,
    totalSteps,
    activeStep,
    activeGroup,
    groupMap,
    isFirstStep,
    isLastStep,
    isCtaDisabled,
    handleNext,
    handlePrev,
    handleSelectGoal,
    handleSelectExperience,
    handleSelectEquipment,
    handleToggleFocus,
  };
}
