import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Chip, Typography } from "@src/components";
import type { GroupMap, OnboardingFormState } from "@features/onboarding/model";
import { styles } from "../styles";

type SummaryStepProps = {
  groupMap: GroupMap;
  formState: OnboardingFormState;
  onSelectSingle: (key: keyof GroupMap, id: string) => void;
  onSetMulti: (key: keyof GroupMap, ids: string[]) => void;
};

// 선택 결과 요약 단계.
export function SummaryStep({
  groupMap,
  formState,
  onSelectSingle,
  onSetMulti,
}: SummaryStepProps) {
  // 요약 화면에서 열려 있는 수정 섹션 키.
  const [expandedKey, setExpandedKey] = useState<keyof GroupMap | null>(null);
  // 다중 선택(장비)은 임시 상태로 보관 후 완료 버튼에서 반영한다.
  const [pendingEquipmentIds, setPendingEquipmentIds] = useState<string[]>(
    formState.equipmentIds
  );

  useEffect(() => {
    if (expandedKey === "equipment") {
      setPendingEquipmentIds(formState.equipmentIds);
    }
  }, [expandedKey, formState.equipmentIds]);

  const resolveLabel = (groupKey: keyof GroupMap, id: string | null) =>
    groupMap[groupKey]?.items.find((item) => item.id === id)?.label ?? "-";

  const resolveMulti = (groupKey: keyof GroupMap, ids: string[]) =>
    ids
      .map((id) => groupMap[groupKey]?.items.find((item) => item.id === id)?.label)
      .filter(Boolean)
      .join(", ") || "-";

  const resolveSingleId = (groupKey: keyof GroupMap) => {
    if (groupKey === "goal") {
      return formState.goalId;
    }
    if (groupKey === "level") {
      return formState.levelId;
    }
    if (groupKey === "workouts_per_week") {
      return formState.workoutsPerWeekId;
    }
    if (groupKey === "session_minutes") {
      return formState.sessionMinutesId;
    }
    if (groupKey === "location") {
      return formState.locationId;
    }
    return null;
  };

  const handleToggleExpanded = (groupKey: keyof GroupMap) => {
    setExpandedKey((prev) => (prev === groupKey ? null : groupKey));
  };

  const renderEditOptions = (groupKey: keyof GroupMap) => {
    const group = groupMap[groupKey];
    if (!group) {
      return null;
    }
    const isMulti = group.selectionType === "multi";
    const selectedSingleId = resolveSingleId(groupKey);
    const selectedMultiIds = groupKey === "equipment" ? pendingEquipmentIds : [];

    return (
      <View style={styles.summaryEditBlock}>
        <View style={styles.choiceWrap}>
          {group.items.map((option) => {
            const isSelected = isMulti
              ? selectedMultiIds.includes(option.id)
              : selectedSingleId === option.id;
            return (
              <View key={option.id} style={styles.chipItem}>
                <Chip
                  label={option.label}
                  variant={isSelected ? "selected" : "default"}
                  onPress={() => {
                    if (isMulti) {
                      setPendingEquipmentIds((prev) =>
                        prev.includes(option.id)
                          ? prev.filter((item) => item !== option.id)
                          : [...prev, option.id]
                      );
                      return;
                    }
                    onSelectSingle(groupKey, option.id);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.summaryEditActions}>
          <Button
            title="완료"
            variant="secondary"
            size="md"
            onPress={() => {
              if (isMulti) {
                onSetMulti(groupKey, pendingEquipmentIds);
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
      <Typography variant="titleMd">선택 결과 요약</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
        필요하면 수정할 수 있어요.
      </Typography>

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 목표
        </Typography>
        <Typography variant="bodyMd">{resolveLabel("goal", formState.goalId)}</Typography>
        <Button title="수정" variant="ghost" onPress={() => handleToggleExpanded("goal")} />
      </View>
      {expandedKey === "goal" ? renderEditOptions("goal") : null}

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 수준
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("level", formState.levelId)}
        </Typography>
        <Button title="수정" variant="ghost" onPress={() => handleToggleExpanded("level")} />
      </View>
      {expandedKey === "level" ? renderEditOptions("level") : null}

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          주당 운동일
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("workouts_per_week", formState.workoutsPerWeekId)}
        </Typography>
        <Button
          title="수정"
          variant="ghost"
          onPress={() => handleToggleExpanded("workouts_per_week")}
        />
      </View>
      {expandedKey === "workouts_per_week" ? renderEditOptions("workouts_per_week") : null}

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 시간
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("session_minutes", formState.sessionMinutesId)}
        </Typography>
        <Button
          title="수정"
          variant="ghost"
          onPress={() => handleToggleExpanded("session_minutes")}
        />
      </View>
      {expandedKey === "session_minutes" ? renderEditOptions("session_minutes") : null}

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 장소
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("location", formState.locationId)}
        </Typography>
        <Button
          title="수정"
          variant="ghost"
          onPress={() => handleToggleExpanded("location")}
        />
      </View>
      {expandedKey === "location" ? renderEditOptions("location") : null}

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          보유 장비
        </Typography>
        <Typography variant="bodyMd">
          {resolveMulti("equipment", formState.equipmentIds)}
        </Typography>
        <Button
          title="수정"
          variant="ghost"
          onPress={() => handleToggleExpanded("equipment")}
        />
      </View>
      {expandedKey === "equipment" ? renderEditOptions("equipment") : null}
    </View>
  );
}
