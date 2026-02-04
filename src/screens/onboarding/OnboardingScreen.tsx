import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Typography } from "@src/components";
import { useOnboardingStatus } from "@src/hooks";
import { styles } from "./styles";

type OnboardingFormState = {
  goal: string | null;
  experience: string | null;
  focusArea: string | null;
};

const TOTAL_STEPS = 3;

// 단계별 안내 문구. 추후 입력 UI가 추가되면 이 구조를 확장한다.
const STEP_CONTENT = [
  {
    title: "운동 목표",
    description: "달성하고 싶은 목표를 선택해주세요.",
  },
  {
    title: "운동 경험",
    description: "현재 운동 수준을 알려주세요.",
  },
  {
    title: "집중 부위",
    description: "이번에 집중하고 싶은 부위를 골라주세요.",
  },
];

export function OnboardingScreen() {
  const { setCompleted } = useOnboardingStatus();
  // 온보딩 진행 단계와 입력 상태.
  const [step, setStep] = useState(0);
  const [formState] = useState<OnboardingFormState>({
    goal: null,
    experience: null,
    focusArea: null,
  });

  // 현재 단계 표시 텍스트(예: 1/3).
  const stepLabel = useMemo(() => `${step + 1}/${TOTAL_STEPS}`, [step]);
  // 현재 단계에 맞는 콘텐츠를 매핑한다.
  const stepContent = STEP_CONTENT[step] ?? STEP_CONTENT[0];
  // CTA 상태 계산.
  const isFirstStep = step === 0;
  const isLastStep = step === TOTAL_STEPS - 1;

  // 다음 단계로 이동하거나 마지막 단계에서 완료 처리한다.
  const handleNext = () => {
    if (isLastStep) {
      void setCompleted(true);
      return;
    }
    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1));
  };

  // 이전 단계로 이동한다.
  const handlePrev = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="titleLg" style={styles.title}>
          FitCoach 온보딩
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          목표와 선호를 알려주세요.
        </Typography>
      </View>

      {/* 단계 인디케이터 */}
      <View style={styles.step}>
        <View style={styles.indicatorRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const isActive = index === step;
            return (
              <View
                key={`step-dot-${index}`}
                style={[
                  styles.indicatorDot,
                  isActive ? styles.indicatorDotActive : null,
                ]}
              />
            );
          })}
          <Typography variant="bodySm" tone="secondary">
            {stepLabel}
          </Typography>
        </View>
      </View>

      {/* 단계별 콘텐츠 영역 */}
      <View style={styles.body}>
        <Typography variant="titleMd">{stepContent.title}</Typography>
        <Typography variant="bodyMd" tone="secondary">
          {stepContent.description}
        </Typography>
        <Typography variant="bodySm" tone="secondary">
          입력 상태: {JSON.stringify(formState)}
        </Typography>
      </View>

      {/* 이전/다음/완료 CTA */}
      <View style={styles.footer}>
        <View style={styles.ctaRow}>
          <Button
            title="이전"
            variant="secondary"
            disabled={isFirstStep}
            style={styles.ctaButtonSecondary}
            onPress={handlePrev}
          />
          <Button
            title={isLastStep ? "완료" : "다음"}
            style={styles.ctaButtonPrimary}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
