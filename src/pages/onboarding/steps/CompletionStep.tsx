import React from "react";
import { View } from "react-native";
import { Typography } from "@src/components";
import { styles } from "../styles";

// 온보딩 완료 전환 단계.
export function CompletionStep() {
  return (
    <View style={styles.completionContainer}>
      <Typography variant="titleLg" style={styles.completionTitle}>
        첫 운동 루틴을 준비하고 있어요
      </Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.completionDescription}>
        설정한 목표와 운동 환경을 바탕으로 맞춤 루틴을 생성하는 중입니다.
      </Typography>

      <View style={styles.completionCircleOuter}>
        <View style={styles.completionCircleInner}>
          <Typography variant="titleMd" style={styles.completionIconText}>
            🏋️
          </Typography>
        </View>
      </View>

      <Typography variant="bodyMd" tone="secondary" style={styles.completionCaption}>
        잠시만 기다려주세요
      </Typography>

      <View style={styles.completionBottomBlock}>
        <Typography variant="bodySm" tone="secondary" style={styles.completionBottomLabel}>
          루틴 생성 중...
        </Typography>
        <View style={styles.completionProgressTrack}>
          <View style={styles.completionProgressFill} />
        </View>
      </View>
    </View>
  );
}
