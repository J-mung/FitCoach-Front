import type { UserProfileDTO } from "@features/profile/api";

export type CoachResponse = {
  intent: string;
  recommendedPlan: string;
  reasoning: string;
  cautions: string;
  followupQuestion: string;
};

const resolveGoalText = (profile: UserProfileDTO | undefined) => {
  const goal = profile?.onboardingAnswers.goal;
  if (goal === "goal_cut") return "체지방 감량";
  if (goal === "goal_strength") return "근력 향상";
  if (goal === "goal_maintain") return "유지";
  return "근비대";
};

// AI 코치 응답 카드의 MVP 포맷(intent/reasoning/cautions/follow-up)을 생성한다.
export const buildMockCoachResponse = (
  question: string,
  profile: UserProfileDTO | undefined
): CoachResponse => {
  const goalText = resolveGoalText(profile);
  const normalizedQuestion = question.trim();
  if (normalizedQuestion.length === 0) {
    return {
      intent: "질문 입력 필요",
      recommendedPlan: "질문을 입력하면 루틴 조정안을 제안해요.",
      reasoning: "현재 목표와 운동 수준을 기준으로 답변을 구성합니다.",
      cautions: "통증, 부상, 어지러움이 있다면 운동을 중단하고 전문가 상담이 필요합니다.",
      followupQuestion: "오늘 컨디션(좋음/보통/나쁨)은 어떤가요?",
    };
  }
  return {
    intent: "루틴 조정 제안",
    recommendedPlan: `${goalText} 목표 기준으로 오늘 루틴 강도를 10~15% 조절해보세요.`,
    reasoning: `입력한 질문("${normalizedQuestion}")과 최근 설정값(목표/수준)을 함께 반영했습니다.`,
    cautions: "통증이 지속되면 강도를 낮추고, 의료적 판단이 필요한 경우 전문의에게 상담하세요.",
    followupQuestion: "세트당 목표 반복 수를 유지하기 어려웠나요?",
  };
};
