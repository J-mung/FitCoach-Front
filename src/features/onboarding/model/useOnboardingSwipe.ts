import { useMemo, useRef } from "react";
import { PanResponder, Platform } from "react-native";

type UseOnboardingSwipeParams = {
  onNext: () => void;
  onPrev: () => void;
};

export function useOnboardingSwipe({ onNext, onPrev }: UseOnboardingSwipeParams) {
  // iOS에서는 단계 이동을 스와이프로도 지원한다.
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Platform.OS === "ios" &&
        Math.abs(gesture.dx) > 24 &&
        Math.abs(gesture.dy) < 12,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) {
          onNext();
          return;
        }
        if (gesture.dx > 50) {
          onPrev();
        }
      },
    })
  ).current;

  return useMemo(
    () => (Platform.OS === "ios" ? panResponder.panHandlers : undefined),
    [panResponder]
  );
}
