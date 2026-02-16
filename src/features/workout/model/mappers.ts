import type { CreateWorkoutSessionDTO } from "@features/workout/api";
import type {
  BuildCreateSessionParams,
  WorkoutSessionInput,
  WorkoutSessionView,
  WorkoutTemplateInput,
  WorkoutTemplateCard,
} from "./types";

// 템플릿 DTO를 카드 표시 모델로 변환한다.
export const mapTemplateToCard = (template: WorkoutTemplateInput): WorkoutTemplateCard => ({
  id: template.id,
  title: template.name,
  subtitle: `${template.goalKey} · ${template.levelKey}`,
  exerciseCount: template.exercises.length,
});

// 세션 DTO를 화면 표시 모델로 변환한다.
export const mapSessionToView = (session: WorkoutSessionInput): WorkoutSessionView => ({
  id: session.id,
  statusLabel: session.status === "finished" ? "종료됨" : "진행 중",
  startedAtLabel: new Date(session.startedAt).toLocaleString(),
  templateId: session.templateId,
});

// 템플릿 선택 결과를 세션 생성 요청 DTO로 변환한다.
export const buildCreateSessionDTO = ({
  userId,
  template,
}: BuildCreateSessionParams): CreateWorkoutSessionDTO => ({
  userId,
  templateId: template?.id ?? null,
});
