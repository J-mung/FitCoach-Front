import type { UpdateUserProfileDTO } from "@features/profile/api";
import type { UserProfileDTO } from "@features/profile/api";

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

export type ProfileSaveStatus = "idle" | "saving" | "success" | "error";

export type ProfileStatusView = {
  visible: boolean;
  message: string;
  tone: "primary" | "secondary" | "disabled";
};

export type UseProfileFormParams = {
  profile: UserProfileDTO | undefined;
  onSave: (payload: UpdateUserProfileDTO) => Promise<void>;
};

export type UseProfileFormResult = {
  formState: ProfileFormState;
  saveStatus: ProfileSaveStatus;
  isSaveDisabled: boolean;
  statusView: ProfileStatusView;
  setHeightCm: (value: string) => void;
  setWeightKg: (value: string) => void;
  setTrainingYears: (value: string) => void;
  handleSave: () => Promise<void>;
};
