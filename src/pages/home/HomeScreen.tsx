import React from "react";
import { Switch, View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Card, Typography } from "@src/components";
import { useOnboardingStatus } from "@features/onboarding/model";
import { styles } from "./styles";

export function HomeScreen() {
  // 온보딩 완료 상태를 테스트/토글하기 위한 상태.
  const { isCompleted, setCompleted } = useOnboardingStatus();

  return (
    <LayoutShell title="Home">
      <Typography variant="titleLg">Home</Typography>
      <Typography
        variant="bodyMd"
        tone="secondary"
        style={styles.subtitle}
      >
        Dashboard preview
      </Typography>

      <Card style={styles.cardShadow}>
        <Typography variant="titleMd" style={styles.cardTitle}>
          오늘 루틴 추천
        </Typography>
        <Typography variant="bodyMd" tone="secondary"> 
          여기에 추천 카드가 들어갑니다.
        </Typography>
      </Card>

      {/* 온보딩 완료 상태를 수동으로 토글하기 위한 임시 컨트롤 */}
      <View style={styles.toggleRow}>
        <Typography
          variant="bodyMd"
          tone="secondary"
          style={styles.toggleLabel}
        >
          온보딩 완료 상태
        </Typography>
        <Switch
          value={isCompleted}
          onValueChange={(value) => {
            void setCompleted(value);
          }}
        />
      </View>
    </LayoutShell>
  );
}
