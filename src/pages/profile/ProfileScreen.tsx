import React from "react";
import { LayoutShell } from "@src/layout";
import { Typography } from "@src/components";
import { useProfile } from "@features/profile/api";
import { mapProfileDtoToSummary } from "@features/profile/model";

export function ProfileScreen() {
  const { data, isLoading, isError } = useProfile();

  const summary = data ? mapProfileDtoToSummary(data) : null;

  return (
    <LayoutShell title="Profile">
      <Typography variant="titleLg">Profile</Typography>
      <Typography variant="bodyMd" tone="secondary">
        프로필/설정 화면
      </Typography>
      {isLoading ? (
        <Typography variant="bodySm" tone="secondary">
          프로필을 불러오는 중입니다.
        </Typography>
      ) : null}
      {isError ? (
        <Typography variant="bodySm" tone="secondary">
          프로필을 불러오지 못했습니다.
        </Typography>
      ) : null}
      {summary
        ? summary.items.map((item) => (
            <Typography key={item.label} variant="bodyMd">
              {item.label}: {item.value}
            </Typography>
          ))
        : null}
    </LayoutShell>
  );
}
