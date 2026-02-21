import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Button, Card, Input, Typography } from "@src/components";
import { useProfile } from "@features/profile/api";
import { buildMockCoachResponse } from "./coachResponse";
import { styles } from "./styles";

export function CoachScreen() {
  const [question, setQuestion] = useState("");
  const { data: profile } = useProfile();
  // 질문 입력값을 기반으로 응답 카드 포맷을 즉시 만든다.
  const response = useMemo(
    () => buildMockCoachResponse(question, profile),
    [question, profile]
  );

  return (
    <LayoutShell title="AI Coach">
      <Typography variant="titleLg">AI 코치</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.subtitle}>
        질문을 입력하면 루틴 제안/이유/주의사항을 확인할 수 있어요.
      </Typography>

      <Input
        label="질문"
        placeholder="예) 하체 운동 다음날 무릎이 불편해요. 루틴을 줄일까요?"
        value={question}
        onChangeText={setQuestion}
        style={styles.inputWrap}
      />
      <View style={styles.sendButtonWrap}>
        <Button title="질문 전송" onPress={() => setQuestion((prev) => prev.trim())} />
      </View>

      <Card style={styles.responseCard}>
        <Typography variant="titleMd" style={styles.responseSection}>
          추천 의도
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          {response.intent}
        </Typography>

        <Typography variant="titleMd" style={styles.responseSection}>
          추천안
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          {response.recommendedPlan}
        </Typography>

        <Typography variant="titleMd" style={styles.responseSection}>
          추천 이유
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          {response.reasoning}
        </Typography>

        <Typography variant="titleMd" style={styles.responseSection}>
          주의사항
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          {response.cautions}
        </Typography>

        <Typography variant="titleMd" style={styles.responseSection}>
          후속 질문
        </Typography>
        <Typography variant="bodyMd" tone="secondary">
          {response.followupQuestion}
        </Typography>
      </Card>
    </LayoutShell>
  );
}
