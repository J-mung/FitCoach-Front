import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Chip, Typography } from "@src/components";
import type { GroupMap, OnboardingFormState } from "@features/onboarding/model";
import type { OnboardingOptionGroup } from "@features/onboarding/api";
import { styles } from "../styles";

type SummaryStepProps = {
  groups: OnboardingOptionGroup[];
  groupMap: GroupMap;
  formState: OnboardingFormState;
  onSelectSingle: (key: keyof GroupMap, id: string) => void;
  onSetMulti: (key: keyof GroupMap, ids: string[]) => void;
};

// 선택 결과 요약 단계.
export function SummaryStep({
  groups,
  groupMap,
  formState,
  onSelectSingle,
  onSetMulti,
}: SummaryStepProps) {
  // 요약 화면에서 열려 있는 수정 섹션 키.
  const [expandedKey, setExpandedKey] = useState<keyof GroupMap | null>(null);
  // 다중 선택은 임시 상태로 보관 후 완료 버튼에서 반영한다.
  const [pendingMultiMap, setPendingMultiMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!expandedKey) {
      return;
    }
    const group = groupMap[expandedKey];
    if (!group || group.selectionType !== "multi") {
      return;
    }
    const value = formState[group.key];
    const nextValue = Array.isArray(value) ? value : [];
    setPendingMultiMap((prev) => ({ ...prev, [group.key]: nextValue }));
  }, [expandedKey, formState, groupMap]);

  const resolveLabel = (groupKey: keyof GroupMap, id: string | null) =>
    groupMap[groupKey]?.items.find((item) => item.id === id)?.label ?? "-";

  const resolveMulti = (groupKey: keyof GroupMap, ids: string[]) =>
    ids
      .map((id) => groupMap[groupKey]?.items.find((item) => item.id === id)?.label)
      .filter(Boolean)
      .join(", ") || "-";

  const resolveSingleId = (groupKey: keyof GroupMap) => {
    const value = formState[groupKey];
    return typeof value === "string" ? value : null;
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
    const selectedMultiIds = pendingMultiMap[groupKey] ?? [];

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
                      setPendingMultiMap((prev) => {
                        const current = prev[groupKey] ?? [];
                        const next = current.includes(option.id)
                          ? current.filter((item) => item !== option.id)
                          : [...current, option.id];
                        return { ...prev, [groupKey]: next };
                      });
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
                onSetMulti(groupKey, pendingMultiMap[groupKey] ?? []);
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

      {groups.map((group) => {
        const value = formState[group.key];
        const summaryValue =
          group.selectionType === "multi"
            ? resolveMulti(group.key, Array.isArray(value) ? value : [])
            : resolveLabel(group.key, typeof value === "string" ? value : null);

        return (
          <View key={group.key}>
            <View style={styles.summaryRow}>
              <Typography variant="bodySm" tone="secondary" style={styles.summaryLabel}>
                {group.title}
              </Typography>
              <Typography variant="bodyMd">{summaryValue}</Typography>
              <Button
                title="수정"
                variant="ghost"
                onPress={() => handleToggleExpanded(group.key)}
              />
            </View>
            {expandedKey === group.key ? renderEditOptions(group.key) : null}
          </View>
        );
      })}
    </View>
  );
}
