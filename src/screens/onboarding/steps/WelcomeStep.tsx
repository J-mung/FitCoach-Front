import React from "react";
import { View } from "react-native";
import { Typography } from "@src/components";
import { styles } from "../styles";

// 온보딩 시작 안내 단계.
export function WelcomeStep() {
  return (
    <View>
      <Typography variant="titleMd">환영합니다 👋</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
        목표와 환경을 설정하면 맞춤 루틴을 추천해드려요.
      </Typography>
    </View>
  );
}
