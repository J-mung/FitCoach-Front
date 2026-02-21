import React from "react";
import { Switch, View } from "react-native";
import { LayoutShell } from "@src/layout";
import { Button, Card, ListItem, Typography } from "@src/components";
import { useOnboardingStatus } from "@features/onboarding/model";
import { useCreateWorkoutSession, useWorkoutTemplates } from "@features/workout/api";
import { useProfile } from "@features/profile/api";
import { useToast } from "@shared/ui";
import { styles } from "./styles";
import { buildHomeRecommendation } from "./recommendation";

export function HomeScreen() {
  // 온보딩 완료 상태를 테스트/토글하기 위한 상태.
  const { isCompleted, setCompleted } = useOnboardingStatus();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: templatesData, isLoading: isTemplatesLoading } = useWorkoutTemplates();
  const { mutateAsync: createWorkoutSession, isPending: isCreatingSession } =
    useCreateWorkoutSession();
  const { showToast } = useToast();
  const recommendation = buildHomeRecommendation(templatesData?.templates, profile);

  const handleStartSession = async () => {
    if (!recommendation.template) {
      showToast({ type: "error", message: "시작할 수 있는 루틴이 없습니다." });
      return;
    }
    try {
      await createWorkoutSession({
        userId: profile?.userId ?? "local-user",
        templateId: recommendation.template.id,
      });
      showToast({ type: "success", message: "세션을 시작했어요." });
    } catch {
      showToast({ type: "error", message: "세션 시작에 실패했습니다." });
    }
  };

  return (
    <LayoutShell title="Home">
      <Typography variant="titleLg">오늘 루틴</Typography>
      <Typography variant="bodyMd" tone="secondary" style={styles.subtitle}>
        추천 루틴을 확인하고 바로 세션을 시작하세요.
      </Typography>

      <Card style={styles.cardShadow}>
        <Typography variant="titleMd" style={styles.cardTitle}>
          오늘 루틴 추천
        </Typography>
        {isProfileLoading || isTemplatesLoading ? (
          <Typography variant="bodyMd" tone="secondary">
            추천 루틴을 계산 중입니다.
          </Typography>
        ) : recommendation.template ? (
          <View>
            <Typography variant="titleMd">{recommendation.template.name}</Typography>
            <Typography variant="bodySm" tone="secondary" style={styles.recommendationSummary}>
              총 {recommendation.template.exercises.length}개 운동
            </Typography>
            <View style={styles.reasonList}>
              {recommendation.reasons.map((reason, index) => (
                <ListItem
                  key={`${reason}-${index}`}
                  title={reason}
                  containerStyle={styles.reasonItem}
                />
              ))}
            </View>
            <Button
              title="세션 시작"
              loading={isCreatingSession}
              onPress={() => void handleStartSession()}
            />
          </View>
        ) : (
          <Typography variant="bodyMd" tone="secondary">
            추천 루틴이 없습니다. 프로필 설정을 먼저 확인해주세요.
          </Typography>
        )}
      </Card>

      <Card style={styles.quickActionCard}>
        <Typography variant="titleMd" style={styles.cardTitle}>
          빠른 행동
        </Typography>
        <Typography variant="bodySm" tone="secondary" style={styles.quickActionText}>
          코치 탭에서 질문을 입력하면 루틴 변경 제안을 받을 수 있어요.
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
