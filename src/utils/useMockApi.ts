import { USE_MOCK_API } from "@env";

// 모든 API에 공통으로 적용되는 Mock 사용 여부.
export function useMockApi() {
  return USE_MOCK_API === "true";
}
