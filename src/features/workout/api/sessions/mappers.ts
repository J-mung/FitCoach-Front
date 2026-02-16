import type {
  WorkoutSessionDTO,
  WorkoutSessionSummaryDTO,
  WorkoutSessionStatus,
} from "./dto";

const normalizeStatus = (status: string): WorkoutSessionStatus =>
  status === "finished" ? "finished" : "started";

// 세션 DTO를 앱 내부 표준 형태로 정규화한다.
export const normalizeWorkoutSession = (session: WorkoutSessionDTO): WorkoutSessionDTO => ({
  ...session,
  status: normalizeStatus(session.status),
});

// 세션 요약 DTO를 정규화한다.
export const normalizeWorkoutSessionSummary = (
  summary: WorkoutSessionSummaryDTO
): WorkoutSessionSummaryDTO => ({
  ...summary,
  durationSec: Number(summary.durationSec),
  totalVolume: Number(summary.totalVolume),
  prCount: Number(summary.prCount),
});
