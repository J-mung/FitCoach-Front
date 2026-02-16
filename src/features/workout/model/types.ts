import type {
  WorkoutTemplateDTO,
  WorkoutTemplateExerciseDTO,
  WorkoutSessionDTO,
} from "@features/workout/api";

export type WorkoutTemplateCard = {
  id: string;
  title: string;
  subtitle: string;
  exerciseCount: number;
};

export type WorkoutSessionView = {
  id: string;
  statusLabel: string;
  startedAtLabel: string;
  templateId: string | null;
};

export type BuildCreateSessionParams = {
  userId: string;
  template: WorkoutTemplateDTO | null;
};

export type WorkoutTemplateInput = WorkoutTemplateDTO;
export type WorkoutTemplateExerciseInput = WorkoutTemplateExerciseDTO;
export type WorkoutSessionInput = WorkoutSessionDTO;
