import { useEffect, useState } from "react";
import { buildUpdateProfileDTO, mapProfileDtoToFormState } from "./mappers";
import type { ProfileFormState, UseProfileFormParams, UseProfileFormResult } from "./types";

const INITIAL_FORM_STATE: ProfileFormState = {
  heightCm: "",
  weightKg: "",
  trainingYears: "",
  onboardingAnswers: {},
};

export function useProfileForm({
  profile,
  onSave,
}: UseProfileFormParams): UseProfileFormResult {
  const [formState, setFormState] = useState<ProfileFormState>(INITIAL_FORM_STATE);
  const [saveStatus, setSaveStatus] = useState<UseProfileFormResult["saveStatus"]>("idle");
  // 저장 중이거나 사용자 식별값이 없으면 저장 버튼을 비활성화한다.
  const isSaveDisabled = saveStatus === "saving" || !profile?.userId;

  useEffect(() => {
    if (!profile) {
      return;
    }
    // 조회한 프로필이 변경되면 폼 상태를 동기화한다.
    setFormState(mapProfileDtoToFormState(profile));
  }, [profile]);

  const setHeightCm = (value: string) => {
    setFormState((prev) => ({ ...prev, heightCm: value }));
    // 입력 변경 시 이전 성공/실패 메시지를 초기 상태로 되돌린다.
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const setWeightKg = (value: string) => {
    setFormState((prev) => ({ ...prev, weightKg: value }));
    // 입력 변경 시 이전 성공/실패 메시지를 초기 상태로 되돌린다.
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const setTrainingYears = (value: string) => {
    setFormState((prev) => ({ ...prev, trainingYears: value }));
    // 입력 변경 시 이전 성공/실패 메시지를 초기 상태로 되돌린다.
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const setOnboardingSingle = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      onboardingAnswers: {
        ...prev.onboardingAnswers,
        [key]: value,
      },
    }));
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const toggleOnboardingMulti = (key: string, value: string) => {
    setFormState((prev) => {
      const current = prev.onboardingAnswers[key];
      const selected = Array.isArray(current) ? current : [];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      return {
        ...prev,
        onboardingAnswers: {
          ...prev.onboardingAnswers,
          [key]: next,
        },
      };
    });
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const handleSave = async () => {
    if (isSaveDisabled) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saving");
    try {
      // 저장 payload는 DTO mapper를 통해 일관된 형태로 생성한다.
      const payload = buildUpdateProfileDTO({
        userId: profile.userId,
        formState,
      });
      await onSave(payload);
      setSaveStatus("success");
    } catch {
      setSaveStatus("error");
    }
  };

  return {
    formState,
    saveStatus,
    isSaveDisabled,
    setHeightCm,
    setWeightKg,
    setTrainingYears,
    setOnboardingSingle,
    toggleOnboardingMulti,
    handleSave,
  };
}
