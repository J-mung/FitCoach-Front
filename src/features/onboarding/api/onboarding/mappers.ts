import type { OnboardingOptionsResponseDTO } from "./dto";

const sortByOrder = <T extends { sortOrder: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sortOrder - b.sortOrder);

// API/Mock 응답을 UI에서 사용하기 쉬운 정렬 상태로 정규화한다.
export const normalizeOnboardingOptions = (
  data: OnboardingOptionsResponseDTO
): OnboardingOptionsResponseDTO => ({
  groups: sortByOrder(data.groups).map((group) => ({
    ...group,
    items: sortByOrder(group.items),
  })),
});
