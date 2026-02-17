import React from "react";
import { Animated, Pressable, View } from "react-native";
import { Typography } from "@src/components";
import type { StepConfig } from "@features/onboarding/model";
import { styles } from "./styles";

type OnboardingHeaderProps = {
  activeStep: StepConfig;
  step: number;
  totalSteps: number;
  progress: Animated.Value;
  onPrev: () => void;
  onSkip: () => void;
};

export function OnboardingHeader({
  activeStep,
  step,
  totalSteps,
  progress,
  onPrev,
  onSkip,
}: OnboardingHeaderProps) {
  const isWelcome = activeStep.type === "welcome";
  const isCompletion = activeStep.type === "completion";
  const isGroupOrSummary = activeStep.type === "group" || activeStep.type === "summary";
  const displayTotal = Math.max(totalSteps - 1, 1);
  const currentStep = Math.min(Math.max(step + 1, 1), displayTotal);

  return (
    <View style={styles.headerShell}>
      {isWelcome ? (
        <View style={styles.welcomeHeaderRow}>
          <Typography variant="titleMd">FitCoach</Typography>
          <Pressable onPress={onSkip}>
            <Typography variant="bodyMd" tone="secondary">
              나중에 하기
            </Typography>
          </Pressable>
        </View>
      ) : null}

      {isGroupOrSummary ? (
        <View style={styles.stepHeaderRow}>
          <Pressable onPress={onPrev} style={styles.stepBackButton}>
            <Typography variant="titleMd">{"‹"}</Typography>
          </Pressable>
          <Typography variant="titleMd">{`${currentStep} / ${displayTotal} 단계`}</Typography>
          <View style={styles.stepBackButton} />
        </View>
      ) : null}

      {!isCompletion ? (
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorTrack}>
            <Animated.View
              style={[
                styles.indicatorFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
