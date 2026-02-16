export type WorkoutTemplateExerciseDTO = {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  restSec: number;
};

export type WorkoutTemplateDTO = {
  id: string;
  name: string;
  goalKey: string;
  levelKey: string;
  exercises: WorkoutTemplateExerciseDTO[];
};

export type WorkoutTemplatesResponseDTO = {
  templates: WorkoutTemplateDTO[];
};
