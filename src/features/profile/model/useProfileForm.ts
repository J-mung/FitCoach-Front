import { useEffect, useState } from "react";
import { buildUpdateProfileDTO, mapProfileDtoToFormState } from "./mappers";
import type { ProfileFormState, UseProfileFormParams, UseProfileFormResult } from "./types";

const STATUS_VIEW_MAP = {
  idle: {
    visible: false,
    message: "",
    tone: "secondary",
  },
  saving: {
    visible: true,
    message: "저장 중입니다.",
    tone: "secondary",
  },
  success: {
    visible: true,
    message: "프로필이 저장되었습니다.",
    tone: "primary",
  },
  error: {
    visible: true,
    message: "프로필 저장에 실패했습니다.",
    tone: "secondary",
  },
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
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const setWeightKg = (value: string) => {
    setFormState((prev) => ({ ...prev, weightKg: value }));
    if (saveStatus !== "saving") {
      setSaveStatus("idle");
    }
  };

  const setTrainingYears = (value: string) => {
    setFormState((prev) => ({ ...prev, trainingYears: value }));
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
    statusView: STATUS_VIEW_MAP[saveStatus],
    setHeightCm,
    setWeightKg,
    setTrainingYears,
    handleSave,
  };
}
