import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "@shared/api";
import { useMockApi } from "@shared/lib";
import type { CreateWorkoutSessionDTO, WorkoutSessionDTO } from "./dto";
import { normalizeWorkoutSession } from "./mappers";
import { ACTIVE_WORKOUT_SESSION_QUERY_KEY } from "./constants";

const createWorkoutSession = async (
  payload: CreateWorkoutSessionDTO
): Promise<WorkoutSessionDTO> => {
  const data = await fetchJson<WorkoutSessionDTO>("/workout/sessions", {
    method: "POST",
    body: payload,
  });
  return normalizeWorkoutSession(data);
};

const createMockWorkoutSession = async (
  payload: CreateWorkoutSessionDTO
): Promise<WorkoutSessionDTO> => {
  const mock = require("./session.mock.json") as WorkoutSessionDTO;
  return normalizeWorkoutSession({
    ...mock,
    id: `session_mock_${Date.now()}`,
    userId: payload.userId,
    templateId: payload.templateId ?? null,
    startedAt: new Date().toISOString(),
    endedAt: null,
    status: "started",
    totalVolume: null,
  });
};

export function useCreateWorkoutSession() {
  const useMock = useMockApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateWorkoutSessionDTO) => {
      if (useMock) {
        return createMockWorkoutSession(payload);
      }
      try {
        return await createWorkoutSession(payload);
      } catch {
        return createMockWorkoutSession(payload);
      }
    },
    onSuccess: (session) => {
      // 시작된 세션을 활성 세션 캐시에 반영한다.
      queryClient.setQueryData(ACTIVE_WORKOUT_SESSION_QUERY_KEY, session);
    },
  });
}
