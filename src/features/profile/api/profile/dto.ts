export type UserProfileDTO = {
  userId: string;
  heightCm: number | null;
  weightKg: number | null;
  trainingYears: number | null;
  onboardingAnswers: Record<string, string | string[] | null>;
  updatedAt: string;
};

export type UpdateUserProfileDTO = {
  userId: string;
  heightCm?: number | null;
  weightKg?: number | null;
  trainingYears?: number | null;
  onboardingAnswers?: Record<string, string | string[] | null>;
};
