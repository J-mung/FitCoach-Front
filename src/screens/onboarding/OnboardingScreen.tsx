import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Typography } from "@src/components";
import { useOnboardingStatus } from "@src/hooks";
import { useOnboardingOptions } from "@src/queries";
import { styles } from "./styles";
import { CompletionStep } from "./steps/CompletionStep";
import { GroupStep } from "./steps/GroupStep";
import { SummaryStep } from "./steps/SummaryStep";
import { WelcomeStep } from "./steps/WelcomeStep";
import type { GroupMap, OnboardingFormState, StepConfig } from "./types";

// 기본 단계 수(데이터 미로딩 시 fallback).
const TOTAL_STEPS = 7;

// 온보딩 단계 정의(와이어 기준).
const STEP_FLOW: StepConfig[] = [
  { type: "welcome" },
  { type: "group", key: "goal" },
  { type: "group", key: "experience" },
  { type: "group", key: "equipment" },
  { type: "group", key: "focus_area" },
  { type: "summary" },
  { type: "completion" },
];

export function OnboardingScreen() {
  const { setCompleted } = useOnboardingStatus();
  // 온보딩 선택지 데이터는 React Query로 가져온다.
  const { data, isLoading, isError } = useOnboardingOptions();
  // 온보딩 진행 단계와 입력 상태.
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<OnboardingFormState>({
    goalId: null,
    experienceId: null,
    equipmentId: null,
    focusAreaIds: [],
  });

  // 데이터 로드 전에는 기본 단계 정보를 가드한다.
  const groups = data?.groups ?? [];
  const totalSteps = STEP_FLOW.length || TOTAL_STEPS;
  const activeStep = STEP_FLOW[step] ?? STEP_FLOW[0];
  const activeGroup =
    activeStep.type === "group" ? groups.find((group) => group.key === activeStep.key) : null;
  // 현재 단계 표시 텍스트(예: 1/3).
  const stepLabel = useMemo(() => `${step + 1}/${totalSteps}`, [step, totalSteps]);
  // CTA 상태 계산.
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  // 필수 입력이 없으면 다음/완료 버튼을 비활성화한다.
  const canProceed =
    activeStep.type === "welcome" ||
    (activeStep.type === "group" && activeStep.key === "goal" && !!formState.goalId) ||
    (activeStep.type === "group" && activeStep.key === "experience" && !!formState.experienceId) ||
    (activeStep.type === "group" && activeStep.key === "equipment" && !!formState.equipmentId) ||
    (activeStep.type === "group" && activeStep.key === "focus_area" && formState.focusAreaIds.length > 0) ||
    activeStep.type === "summary" ||
    activeStep.type === "completion";
  // 로딩/에러 상태에서는 진행 버튼을 비활성화한다.
  const isCtaDisabled = isLoading || isError || !canProceed;

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

  const handleSelectEquipment = (value: string) => {
    setFormState((prev) => ({ ...prev, equipmentId: value }));
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

  const groupMap = useMemo<GroupMap | null>(() => {
    if (!data) {
      return null;
    }
    return data.groups.reduce<GroupMap>((acc, group) => {
      acc[group.key] = group;
      return acc;
    }, {} as GroupMap);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 영역: 인디케이터 + 타이틀을 묶어서 관리한다. */}
      <View style={styles.step}>
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorTrack}>
            {/* 진행률은 현재 단계 기준으로 채운다. */}
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
      </View>

      <View style={styles.headerContent}>
        <View style={styles.header}>
          <Typography variant="titleLg" style={styles.title}>
            FitCoach 온보딩
          </Typography>
          <Typography variant="bodyMd" tone="secondary">
            목표와 선호를 알려주세요.
          </Typography>
        </View>
      </View>
      <View style={styles.divider} />

      {/* 단계별 콘텐츠 영역 */}
      <View style={styles.contentContainer}>
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
              {activeStep.type === "welcome" ? <WelcomeStep /> : null}

              {activeStep.type === "group" ? (
                activeGroup ? (
                  <GroupStep
                    group={activeGroup}
                    selectedSingleId={
                      activeGroup.key === "goal"
                        ? formState.goalId
                        : activeGroup.key === "experience"
                        ? formState.experienceId
                        : formState.equipmentId
                    }
                    selectedMultiIds={formState.focusAreaIds}
                    onSelectSingle={(id) => {
                      if (activeGroup.key === "goal") {
                        handleSelectGoal(id);
                        return;
                      }
                      if (activeGroup.key === "experience") {
                        handleSelectExperience(id);
                        return;
                      }
                      handleSelectEquipment(id);
                    }}
                    onToggleMulti={handleToggleFocus}
                  />
                ) : (
                  <Typography variant="bodySm" tone="secondary">
                    옵션이 준비되지 않았습니다.
                  </Typography>
                )
              ) : null}

              {activeStep.type === "summary" && groupMap ? (
                <SummaryStep
                  groupMap={groupMap}
                  formState={formState}
                  onEdit={(stepIndex) => setStep(stepIndex)}
                />
              ) : null}

              {activeStep.type === "completion" ? <CompletionStep /> : null}
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
      </View>
    </SafeAreaView>
  );
}
