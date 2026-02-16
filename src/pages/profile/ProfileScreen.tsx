import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Button, Input, Typography } from "@src/components";
import { useProfile, useUpdateProfile } from "@features/profile/api";
import { buildUpdateProfileDTO, mapProfileDtoToFormState } from "@features/profile/model";
import { styles } from "./styles";

export function ProfileScreen() {
  const { data, isLoading, isError } = useProfile();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [trainingYears, setTrainingYears] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      return;
    }
    // 조회한 DTO를 폼 상태로 변환해 입력값을 초기화한다.
    const formState = mapProfileDtoToFormState(data);
    setHeightCm(formState.heightCm);
    setWeightKg(formState.weightKg);
    setTrainingYears(formState.trainingYears);
  }, [data]);

  const handleSave = async () => {
    if (!data?.userId) {
      setSaveMessage("저장할 사용자 정보가 없습니다.");
      return;
    }
    try {
      // 저장 payload는 mapper를 통해서만 생성한다.
      const payload = buildUpdateProfileDTO({
        userId: data.userId,
        formState: {
          heightCm,
          weightKg,
          trainingYears,
        },
      });
      await updateProfile(payload);
      setSaveMessage("프로필이 저장되었습니다.");
    } catch {
      setSaveMessage("프로필 저장에 실패했습니다.");
    }
  };

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
          value={heightCm}
          keyboardType="numeric"
          onChangeText={setHeightCm}
          style={styles.fieldGap}
        />
        <Input
          label="체중(kg)"
          value={weightKg}
          keyboardType="numeric"
          onChangeText={setWeightKg}
          style={styles.fieldGap}
        />
        <Input
          label="운동 경력(년)"
          value={trainingYears}
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
