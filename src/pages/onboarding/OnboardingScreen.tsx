import React from "react";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "@src/components";
import { useOnboardingStatus } from "@features/onboarding/model";
import { useOnboardingOptions } from "@features/onboarding/api";
import { OnboardingFooter } from "./OnboardingFooter";
import { OnboardingHeader } from "./OnboardingHeader";
import { styles } from "./styles";
import { CompletionStep } from "./steps/CompletionStep";
import { GroupStep } from "./steps/GroupStep";
import { SummaryStep } from "./steps/SummaryStep";
import { WelcomeStep } from "./steps/WelcomeStep";
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
    isFirstStep,
    isLastStep,
    isCtaDisabled,
    handleNext,
    handlePrev,
    handleSelectGoal,
    handleSelectLevel,
    handleSelectWorkoutsPerWeek,
    handleSelectSessionMinutes,
    handleSelectLocation,
    handleSetEquipmentIds,
    handleToggleEquipment,
  } = useOnboardingFlow({
    data,
    isLoading,
    isError,
    onComplete: () => void setCompleted(true),
  });
  const progress = useOnboardingProgress({ step, totalSteps });
  const panHandlers = useOnboardingSwipe({ onNext: handleNext, onPrev: handlePrev });
  // iOS 홈 인디케이터 영역을 고려해 CTA 여백을 보강한다.
  const footerSafeAreaStyle = {
    paddingBottom: Math.max(safeAreaInsets.bottom, 12),
  };

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
      <OnboardingHeader progress={progress} />

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
                        : activeGroup.key === "level"
                        ? formState.levelId
                        : activeGroup.key === "workouts_per_week"
                        ? formState.workoutsPerWeekId
                        : activeGroup.key === "session_minutes"
                        ? formState.sessionMinutesId
                        : activeGroup.key === "location"
                        ? formState.locationId
                        : null
                    }
                    selectedMultiIds={formState.equipmentIds}
                    onSelectSingle={(id) => {
                      if (activeGroup.key === "goal") {
                        handleSelectGoal(id);
                        return;
                      }
                      if (activeGroup.key === "level") {
                        handleSelectLevel(id);
                        return;
                      }
                      if (activeGroup.key === "workouts_per_week") {
                        handleSelectWorkoutsPerWeek(id);
                        return;
                      }
                      if (activeGroup.key === "session_minutes") {
                        handleSelectSessionMinutes(id);
                        return;
                      }
                      if (activeGroup.key === "location") {
                        handleSelectLocation(id);
                        return;
                      }
                      handleToggleEquipment(id);
                    }}
                    onToggleMulti={handleToggleEquipment}
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
                  onSelectSingle={(key, id) => {
                    if (key === "goal") {
                      handleSelectGoal(id);
                      return;
                    }
                    if (key === "level") {
                      handleSelectLevel(id);
                      return;
                    }
                    if (key === "workouts_per_week") {
                      handleSelectWorkoutsPerWeek(id);
                      return;
                    }
                    if (key === "session_minutes") {
                      handleSelectSessionMinutes(id);
                      return;
                    }
                    if (key === "location") {
                      handleSelectLocation(id);
                      return;
                    }
                  }}
                  onSetMulti={(key, ids) => {
                    if (key === "equipment") {
                      handleSetEquipmentIds(ids);
                    }
                  }}
                />
              ) : null}

              {activeStep.type === "completion" ? <CompletionStep /> : null}
            </>
          )}
        </View>

        <OnboardingFooter
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isCtaDisabled={isCtaDisabled}
          onPrev={handlePrev}
          onNext={handleNext}
          containerStyle={footerSafeAreaStyle}
        />
      </View>
    </SafeAreaView>
  );
}
