import { useQuery } from "@tanstack/react-query";
import { useMockApi } from "@shared/lib";
import { fetchJson } from "@shared/api";

export type OnboardingOptionItem = {
  id: string;
  label: string;
  sortOrder: number;
};

export type OnboardingOptionGroup = {
  key: "goal" | "experience" | "equipment" | "focus_area";
  title: string;
  description: string;
  selectionType: "single" | "multi";
  sortOrder: number;
  items: OnboardingOptionItem[];
};

export type OnboardingOptionsResponse = {
  groups: OnboardingOptionGroup[];
};

// 온보딩 옵션 조회용 쿼리 키.
// 옵션 구조 변경 시 버전을 올려 캐시를 무효화한다.
const QUERY_KEY = ["onboarding-options", "v2"] as const;

const sortByOrder = <T extends { sortOrder: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sortOrder - b.sortOrder);

const normalizeOptions = (
  data: OnboardingOptionsResponse
): OnboardingOptionsResponse => ({
  groups: sortByOrder(data.groups).map((group) => ({
    ...group,
    items: sortByOrder(group.items),
  })),
});

// Mock JSON을 로드하여 옵션 데이터를 반환한다(서버 준비 전까지 사용).
const fetchMockOnboardingOptions = async (): Promise<OnboardingOptionsResponse> => {
  const data = require("./onboardingOptions.mock.json") as OnboardingOptionsResponse;
  return normalizeOptions(data);
};

// 서버 API 호출(준비 완료 시 활성화).
const fetchOnboardingOptions = async (): Promise<OnboardingOptionsResponse> => {
  const data = await fetchJson<OnboardingOptionsResponse>("/onboarding/options");
  return normalizeOptions(data);
};

export function useOnboardingOptions() {
  const useMock = useMockApi();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (useMock) {
        return fetchMockOnboardingOptions();
      }
      // 서버 준비 전에는 Mock을 유지한다.
      try {
        return await fetchOnboardingOptions();
      } catch {
        return fetchMockOnboardingOptions();
      }
    },
    // 옵션은 자주 바뀌지 않으므로 캐시를 길게 유지한다.
    staleTime: 1000 * 60 * 60,
  });
}
