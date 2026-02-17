import type { StepConfig } from "./types";

// 기본 단계 수(데이터 미로딩 시 fallback).
export const TOTAL_STEPS = 6;

// 온보딩 기본 단계 키(데이터가 없을 때 사용).
export const DEFAULT_GROUP_KEYS = ["goal", "level", "equipment"];
export const SUMMARY_PRIMARY_GROUP_KEY = "workouts_per_week";
const FLOW_GROUP_KEYS = ["goal", "level", "equipment"] as const;

// 단계 정의를 키 목록으로 구성한다.
export const buildStepFlow = (keys: string[]): StepConfig[] => {
  const flowKeys = FLOW_GROUP_KEYS.filter((key) => keys.includes(key));
  return [
    { type: "welcome" },
    ...flowKeys.map((key) => ({ type: "group" as const, key })),
    { type: "summary" },
    { type: "completion" },
  ];
};

// 기본 단계 정의 export(기존 참조 호환).
export const STEP_FLOW = buildStepFlow(DEFAULT_GROUP_KEYS);
