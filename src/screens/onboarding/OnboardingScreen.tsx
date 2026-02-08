import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Typography } from "@src/components";
import { useOnboardingStatus } from "@src/hooks";
import { useOnboardingOptions } from "@src/queries";
import { styles } from "./styles";

type OnboardingFormState = {
  goalId: string | null;
  experienceId: string | null;
  focusAreaIds: string[];
};

const TOTAL_STEPS = 3;

// 단계별 안내 문구. 추후 입력 UI가 추가되면 이 구조를 확장한다.
export function OnboardingScreen() {
  const { setCompleted } = useOnboardingStatus();
  // 온보딩 선택지 데이터는 React Query로 가져온다.
  const { data, isLoading, isError } = useOnboardingOptions();
  // 온보딩 진행 단계와 입력 상태.
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<OnboardingFormState>({
    goalId: null,
    experienceId: null,
    focusAreaIds: [],
  });

  // 데이터 로드 전에는 기본 단계 정보를 가드한다.
  const groups = data?.groups ?? [];
  const totalSteps = groups.length || TOTAL_STEPS;
  const activeGroup = groups[step];
  // 현재 단계 표시 텍스트(예: 1/3).
  const stepLabel = useMemo(() => `${step + 1}/${totalSteps}`, [step, totalSteps]);
  // CTA 상태 계산.
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  // 필수 입력이 없으면 다음/완료 버튼을 비활성화한다.
  const canProceed =
    (step === 0 && !!formState.goalId) ||
    (step === 1 && !!formState.experienceId) ||
    (step === 2 && formState.focusAreaIds.length > 0);
  // 로딩/에러 상태에서는 진행 버튼을 비활성화한다.
  const isCtaDisabled = isLoading || isError || !canProceed;

  // 다음 단계로 이동하거나 마지막 단계에서 완료 처리한다.
  const handleNext = () => {
    if (!canProceed) {
      return;
    }
    if (isLastStep) {
      void setCompleted(true);
      return;
    }
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  // 이전 단계로 이동한다.
  const handlePrev = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  // 선택 상태 업데이트 유틸(단일/복수 선택).
  const handleSelectGoal = (value: string) => {
    setFormState((prev) => ({ ...prev, goalId: value }));
  };

  const handleSelectExperience = (value: string) => {
    setFormState((prev) => ({ ...prev, experienceId: value }));
  };

  const handleToggleFocus = (value: string) => {
    setFormState((prev) => {
      // 집중 부위는 복수 선택을 허용한다.
      const isSelected = prev.focusAreaIds.includes(value);
      return {
        ...prev,
        focusAreaIds: isSelected
          ? prev.focusAreaIds.filter((item) => item !== value)
          : [...prev.focusAreaIds, value],
      };
    });
  };

  // 현재 단계에 맞는 선택 UI를 렌더링한다.
  const renderChoices = () => {
    if (!activeGroup) {
      return null;
    }

    if (activeGroup.key === "goal") {
      return (
        <View style={styles.choiceWrap}>
          {activeGroup.items.map((option) => {
            const isSelected = formState.goalId === option.id;
            return (
              <View key={option.id} style={styles.chipItem}>
                <Chip
                  label={option.label}
                  variant={isSelected ? "selected" : "default"}
                  onPress={() => handleSelectGoal(option.id)}
                />
              </View>
            );
          })}
        </View>
      );
    }

    if (activeGroup.key === "experience") {
      return (
        <View style={styles.choiceWrap}>
          {activeGroup.items.map((option) => {
            const isSelected = formState.experienceId === option.id;
            return (
              <View key={option.id} style={styles.chipItem}>
                <Chip
                  label={option.label}
                  variant={isSelected ? "selected" : "default"}
                  onPress={() => handleSelectExperience(option.id)}
                />
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <View style={styles.choiceWrap}>
        {activeGroup.items.map((option) => {
          const isSelected = formState.focusAreaIds.includes(option.id);
          return (
            <View key={option.id} style={styles.chipItem}>
              <Chip
                label={option.label}
                variant={isSelected ? "selected" : "default"}
                onPress={() => handleToggleFocus(option.id)}
              />
            </View>
          );
        })}
      </View>
    );
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
        {isLoading ? (
          <Typography variant="bodyMd" tone="secondary">
            옵션을 불러오는 중입니다.
          </Typography>
        ) : isError ? (
          <Typography variant="bodyMd" tone="secondary">
            옵션을 불러오지 못했습니다.
          </Typography>
        ) : (
          <>
            <Typography variant="titleMd">{activeGroup?.title}</Typography>
            <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
              {activeGroup?.description}
            </Typography>
            {renderChoices()}
          </>
        )}
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
            disabled={isCtaDisabled}
            style={styles.ctaButtonPrimary}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
