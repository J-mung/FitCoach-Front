import { useEffect } from "react";
import { useOnboardingStore } from "@src/store/onboarding";

export function useOnboardingStatus() {
  // 온보딩 상태와 저장 로직을 zustand에서 가져온다.
  const isReady = useOnboardingStore((state) => state.isReady);
  const isCompleted = useOnboardingStore((state) => state.isCompleted);
  const refresh = useOnboardingStore((state) => state.refresh);
  const setCompleted = useOnboardingStore((state) => state.setCompleted);

  useEffect(() => {
    // 최초 사용 시점에 온보딩 상태를 복원.
    if (!isReady) {
      refresh();
    }
  }, [isReady, refresh]);

  return {
    isReady,
    isCompleted,
    refresh,
    setCompleted,
  };
}
