import React from "react";
import { View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Button, Input, Typography } from "@src/components";
import { useProfile, useUpdateProfile } from "@features/profile/api";
import { useProfileForm } from "@features/profile/model";
import { styles } from "./styles";

export function ProfileScreen() {
  const { data, isLoading, isError } = useProfile();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();
  const {
    formState,
    saveMessage,
    setHeightCm,
    setWeightKg,
    setTrainingYears,
    handleSave,
  } = useProfileForm({
    profile: data,
    onSave: async (payload) => {
      await updateProfile(payload);
    },
  });

  return (
    <LayoutShell title="Profile">
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
      <View style={styles.saveButtonWrap}>
        <Button title="저장" loading={isSaving} onPress={() => void handleSave()} />
      </View>
      {saveMessage ? (
        <Typography variant="bodySm" tone="secondary" style={styles.statusText}>
          {saveMessage}
        </Typography>
      ) : null}
    </LayoutShell>
  );
}
