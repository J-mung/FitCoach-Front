import React from "react";
import { Animated, View } from "react-native";
import { Typography } from "@src/components";
import { styles } from "./styles";

type OnboardingHeaderProps = {
  progress: Animated.Value;
};

export function OnboardingHeader({ progress }: OnboardingHeaderProps) {
  return (
    <View>
      {/* 헤더 영역: 인디케이터 + 타이틀을 묶어서 관리한다. */}
      <View style={styles.step}>
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorTrack}>
            {/* 진행률은 현재 단계 기준으로 채운다. */}
            <Animated.View
              style={[
                styles.indicatorFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.headerContent}>
        <View style={styles.header}>
          <Typography variant="titleLg" style={styles.title}>
            FitCoach 온보딩
          </Typography>
          <Typography variant="bodyMd" tone="secondary">
            목표와 선호를 알려주세요.
          </Typography>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}
