import React from "react";
import { Switch, View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Card, Typography } from "@src/components";
import { useOnboardingStatus } from "@src/hooks";
import { tailwind } from "@src/theme/tailwind";
import {
  homeCardShadowClass,
  homeCardTitleClass,
  homeSubtitleClass,
  homeToggleLabelClass,
  homeToggleRowClass,
} from "./styles";

export function HomeScreen() {
  // 온보딩 완료 상태를 테스트/토글하기 위한 상태.
  const { isCompleted, setCompleted } = useOnboardingStatus();

  return (
    <LayoutShell title="Home">
      <Typography variant="titleLg">Home</Typography>
      <Typography
        variant="bodyMd"
        tone="secondary"
        style={tailwind(homeSubtitleClass)}
      >
        Dashboard preview
      </Typography>

      <Card style={tailwind(homeCardShadowClass)}> 
        <Typography variant="titleMd" style={tailwind(homeCardTitleClass)}> 
          오늘 루틴 추천
        </Typography>
        <Typography variant="bodyMd" tone="secondary"> 
          여기에 추천 카드가 들어갑니다.
        </Typography>
      </Card>

      <View style={tailwind(homeToggleRowClass)}>
        <Typography
          variant="bodyMd"
          tone="secondary"
          style={tailwind(homeToggleLabelClass)}
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
