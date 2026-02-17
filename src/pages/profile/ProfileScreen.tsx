import React, { useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Button, Chip, Input, Typography } from "@src/components";
import { useProfile, useUpdateProfile } from "@features/profile/api";
import { useOnboardingOptions } from "@features/onboarding/api";
import { useProfileForm } from "@features/profile/model";
import { useToast } from "@shared/ui";
import { styles } from "./styles";

export function ProfileScreen() {
  const { data, isLoading, isError } = useProfile();
  const { data: optionsData, isLoading: isOptionsLoading } = useOnboardingOptions();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { showToast } = useToast();
  const prevSaveStatus = useRef<"idle" | "saving" | "success" | "error">("idle");
  // 화면은 폼 상태/저장 정책을 훅에서 받아 바인딩만 수행한다.
  const {
    formState,
    isSaveDisabled,
    saveStatus,
    setHeightCm,
    setWeightKg,
    setTrainingYears,
    setOnboardingSingle,
    toggleOnboardingMulti,
    handleSave,
  } = useProfileForm({
    profile: data,
    onSave: async (payload) => {
      await updateProfile(payload);
    },
  });

  useEffect(() => {
    // 상태 전이 시점에만 토스트를 1회 노출한다.
    if (prevSaveStatus.current !== saveStatus) {
      if (saveStatus === "success") {
        showToast({ type: "success", message: "프로필이 저장되었습니다." });
      }
      if (saveStatus === "error") {
        showToast({ type: "error", message: "프로필 저장에 실패했습니다." });
      }
      prevSaveStatus.current = saveStatus;
    }
  }, [saveStatus, showToast]);

  return (
    <LayoutShell title="Profile" contentBottomInset="none">
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="titleLg">Profile</Typography>
        <Typography variant="bodyMd" tone="secondary" style={styles.subtitle}>
          프로필/설정 화면
        </Typography>
        {isLoading ? (
          <Typography variant="bodySm" tone="secondary">
            프로필을 불러오는 중입니다.
          </Typography>
        ) : null}
        {isError ? (
          <Typography variant="bodySm" tone="secondary">
            프로필을 불러오지 못했습니다.
          </Typography>
        ) : null}
        <View style={styles.formGap}>
          <Input
            label="키(cm)"
            value={formState.heightCm}
            keyboardType="numeric"
            onChangeText={setHeightCm}
            style={styles.fieldGap}
          />
          <Input
            label="체중(kg)"
            value={formState.weightKg}
            keyboardType="numeric"
            onChangeText={setWeightKg}
            style={styles.fieldGap}
          />
          <Input
            label="운동 경력(년)"
            value={formState.trainingYears}
            keyboardType="numeric"
            onChangeText={setTrainingYears}
          />
        </View>

        <Typography variant="titleMd" style={styles.sectionTitle}>
          운동 설정
        </Typography>
        {isOptionsLoading ? (
          <Typography variant="bodySm" tone="secondary">
            설정 옵션을 불러오는 중입니다.
          </Typography>
        ) : null}
        {optionsData?.groups.map((group) => {
          const selected = formState.onboardingAnswers[group.key];
          return (
            <View key={group.key} style={styles.optionSection}>
              <Typography variant="bodyMd">{group.title}</Typography>
              <Typography variant="bodySm" tone="secondary" style={styles.optionDescription}>
                {group.description}
              </Typography>
              <View style={styles.choiceWrap}>
                {group.items.map((item) => {
                  const isSelected =
                    group.selectionType === "multi"
                      ? Array.isArray(selected) && selected.includes(item.id)
                      : selected === item.id;
                  return (
                    <View key={item.id} style={styles.chipItem}>
                      <Chip
                        label={item.label}
                        variant={isSelected ? "selected" : "default"}
                        onPress={() => {
                          if (group.selectionType === "multi") {
                            toggleOnboardingMulti(group.key, item.id);
                            return;
                          }
                          setOnboardingSingle(group.key, item.id);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={styles.saveButtonWrap}>
          <Button
            title="저장"
            loading={saveStatus === "saving"}
            disabled={isSaveDisabled}
            onPress={() => void handleSave()}
          />
        </View>
      </ScrollView>
    </LayoutShell>
  );
}
