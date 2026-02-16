export type WorkoutSessionStatus = "started" | "finished";

export type WorkoutSessionDTO = {
  id: string;
  userId: string;
  templateId: string | null;
  startedAt: string;
  endedAt: string | null;
  status: WorkoutSessionStatus;
  totalVolume: number | null;
};

export type CreateWorkoutSessionDTO = {
  userId: string;
  templateId?: string | null;
};

export type FinishWorkoutSessionDTO = {
  sessionId: string;
  durationSec: number;
  totalVolume: number;
};

export type WorkoutSessionSummaryDTO = {
  sessionId: string;
  durationSec: number;
  totalVolume: number;
  prCount: number;
};
