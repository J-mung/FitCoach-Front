import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@shared/api";
import { useMockApi } from "@shared/lib";
import type { WorkoutTemplatesResponseDTO } from "./dto";
import { normalizeWorkoutTemplates } from "./mappers";

export const WORKOUT_TEMPLATES_QUERY_KEY = ["workout-templates", "v1"] as const;

const fetchMockWorkoutTemplates = async (): Promise<WorkoutTemplatesResponseDTO> => {
  const data = require("./workoutTemplates.mock.json") as WorkoutTemplatesResponseDTO;
  return normalizeWorkoutTemplates(data);
};

const fetchWorkoutTemplates = async (): Promise<WorkoutTemplatesResponseDTO> => {
  const data = await fetchJson<WorkoutTemplatesResponseDTO>("/workout/templates");
  return normalizeWorkoutTemplates(data);
};

export function useWorkoutTemplates() {
  const useMock = useMockApi();

  return useQuery({
    queryKey: WORKOUT_TEMPLATES_QUERY_KEY,
    queryFn: async () => {
      if (useMock) {
        return fetchMockWorkoutTemplates();
      }
      try {
        return await fetchWorkoutTemplates();
      } catch {
        return fetchMockWorkoutTemplates();
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
