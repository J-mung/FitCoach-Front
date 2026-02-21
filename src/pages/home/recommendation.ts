import type { UserProfileDTO } from "@features/profile/api";
import type { WorkoutTemplateDTO } from "@features/workout/api";

type RecommendationResult = {
  template: WorkoutTemplateDTO | null;
  reasons: string[];
};

const MAX_REASON_COUNT = 3;

const resolveMatchScore = (
  template: WorkoutTemplateDTO,
  profile: UserProfileDTO | undefined
) => {
  if (!profile) {
    return 0;
  }
  const goal = profile.onboardingAnswers.goal;
  const level = profile.onboardingAnswers.level;
  let score = 0;
  if (typeof goal === "string" && template.goalKey === goal) {
    score += 2;
  }
  if (typeof level === "string" && template.levelKey === level) {
    score += 1;
  }
  return score;
};

// 프로필 목표/레벨에 맞는 템플릿을 우선 추천한다.
export const selectRecommendedTemplate = (
  templates: WorkoutTemplateDTO[] | undefined,
  profile: UserProfileDTO | undefined
): WorkoutTemplateDTO | null => {
  if (!templates || templates.length === 0) {
    return null;
  }
  const sortedByScore = [...templates].sort(
    (a, b) => resolveMatchScore(b, profile) - resolveMatchScore(a, profile)
  );
  return sortedByScore[0] ?? null;
};

// 추천 카드에 노출할 간단한 근거 문구를 생성한다.
export const buildRecommendationReasons = (
  template: WorkoutTemplateDTO | null,
  profile: UserProfileDTO | undefined
) => {
  if (!template) {
    return ["추천 가능한 루틴이 아직 없습니다."];
  }
  const reasons: string[] = [];
  const goal = profile?.onboardingAnswers.goal;
  const level = profile?.onboardingAnswers.level;
  const location = profile?.onboardingAnswers.location;
  if (typeof goal === "string" && goal === template.goalKey) {
    reasons.push("설정한 운동 목표와 일치하는 루틴입니다.");
  }
  if (typeof level === "string" && level === template.levelKey) {
    reasons.push("현재 운동 수준에 맞는 난이도로 구성했습니다.");
  }
  if (typeof location === "string") {
    reasons.push("선택한 운동 환경을 고려해 장비 사용량을 조정했습니다.");
  }
  if (reasons.length === 0) {
    reasons.push("최근 입력한 프로필 정보를 기준으로 기본 루틴을 제안합니다.");
  }
  return reasons.slice(0, MAX_REASON_COUNT);
};

export const buildHomeRecommendation = (
  templates: WorkoutTemplateDTO[] | undefined,
  profile: UserProfileDTO | undefined
): RecommendationResult => {
  const template = selectRecommendedTemplate(templates, profile);
  return {
    template,
    reasons: buildRecommendationReasons(template, profile),
  };
};
