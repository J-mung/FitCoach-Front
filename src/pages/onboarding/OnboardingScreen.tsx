import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "@src/components";
import { useOnboardingStatus } from "@features/onboarding/model";
import { useOnboardingOptions } from "@features/onboarding/api";
import { OnboardingFooter } from "./OnboardingFooter";
import { OnboardingHeader } from "./OnboardingHeader";
import { styles } from "./styles";
import { renderOnboardingStep } from "./stepRenderers";
import {
  useOnboardingFlow,
  useOnboardingProgress,
  useOnboardingSwipe,
} from "@features/onboarding/model";

export function OnboardingScreen() {
  const { setCompleted } = useOnboardingStatus();
  const safeAreaInsets = useSafeAreaInsets();
  // 온보딩 선택지 데이터는 React Query로 가져온다.
  const { data, isLoading, isError } = useOnboardingOptions();
  const {
    step,
    setStep,
    formState,
    totalSteps,
    activeStep,
    activeGroup,
    groupMap,
    groups,
    isFirstStep,
    isCtaDisabled,
    handleNext,
    handlePrev,
    handleSelectSingle,
    handleSetMulti,
    handleToggleMulti,
  } = useOnboardingFlow({
    data,
    isLoading,
    isError,
    onComplete: () => void setCompleted(true),
  });
  const progress = useOnboardingProgress({
    step: Math.min(step, Math.max(totalSteps - 2, 0)),
    totalSteps: Math.max(totalSteps - 1, 1),
  });
  const panHandlers = useOnboardingSwipe({ onNext: handleNext, onPrev: handlePrev });
  // iOS 홈 인디케이터 영역을 고려해 CTA 여백을 보강한다.
  const footerSafeAreaStyle = {
    paddingBottom: Math.max(safeAreaInsets.bottom, 12),
  };
  const stepContent = renderOnboardingStep({
    activeStep,
    activeGroup,
    groupMap,
    groups,
    formState,
    handleSelectSingle,
    handleSetMulti,
    handleToggleMulti,
  });

  useEffect(() => {
    if (activeStep.type !== "completion") {
      return;
    }
    // 완료 전환 화면은 짧게 노출한 뒤 메인으로 이동한다.
    const timer = setTimeout(() => {
      void setCompleted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeStep.type, setCompleted]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}
      edges={["left", "right"]}
      {...panHandlers}
    >
      <OnboardingHeader
        activeStep={activeStep}
        step={step}
        totalSteps={totalSteps}
        progress={progress}
        onPrev={handlePrev}
        onSkip={() => void setCompleted(true)}
      />

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
          ) : activeStep.type === "summary" ? (
            // 요약 단계는 수정 패널이 길어질 수 있어 스크롤을 허용한다.
            <ScrollView
              style={styles.summaryScroll}
              contentContainerStyle={styles.summaryScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {stepContent}
            </ScrollView>
          ) : (
            <View style={styles.stepContent}>{stepContent}</View>
          )}
        </View>

        <OnboardingFooter
          activeStep={activeStep}
          isFirstStep={isFirstStep}
          isCtaDisabled={isCtaDisabled}
          onPrev={handlePrev}
          onNext={handleNext}
          containerStyle={footerSafeAreaStyle}
        />
      </View>
    </SafeAreaView>
  );
}
