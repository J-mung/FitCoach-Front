import React from "react";
import { View } from "react-native";
import { Button, Typography } from "@src/components";
import type { GroupMap, OnboardingFormState } from "../types";
import { styles } from "../styles";

type SummaryStepProps = {
  groupMap: GroupMap;
  formState: OnboardingFormState;
  onEdit: (stepIndex: number) => void;
};

// 선택 결과 요약 단계.
export function SummaryStep({ groupMap, formState, onEdit }: SummaryStepProps) {
  const resolveLabel = (groupKey: keyof GroupMap, id: string | null) =>
    groupMap[groupKey]?.items.find((item) => item.id === id)?.label ?? "-";

  const resolveMulti = (groupKey: keyof GroupMap, ids: string[]) =>
    ids
      .map((id) => groupMap[groupKey]?.items.find((item) => item.id === id)?.label)
      .filter(Boolean)
      .join(", ") || "-";

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
        <Button title="수정" variant="ghost" onPress={() => onEdit(1)} />
      </View>

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 경험
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("experience", formState.experienceId)}
        </Typography>
        <Button title="수정" variant="ghost" onPress={() => onEdit(2)} />
      </View>

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          운동 장비
        </Typography>
        <Typography variant="bodyMd">
          {resolveLabel("equipment", formState.equipmentId)}
        </Typography>
        <Button title="수정" variant="ghost" onPress={() => onEdit(3)} />
      </View>

      <View style={styles.summaryRow}>
        <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
          집중 부위
        </Typography>
        <Typography variant="bodyMd">
          {resolveMulti("focus_area", formState.focusAreaIds)}
        </Typography>
        <Button title="수정" variant="ghost" onPress={() => onEdit(4)} />
      </View>
    </View>
  );
}
