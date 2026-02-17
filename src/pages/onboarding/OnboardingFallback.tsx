import React from "react";
import { Typography } from "@src/components";

type OnboardingFallbackProps = {
  message?: string;
};

const DEFAULT_MESSAGE = "옵션이 준비되지 않았습니다.";

// 온보딩 단계에서 공통으로 사용하는 fallback 메시지.
export function OnboardingFallback({ message = DEFAULT_MESSAGE }: OnboardingFallbackProps) {
  return (
    <Typography variant="bodySm" tone="secondary">
      {message}
    </Typography>
  );
}
