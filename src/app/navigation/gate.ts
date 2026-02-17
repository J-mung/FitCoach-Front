type ResolveGateParams = {
  isReady: boolean;
  isCompleted: boolean;
};

export type AppGateState = "booting" | "onboarding" | "main-tabs";

export const GATE_ROUTE_MAP: Record<Exclude<AppGateState, "booting">, "Onboarding" | "MainTabs"> =
  {
    onboarding: "Onboarding",
    "main-tabs": "MainTabs",
  };

// 앱 진입 상태를 단일 게이트 값으로 정규화한다.
export const resolveAppGateState = ({
  isReady,
  isCompleted,
}: ResolveGateParams): AppGateState => {
  if (!isReady) {
    return "booting";
  }
  return isCompleted ? "main-tabs" : "onboarding";
};
