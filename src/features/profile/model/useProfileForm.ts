import { useEffect, useState } from "react";
import { buildUpdateProfileDTO, mapProfileDtoToFormState } from "./mappers";
import type { ProfileFormState, UseProfileFormParams, UseProfileFormResult } from "./types";

const SAVE_MESSAGE_MAP = {
  idle: null,
  saving: "저장 중입니다.",
  success: "프로필이 저장되었습니다.",
  error: "프로필 저장에 실패했습니다.",
} as const;

const INITIAL_FORM_STATE: ProfileFormState = {
  heightCm: "",
  weightKg: "",
  trainingYears: "",
};

export function useProfileForm({
  profile,
  onSave,
}: UseProfileFormParams): UseProfileFormResult {
  const [formState, setFormState] = useState<ProfileFormState>(INITIAL_FORM_STATE);
  const [saveStatus, setSaveStatus] = useState<UseProfileFormResult["saveStatus"]>("idle");

  useEffect(() => {
    if (!profile) {
      return;
    }
    // 조회한 프로필이 변경되면 폼 상태를 동기화한다.
    setFormState(mapProfileDtoToFormState(profile));
  }, [profile]);

  const setHeightCm = (value: string) => {
    setFormState((prev) => ({ ...prev, heightCm: value }));
  };

  const setWeightKg = (value: string) => {
    setFormState((prev) => ({ ...prev, weightKg: value }));
  };

  const setTrainingYears = (value: string) => {
    setFormState((prev) => ({ ...prev, trainingYears: value }));
  };

  const handleSave = async () => {
    if (!profile?.userId) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saving");
    try {
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
    saveMessage: SAVE_MESSAGE_MAP[saveStatus],
    setHeightCm,
    setWeightKg,
    setTrainingYears,
    handleSave,
  };
}
