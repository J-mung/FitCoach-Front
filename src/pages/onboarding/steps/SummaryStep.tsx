import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Typography } from "@src/components";
import type { GroupMap, OnboardingFormState } from "@features/onboarding/model";
import type { OnboardingOptionGroup } from "@features/onboarding/api";
import { styles } from "../styles";

type SummaryStepProps = {
  groupMap: GroupMap;
  formState: OnboardingFormState;
  onSelectSingle: (key: keyof GroupMap, id: string) => void;
  onSetMulti: (key: keyof GroupMap, ids: string[]) => void;
};

const SUMMARY_GROUP_KEYS = [
  "goal",
  "level",
  "workouts_per_week",
  "session_minutes",
  "location",
  "equipment",
] as const;
const SCHEDULE_GROUP_KEY = "workouts_per_week" as const;
const SESSION_MINUTES_GROUP_KEY = "session_minutes" as const;

// 최종 요약 단계: 주간 빈도 선택 + 선택 결과 요약/수정.
export function SummaryStep({
  groupMap,
  formState,
  onSelectSingle,
  onSetMulti,
}: SummaryStepProps) {
  const [expandedKey, setExpandedKey] = useState<keyof GroupMap | null>(null);
  const [pendingMultiMap, setPendingMultiMap] = useState<Record<string, string[]>>({});

  const scheduleGroup = groupMap[SCHEDULE_GROUP_KEY];
  const sessionMinutesGroup = groupMap[SESSION_MINUTES_GROUP_KEY];
  const summaryGroups = useMemo(
    () =>
      SUMMARY_GROUP_KEYS.map((key) => groupMap[key]).filter(
        (group): group is OnboardingOptionGroup => Boolean(group)
      ),
    [groupMap]
  );

  useEffect(() => {
    if (!expandedKey) {
      return;
    }
    const value = formState[expandedKey];
    if (!Array.isArray(value)) {
      return;
    }
    setPendingMultiMap((prev) => ({ ...prev, [expandedKey]: value }));
  }, [expandedKey, formState]);

  const resolveLabel = (groupKey: keyof GroupMap, id: string | null) =>
    groupMap[groupKey]?.items.find((item) => item.id === id)?.label ?? "-";

  const resolveMulti = (groupKey: keyof GroupMap, ids: string[]) => {
    const labels = ids
      .map((id) => groupMap[groupKey]?.items.find((item) => item.id === id)?.label)
      .filter(Boolean);
    return labels.length > 0 ? labels.join(", ") : "-";
  };

  const resolveSummaryValue = (group: OnboardingOptionGroup) => {
    const value = formState[group.key];
    if (group.selectionType === "multi") {
      return resolveMulti(group.key, Array.isArray(value) ? value : []);
    }
    return resolveLabel(group.key, typeof value === "string" ? value : null);
  };

  const renderEditSection = (group: OnboardingOptionGroup) => {
    const isMulti = group.selectionType === "multi";
    const selectedSingleId =
      typeof formState[group.key] === "string" ? (formState[group.key] as string) : null;
    const selectedMultiIds = pendingMultiMap[group.key] ?? [];

    return (
      <View style={styles.summaryEditBox}>
        <View style={styles.summaryEditOptionWrap}>
          {group.items.map((item) => {
            const isSelected = isMulti
              ? selectedMultiIds.includes(item.id)
              : selectedSingleId === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.summaryEditOption, isSelected ? styles.optionCardSelected : null]}
                onPress={() => {
                  if (!isMulti) {
                    onSelectSingle(group.key, item.id);
                    return;
                  }
                  setPendingMultiMap((prev) => {
                    const current = prev[group.key] ?? [];
                    const next = current.includes(item.id)
                      ? current.filter((target) => target !== item.id)
                      : [...current, item.id];
                    return { ...prev, [group.key]: next };
                  });
                }}
              >
                <Typography
                  variant="bodyMd"
                  style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                >
                  {item.label}
                </Typography>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.summaryEditActionRow}>
          <Button
            title="수정 완료"
            variant="secondary"
            onPress={() => {
              if (isMulti) {
                onSetMulti(group.key, pendingMultiMap[group.key] ?? []);
              }
              setExpandedKey(null);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      {scheduleGroup ? (
        <View style={styles.summaryScheduleSection}>
          <Typography variant="titleLg">일주일에 얼마나 운동하고 싶나요?</Typography>
          <View style={styles.optionList}>
            {scheduleGroup.items.map((item) => {
              const selectedId =
                typeof formState[scheduleGroup.key] === "string"
                  ? (formState[scheduleGroup.key] as string)
                  : null;
              const isSelected = selectedId === item.id;
              return (
                <Pressable
                  key={item.id}
                  style={[styles.optionCard, isSelected ? styles.optionCardSelected : null]}
                  onPress={() => onSelectSingle(scheduleGroup.key, item.id)}
                >
                  <Typography
                    variant="titleMd"
                    style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                  >
                    {item.label}
                  </Typography>
                  <View style={[styles.radioOuter, isSelected ? styles.radioOuterSelected : null]}>
                    {isSelected ? <View style={styles.radioInner} /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      {sessionMinutesGroup ? (
        <View style={styles.summaryScheduleSection}>
          <Typography variant="titleLg">한 번에 얼마나 운동할까요?</Typography>
          <View style={styles.optionList}>
            {sessionMinutesGroup.items.map((item) => {
              const selectedId =
                typeof formState[sessionMinutesGroup.key] === "string"
                  ? (formState[sessionMinutesGroup.key] as string)
                  : null;
              const isSelected = selectedId === item.id;
              return (
                <Pressable
                  key={item.id}
                  style={[styles.optionCard, isSelected ? styles.optionCardSelected : null]}
                  onPress={() => onSelectSingle(sessionMinutesGroup.key, item.id)}
                >
                  <Typography
                    variant="titleMd"
                    style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                  >
                    {item.label}
                  </Typography>
                  <View style={[styles.radioOuter, isSelected ? styles.radioOuterSelected : null]}>
                    {isSelected ? <View style={styles.radioInner} /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      <Typography variant="titleLg" style={styles.summaryPlanTitle}>
        선택 요약
      </Typography>
      <View style={styles.summaryPlanCard}>
        {summaryGroups.map((group) => (
          <View key={group.key} style={styles.summaryPlanRow}>
            <View style={styles.summaryPlanTextBlock}>
              <Typography variant="bodySm" tone="secondary">
                {group.title}
              </Typography>
              <Typography variant="titleMd" style={styles.summaryPlanValue}>
                {resolveSummaryValue(group)}
              </Typography>
            </View>
            <Button
              title={expandedKey === group.key ? "접기" : "수정"}
              variant="ghost"
              size="md"
              onPress={() => setExpandedKey((prev) => (prev === group.key ? null : group.key))}
            />
            {expandedKey === group.key ? renderEditSection(group) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
