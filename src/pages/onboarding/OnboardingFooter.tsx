import React from "react";
import { View, type ViewStyle } from "react-native";
import { Button } from "@src/components";
import type { StepConfig } from "@features/onboarding/model";
import { styles } from "./styles";

type OnboardingFooterProps = {
  activeStep: StepConfig;
  isFirstStep: boolean;
  isCtaDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  containerStyle?: ViewStyle;
};

export function OnboardingFooter({
  activeStep,
  isFirstStep,
  isCtaDisabled,
  onPrev,
  onNext,
  containerStyle,
}: OnboardingFooterProps) {
  const isWelcome = activeStep.type === "welcome";
  const isCompletion = activeStep.type === "completion";
  const isSummary = activeStep.type === "summary";
  const nextTitle = isWelcome ? "시작하기" : isSummary ? "설정 완료" : "다음";

  if (isCompletion) {
    return null;
  }

  return (
    <View style={[styles.footer, containerStyle]}>
      <View style={styles.ctaRow}>
        {!isWelcome ? (
          <Button
            title="이전"
            variant="secondary"
            disabled={isFirstStep}
            style={styles.ctaButtonSecondary}
            onPress={onPrev}
          />
        ) : null}
        <Button
          title={nextTitle}
          disabled={isCtaDisabled}
          style={styles.ctaButtonPrimary}
          onPress={onNext}
        />
      </View>
    </View>
  );
}
