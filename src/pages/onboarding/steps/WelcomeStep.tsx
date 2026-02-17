import React from "react";
import { View } from "react-native";
import { Typography } from "@src/components";
import { styles } from "../styles";

// 온보딩 시작 안내 단계.
export function WelcomeStep() {
  return (
    <View style={styles.welcomeContent}>
      <View style={styles.welcomeTextBlock}>
        <Typography variant="titleLg" style={styles.welcomeTitle}>
          AI 코치가 오늘 어떤 운동을 해야 할지 함께 정해드릴게요
        </Typography>
        <Typography variant="bodyMd" tone="secondary" style={styles.welcomeDescription}>
          목표, 운동 경험, 사용 장비를 바탕으로 맞춤 루틴을 추천해요.
        </Typography>
      </View>

      {/* mt-auto 대신 Spacer를 사용해 하단 메타 영역을 아래로 밀어낸다. */}
      <View style={styles.welcomeSpacer} />

      <View style={styles.welcomeBottomMeta}>
        {/* 전체 온보딩 단계를 은연중에 보여주는 dot 인디케이터 */}
        <View style={styles.welcomeDotsRow}>
          <View style={[styles.welcomeDot, styles.welcomeDotActive]} />
          <View style={styles.welcomeDot} />
          <View style={styles.welcomeDot} />
          <View style={styles.welcomeDot} />
        </View>

        <Typography variant="bodyMd" tone="secondary" style={styles.welcomeLoginText}>
          온보딩 이후에도 프로필에서 언제든 변경할 수 있어요.
        </Typography>
        </View>
      </View>
  );
}
