import type { UserProfileDTO } from "./dto";

const normalizeNullableNumber = (value: unknown): number | null => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }
  return value;
};

// API/Mock 응답을 동일한 형태로 정규화한다.
export const normalizeUserProfile = (data: UserProfileDTO): UserProfileDTO => ({
  userId: data.userId,
  heightCm: normalizeNullableNumber(data.heightCm),
  weightKg: normalizeNullableNumber(data.weightKg),
  trainingYears: normalizeNullableNumber(data.trainingYears),
  updatedAt: data.updatedAt,
});
