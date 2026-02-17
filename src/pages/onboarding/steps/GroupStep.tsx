import React from "react";
import { Pressable, View } from "react-native";
import { Typography } from "@src/components";
import type { OnboardingOptionGroup } from "@features/onboarding/api";
import { styles } from "../styles";

type GroupStepProps = {
  group: OnboardingOptionGroup;
  selectedSingleId: string | null;
  selectedMultiIds: string[];
  stepKey: string | null;
  groupMap: Record<string, OnboardingOptionGroup> | null;
  locationSelectedId: string | null;
  onSelectSingle: (id: string) => void;
  onToggleMulti: (id: string) => void;
  onSelectSingleByKey: (key: string, id: string) => void;
  onToggleMultiByKey: (key: string, id: string) => void;
};

// 옵션 그룹 선택 단계(단일/복수 선택).
export function GroupStep({
  group,
  selectedSingleId,
  selectedMultiIds,
  stepKey,
  groupMap,
  locationSelectedId,
  onSelectSingle,
  onToggleMulti,
  onSelectSingleByKey,
  onToggleMultiByKey,
}: GroupStepProps) {
  const isMulti = group.selectionType === "multi";
  const titleMap: Record<string, string> = {
    goal: "주요 운동 목표를 선택해주세요",
    level: "현재 운동 수준을 알려주세요",
    equipment: "주로 어디에서 운동하나요?",
  };
  const descriptionMap: Record<string, string> = {
    goal: "선택한 목표에 맞춰 운동 강도와 추천 루틴이 달라져요.",
    level: "현재 경험에 맞는 난이도로 루틴을 설계해요.",
    equipment: "운동 환경과 장비를 설정하면 추천 정확도가 높아져요.",
  };
  const optionDescriptionMap: Record<string, Record<string, string>> = {
    goal: {
      goal_bulk: "근력 향상과 근성장 중심",
      goal_cut: "체지방 감량과 컨디션 개선 중심",
      goal_strength: "고중량 수행 능력 향상 중심",
      goal_maintain: "균형 유지와 운동 습관 강화 중심",
    },
    level: {
      level_beginner: "운동을 막 시작한 단계",
      level_intermediate: "기본 루틴에 익숙한 단계",
      level_advanced: "고강도 루틴 경험 보유",
    },
  };

  const locationGroup = groupMap?.location;
  const resolvedLocationId = locationSelectedId;

  return (
    <View>
      <Typography variant="titleLg">{titleMap[group.key] ?? group.title}</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
        {descriptionMap[group.key] ?? group.description}
      </Typography>

      {stepKey === "equipment" ? (
        <View>
          {locationGroup ? (
            <View style={styles.locationGrid}>
              {locationGroup.items.map((option) => {
                const isSelected = resolvedLocationId === option.id;
                return (
                  <Pressable
                    key={option.id}
                    style={[styles.locationCard, isSelected ? styles.optionCardSelected : null]}
                    onPress={() => onSelectSingleByKey("location", option.id)}
                  >
                    <Typography
                      variant="titleMd"
                      style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                    >
                      {option.label}
                    </Typography>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          <Typography variant="titleMd" style={styles.groupSubTitle}>
            사용 가능한 장비
          </Typography>
          <View style={styles.equipmentGrid}>
            {group.items.map((option) => {
              const isSelected = selectedMultiIds.includes(option.id);
              return (
                <Pressable
                  key={option.id}
                  style={[styles.equipmentCard, isSelected ? styles.optionCardSelected : null]}
                  onPress={() => onToggleMultiByKey(group.key, option.id)}
                >
                  <Typography
                    variant="bodyMd"
                    style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                  >
                    {option.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.optionList}>
          {group.items.map((option) => {
            const isSelected = isMulti
              ? selectedMultiIds.includes(option.id)
              : selectedSingleId === option.id;
            const helper = optionDescriptionMap[group.key]?.[option.id];
            return (
              <Pressable
                key={option.id}
                style={[styles.optionCard, isSelected ? styles.optionCardSelected : null]}
                onPress={() =>
                  isMulti ? onToggleMulti(option.id) : onSelectSingle(option.id)
                }
              >
                <View style={styles.optionTextBlock}>
                  <Typography
                    variant="titleMd"
                    style={isSelected ? styles.optionTitleSelected : styles.optionTitle}
                  >
                    {option.label}
                  </Typography>
                  {helper ? (
                    <Typography variant="bodySm" tone="secondary" style={styles.optionHelperText}>
                      {helper}
                    </Typography>
                  ) : null}
                </View>
                <View style={[styles.radioOuter, isSelected ? styles.radioOuterSelected : null]}>
                  {isSelected ? <View style={styles.radioInner} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      {stepKey === "goal" ? (
        <View style={styles.noticeBox}>
          <Typography variant="bodySm" tone="secondary">
            목표는 설정 후에도 프로필 화면에서 수정할 수 있어요.
          </Typography>
        </View>
      ) : null}
    </View>
  );
}
