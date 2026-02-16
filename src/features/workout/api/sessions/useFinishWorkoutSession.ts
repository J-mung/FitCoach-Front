import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "@shared/api";
import { useMockApi } from "@shared/lib";
import type { FinishWorkoutSessionDTO, WorkoutSessionSummaryDTO } from "./dto";
import { normalizeWorkoutSessionSummary } from "./mappers";
import { ACTIVE_WORKOUT_SESSION_QUERY_KEY } from "./constants";

const finishWorkoutSession = async (
  payload: FinishWorkoutSessionDTO
): Promise<WorkoutSessionSummaryDTO> => {
  const data = await fetchJson<WorkoutSessionSummaryDTO>(
    `/workout/sessions/${payload.sessionId}/finish`,
    {
      method: "PATCH",
      body: payload,
    }
  );
  return normalizeWorkoutSessionSummary(data);
};

const finishMockWorkoutSession = async (
  payload: FinishWorkoutSessionDTO
): Promise<WorkoutSessionSummaryDTO> =>
  normalizeWorkoutSessionSummary({
    sessionId: payload.sessionId,
    durationSec: payload.durationSec,
    totalVolume: payload.totalVolume,
    prCount: payload.totalVolume > 0 ? 1 : 0,
  });

export function useFinishWorkoutSession() {
  const useMock = useMockApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: FinishWorkoutSessionDTO) => {
      if (useMock) {
        return finishMockWorkoutSession(payload);
      }
      try {
        return await finishWorkoutSession(payload);
      } catch {
        return finishMockWorkoutSession(payload);
      }
    },
    onSuccess: () => {
      // 종료 후에는 활성 세션 캐시를 비운다.
      queryClient.setQueryData(ACTIVE_WORKOUT_SESSION_QUERY_KEY, null);
    },
  });
}
