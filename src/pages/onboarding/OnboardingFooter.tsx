import React from "react";
import { View, type ViewStyle } from "react-native";
import { Button } from "@src/components";
import { styles } from "./styles";

type OnboardingFooterProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isCtaDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  containerStyle?: ViewStyle;
};

export function OnboardingFooter({
  isFirstStep,
  isLastStep,
  isCtaDisabled,
  onPrev,
  onNext,
  containerStyle,
}: OnboardingFooterProps) {
  return (
    <View style={[styles.footer, containerStyle]}>
      <View style={styles.ctaRow}>
        <Button
          title="이전"
          variant="secondary"
          disabled={isFirstStep}
          style={styles.ctaButtonSecondary}
          onPress={onPrev}
        />
        <Button
          title={isLastStep ? "완료" : "다음"}
          disabled={isCtaDisabled}
          style={styles.ctaButtonPrimary}
          onPress={onNext}
        />
      </View>
    </View>
  );
}
