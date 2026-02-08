import { useQuery } from "@tanstack/react-query";
import { useMockApi } from "@src/utils";

export type OnboardingOptionItem = {
  id: string;
  label: string;
  sortOrder: number;
};

export type OnboardingOptionGroup = {
  key: "goal" | "experience" | "focus_area";
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
const QUERY_KEY = ["onboarding-options"] as const;

// Mock JSON을 로드하여 옵션 데이터를 반환한다(서버 준비 전까지 사용).
const fetchOnboardingOptions = async (): Promise<OnboardingOptionsResponse> => {
  const data = require("./onboardingOptions.mock.json") as OnboardingOptionsResponse;
  return data;
};

export function useOnboardingOptions() {
  const useMock = useMockApi();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (useMock) {
        return fetchOnboardingOptions();
      }
      // 서버 준비 전까지는 Mock을 사용한다.
      return fetchOnboardingOptions();
    },
    // 옵션은 자주 바뀌지 않으므로 캐시를 길게 유지한다.
    staleTime: 1000 * 60 * 60,
  });
}
