import { useMemo, useState } from "react";
import type { OnboardingOptionsResponse } from "@features/onboarding/api";
import type { GroupMap, OnboardingFormState } from "./types";
import {
  buildStepFlow,
  DEFAULT_GROUP_KEYS,
  SUMMARY_PRIMARY_GROUP_KEY,
  TOTAL_STEPS,
} from "./constants";
import {
  canProceedStep,
  mapGroupMap,
  mapSelectSingle,
  mapSetMulti,
  mapToggleMulti,
} from "./mappers";

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
  const [formState, setFormState] = useState<OnboardingFormState>({});

  // 데이터 로드 전에는 기본 단계 정보를 가드한다.
  const groups = data?.groups ?? [];
  const groupKeys = groups.length > 0 ? groups.map((group) => group.key) : DEFAULT_GROUP_KEYS;
  const stepFlow = buildStepFlow(groupKeys);
  const totalSteps = stepFlow.length || TOTAL_STEPS;
  const activeStep = stepFlow[step] ?? stepFlow[0];
  const activeGroup =
    activeStep.type === "group"
      ? groups.find((group) => group.key === activeStep.key) ?? null
      : null;

  // CTA 상태 계산.
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  // 필수 입력이 없으면 다음/완료 버튼을 비활성화한다.
  const canProceed = canProceedStep(activeStep, activeGroup, formState);
  // 요약 단계에서는 주간 운동 횟수 선택 완료 여부를 함께 확인한다.
  const canProceedSummary =
    activeStep.type !== "summary"
      ? true
      : typeof formState[SUMMARY_PRIMARY_GROUP_KEY] === "string";
  // 로딩/에러 상태에서는 진행 버튼을 비활성화한다.
  const isCtaDisabled = isLoading || isError || !canProceed || !canProceedSummary;

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
  const handleSelectSingle = (key: string, value: string) => {
    setFormState((prev) => mapSelectSingle(prev, key, value));
  };

  const handleSetMulti = (key: string, values: string[]) => {
    setFormState((prev) => mapSetMulti(prev, key, values));
  };

  const handleToggleMulti = (key: string, value: string) => {
    setFormState((prev) => mapToggleMulti(prev, key, value));
  };

  const groupMap = useMemo<GroupMap | null>(() => {
    if (!data) {
      return null;
    }
    return mapGroupMap(data.groups);
  }, [data]);

  return {
    step,
    setStep,
    formState,
    totalSteps,
    activeStep,
    activeGroup,
    groupMap,
    groups,
    isFirstStep,
    isLastStep,
    isCtaDisabled,
    handleNext,
    handlePrev,
    handleSelectSingle,
    handleSetMulti,
    handleToggleMulti,
  };
}
