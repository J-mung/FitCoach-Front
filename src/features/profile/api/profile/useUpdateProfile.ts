import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "@shared/api";
import { useMockApi } from "@shared/lib";
import type { UpdateUserProfileDTO, UserProfileDTO } from "./dto";
import { normalizeUserProfile } from "./mappers";
import { PROFILE_QUERY_KEY } from "./constants";

const applyUpdate = (
  profile: UserProfileDTO,
  payload: UpdateUserProfileDTO
): UserProfileDTO =>
  normalizeUserProfile({
    ...profile,
    ...payload,
    updatedAt: new Date().toISOString(),
  });

const updateUserProfile = async (
  payload: UpdateUserProfileDTO
): Promise<UserProfileDTO> => {
  const data = await fetchJson<UserProfileDTO>("/users/me/profile", {
    method: "PUT",
    body: payload,
  });
  return normalizeUserProfile(data);
};

export function useUpdateProfile() {
  const useMock = useMockApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserProfileDTO) => {
      if (!useMock) {
        return updateUserProfile(payload);
      }
      const current = queryClient.getQueryData<UserProfileDTO>(PROFILE_QUERY_KEY);
      const base: UserProfileDTO =
        current ??
        normalizeUserProfile({
          userId: payload.userId,
          heightCm: null,
          weightKg: null,
          trainingYears: null,
          updatedAt: new Date().toISOString(),
        });
      return applyUpdate(base, payload);
    },
    onSuccess: (updatedProfile) => {
      // 저장 성공 시 조회 캐시를 즉시 갱신한다.
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile);
    },
  });
}
