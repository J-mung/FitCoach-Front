import type { UserProfileDTO } from "@features/profile/api";
import type {
  BuildUpdateProfileParams,
  BuildUpdateProfileResult,
  ProfileFormState,
  ProfileSummary,
} from "./types";

const normalizeNumberInput = (value: string): number | null => {
  if (!value.trim()) {
    return null;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
};

// DTO를 입력 폼 상태로 변환한다.
export const mapProfileDtoToFormState = (profile: UserProfileDTO): ProfileFormState => ({
  heightCm: profile.heightCm ? String(profile.heightCm) : "",
  weightKg: profile.weightKg ? String(profile.weightKg) : "",
  trainingYears: profile.trainingYears ? String(profile.trainingYears) : "",
});

// DTO를 화면 표시용 요약으로 변환한다.
export const mapProfileDtoToSummary = (profile: UserProfileDTO): ProfileSummary => ({
  items: [
    {
      label: "키",
      value: profile.heightCm ? `${profile.heightCm} cm` : "미설정",
    },
    {
      label: "체중",
      value: profile.weightKg ? `${profile.weightKg} kg` : "미설정",
    },
    {
      label: "운동 경력",
      value: profile.trainingYears ? `${profile.trainingYears}년` : "미설정",
    },
  ],
});

// 폼 상태를 API 업데이트 DTO로 변환한다.
export const buildUpdateProfileDTO = ({
  userId,
  formState,
}: BuildUpdateProfileParams): BuildUpdateProfileResult => ({
  userId,
  heightCm: normalizeNumberInput(formState.heightCm),
  weightKg: normalizeNumberInput(formState.weightKg),
  trainingYears: normalizeNumberInput(formState.trainingYears),
});
