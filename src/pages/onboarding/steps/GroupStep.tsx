import React from "react";
import { View } from "react-native";
import { Chip, Typography } from "@src/components";
import type { OnboardingOptionGroup } from "@features/onboarding/api";
import { styles } from "../styles";

type GroupStepProps = {
  group: OnboardingOptionGroup;
  selectedSingleId: string | null;
  selectedMultiIds: string[];
  onSelectSingle: (id: string) => void;
  onToggleMulti: (id: string) => void;
};

// 옵션 그룹 선택 단계(단일/복수 선택).
export function GroupStep({
  group,
  selectedSingleId,
  selectedMultiIds,
  onSelectSingle,
  onToggleMulti,
}: GroupStepProps) {
  const isMulti = group.selectionType === "multi";

  return (
    <View>
      <Typography variant="titleMd">{group.title}</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
        {group.description}
      </Typography>
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
                onPress={() =>
                  isMulti ? onToggleMulti(option.id) : onSelectSingle(option.id)
                }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
