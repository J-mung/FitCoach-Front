export type OnboardingGroupKey =
  | "goal"
  | "level"
  | "workouts_per_week"
  | "session_minutes"
  | "location"
  | "equipment";

export type OnboardingSelectionType = "single" | "multi";

export type OnboardingOptionItemDTO = {
  id: string;
  label: string;
  sortOrder: number;
};

export type OnboardingOptionGroupDTO = {
  key: OnboardingGroupKey;
  title: string;
  description: string;
  selectionType: OnboardingSelectionType;
  sortOrder: number;
  items: OnboardingOptionItemDTO[];
};

export type OnboardingOptionsResponseDTO = {
  groups: OnboardingOptionGroupDTO[];
};

// 온보딩 응답 저장/전송 DTO.
export type OnboardingAnswersDTO = {
  userId: string;
  answers: Record<string, string | string[] | null>;
  completedAt?: string;
};
