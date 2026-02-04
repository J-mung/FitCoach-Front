import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Typography } from "@src/components";
import { useOnboardingStatus } from "@src/hooks";
import { tailwind } from "@src/theme/tailwind";
import {
  onboardingBodyClass,
  onboardingContainerClass,
  onboardingFooterClass,
  onboardingHeaderClass,
  onboardingStepClass,
  onboardingTitleClass,
} from "./styles";

type OnboardingFormState = {
  goal: string | null;
  experience: string | null;
  focusArea: string | null;
};

const TOTAL_STEPS = 3;

export function OnboardingScreen() {
  const { setCompleted } = useOnboardingStatus();
  // 온보딩 진행 단계와 입력 상태.
  const [step, setStep] = useState(0);
  const [formState] = useState<OnboardingFormState>({
    goal: null,
    experience: null,
    focusArea: null,
  });

  const stepLabel = useMemo(() => `${step + 1}/${TOTAL_STEPS}`, [step]);

  return (
    <SafeAreaView style={tailwind(onboardingContainerClass)}>
      <View style={tailwind(onboardingHeaderClass)}>
        <Typography variant="titleLg" style={tailwind(onboardingTitleClass)}>
          FitCoach 온보딩
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          목표와 선호를 알려주세요.
        </Typography>
      </View>

      <View style={tailwind(onboardingStepClass)}>
        <Typography variant="bodySm" tone="secondary">
          {stepLabel}
        </Typography>
      </View>

      <View style={tailwind(onboardingBodyClass)}>
        <Typography variant="bodyMd">
          단계별 콘텐츠 영역 (state: {JSON.stringify(formState)})
        </Typography>
      </View>

      <View style={tailwind(onboardingFooterClass)}>
        <Button
          title="시작하기"
          onPress={() => {
            void setCompleted(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
