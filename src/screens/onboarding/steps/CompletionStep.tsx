import React from "react";
import { View } from "react-native";
import { Typography } from "@src/components";
import { styles } from "../styles";

// 온보딩 완료 안내 단계.
export function CompletionStep() {
  return (
    <View>
      <Typography variant="titleMd">준비 완료!</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.contentGap}>
        이제 맞춤 루틴을 시작해볼까요?
      </Typography>
    </View>
  );
}
