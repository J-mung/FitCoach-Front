import React from "react";
import { View } from "react-native";
import { LayoutShell } from "../../layout";
import { Card, Typography } from "../../components";
import { tailwind } from "../../theme/tailwind";
import {
  homeCardShadowClass,
  homeCardTitleClass,
  homeSubtitleClass,
} from "./styles";

export function HomeScreen() {
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
    </LayoutShell>
  );
}
