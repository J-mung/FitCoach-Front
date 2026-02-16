import type { StepConfig } from "./types";

// 기본 단계 수(데이터 미로딩 시 fallback).
export const TOTAL_STEPS = 7;

// 온보딩 단계 정의(와이어 기준).
export const STEP_FLOW: StepConfig[] = [
  { type: "welcome" },
  { type: "group", key: "goal" },
  { type: "group", key: "experience" },
  { type: "group", key: "equipment" },
  { type: "group", key: "focus_area" },
  { type: "summary" },
  { type: "completion" },
];
