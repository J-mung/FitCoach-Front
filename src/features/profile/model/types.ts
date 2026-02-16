import type { UpdateUserProfileDTO } from "@features/profile/api";

export type ProfileFormState = {
  heightCm: string;
  weightKg: string;
  trainingYears: string;
};

export type ProfileSummaryItem = {
  label: string;
  value: string;
};

export type ProfileSummary = {
  items: ProfileSummaryItem[];
};

export type BuildUpdateProfileParams = {
  userId: string;
  formState: ProfileFormState;
};

export type BuildUpdateProfileResult = UpdateUserProfileDTO;
