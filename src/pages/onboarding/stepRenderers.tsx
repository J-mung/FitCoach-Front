import React from "react";
import type {
  GroupMap,
  OnboardingFormState,
  StepConfig,
} from "@features/onboarding/model";
import type { OnboardingOptionGroup } from "@features/onboarding/api";
import { CompletionStep } from "./steps/CompletionStep";
import { GroupStep } from "./steps/GroupStep";
import { SummaryStep } from "./steps/SummaryStep";
import { WelcomeStep } from "./steps/WelcomeStep";
import { OnboardingFallback } from "./OnboardingFallback";

type StepRenderContext = {
  activeStep: StepConfig;
  activeGroup: OnboardingOptionGroup | null;
  groupMap: GroupMap | null;
  groups: OnboardingOptionGroup[];
  formState: OnboardingFormState;
  handleSelectSingle: (key: string, id: string) => void;
  handleSetMulti: (key: string, ids: string[]) => void;
  handleToggleMulti: (key: string, id: string) => void;
};

type StepRenderer = (context: StepRenderContext) => React.ReactNode;

const renderWelcomeStep: StepRenderer = () => <WelcomeStep />;

const renderGroupStep: StepRenderer = ({
  activeGroup,
  formState,
  handleSelectSingle,
  handleToggleMulti,
}) => {
  if (!activeGroup) {
    return <OnboardingFallback />;
  }

  return (
    <GroupStep
      group={activeGroup}
      selectedSingleId={
        typeof formState[activeGroup.key] === "string"
          ? (formState[activeGroup.key] as string)
          : null
      }
      selectedMultiIds={
        Array.isArray(formState[activeGroup.key])
          ? (formState[activeGroup.key] as string[])
          : []
      }
      onSelectSingle={(id) => handleSelectSingle(activeGroup.key, id)}
      onToggleMulti={(id) => handleToggleMulti(activeGroup.key, id)}
    />
  );
};

const renderSummaryStep: StepRenderer = ({
  groupMap,
  groups,
  formState,
  handleSelectSingle,
  handleSetMulti,
}) => {
  if (!groupMap) {
    return <OnboardingFallback />;
  }

  return (
    <SummaryStep
      groups={groups}
      groupMap={groupMap}
      formState={formState}
      onSelectSingle={handleSelectSingle}
      onSetMulti={handleSetMulti}
    />
  );
};

const renderCompletionStep: StepRenderer = () => <CompletionStep />;

const STEP_RENDERERS: Record<StepConfig["type"], StepRenderer> = {
  welcome: renderWelcomeStep,
  group: renderGroupStep,
  summary: renderSummaryStep,
  completion: renderCompletionStep,
};

// 단계 타입에 맞는 렌더러를 찾아 콘텐츠를 그린다.
export const renderOnboardingStep = (context: StepRenderContext) =>
  STEP_RENDERERS[context.activeStep.type](context);
