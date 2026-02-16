import { useEffect, useRef } from "react";
import { Animated } from "react-native";

type UseOnboardingProgressParams = {
  step: number;
  totalSteps: number;
};

export function useOnboardingProgress({ step, totalSteps }: UseOnboardingProgressParams) {
  // 진행률 애니메이션 값.
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 단계 이동 시 진행률을 부드럽게 변경한다.
    Animated.timing(progress, {
      toValue: (step + 1) / totalSteps,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [progress, step, totalSteps]);

  return progress;
}
