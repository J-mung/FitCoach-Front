import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@shared/api";
import { useMockApi } from "@shared/lib";
import type { UserProfileDTO } from "./dto";
import { normalizeUserProfile } from "./mappers";

const QUERY_KEY = ["user-profile", "v1"] as const;

const fetchMockUserProfile = async (): Promise<UserProfileDTO> => {
  const data = require("./profile.mock.json") as UserProfileDTO;
  return normalizeUserProfile(data);
};

const fetchUserProfile = async (): Promise<UserProfileDTO> => {
  const data = await fetchJson<UserProfileDTO>("/users/me/profile");
  return normalizeUserProfile(data);
};

export function useProfile() {
  const useMock = useMockApi();

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (useMock) {
        return fetchMockUserProfile();
      }
      try {
        return await fetchUserProfile();
      } catch {
        return fetchMockUserProfile();
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
